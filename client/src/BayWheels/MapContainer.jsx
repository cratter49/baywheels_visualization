// React
import React, { useEffect, useContext, useRef, useState, Fragment } from "react";

// Hooks
import { useRequest } from '../Hooks';

// Context
import { MapContext } from '../Contexts';

// Material-UI
import { CircularProgress, makeStyles } from '@material-ui/core';

// Utilities
import mapboxgl from 'mapbox-gl';

// Initialize Libraries Here
mapboxgl.accessToken = 'pk.eyJ1IjoiZGp3aXNlbWEiLCJhIjoiY2syemRnazY1MGhzNTNtdDlsaHl5OHMzdiJ9.7oi3h8H_TkSyOuDuP3G7TA';

// Styles
const useStyles = makeStyles({
    mapContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    },
    progress: {
        position: 'absolute',
        height: '27% !important',
        width: '20% !important',
        top: '28%',
        left: '42%'
    }  
});

export default function MapContiner() {
    //
    // State
    //

    const [selectedDate, setSelectedData] = useState('201801');

    //
    // Custom Hooks
    //

    const [{ responseData, isLoading, isError }, getData] = useRequest('http://localhost:3001/api/getData', 'GET');
    const classes = useStyles();

    //
    // Context
    //

    const mapContext = useContext(MapContext);

    //
    // Refs
    //

    const mapContainer = useRef(null);

    //
    // Hooks
    //

    useEffect(() => {
        let mapboxgl = mapContext.mapBox;

        mapboxgl.accessToken = mapContext.accessToken;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-122.4294, 37.7549],
            zoom: 11.8
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, []);

    useEffect(() => {
        // if(!responseData)
        //     getData({ 
        //         params: {
        //           fileDate: selectedDate,
        //         } 
        //     });
    }, [getData, responseData, selectedDate]);

    return (
        <Fragment>
            {isLoading ? (
                <CircularProgress 
                    classes={{
                        root: classes.progress
                    }} 
                />
            ) : isError ? (
                <div>Loading...</div>
            ) : (<div className={classes.mapContainer} ref={ elelment => mapContainer.current = elelment }></div>)}
        </Fragment>
    );
}