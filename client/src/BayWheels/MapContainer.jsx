// React
import React, { useEffect, useState, Fragment } from "react";

// Hooks
import { useRequest } from '../Hooks';

// Material-UI
import { CircularProgress, makeStyles } from '@material-ui/core';

// Utilities

// Styles
const useStyles = makeStyles({
    progress: {
        position: 'absolute',
        height: '27% !important',
        width: '20% !important',
        top: '28%',
        left: '42%'
    }    
});

export default function MapContiner() {
    const classes = useStyles();

    //
    // State
    //

    const [selectedDate, setSelectedData] = useState('201801');

    //
    // Custom Hooks
    //

    const [{ responseData, isLoading, isError }, getData] = useRequest('http://localhost:3001/api/getData', 'GET');

    //
    // Hooks
    //

    useEffect(() => {
        if(!responseData)
            getData({ 
                params: {
                  fileDate: selectedDate,
                } 
            });
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
            ) : (<div>Data Loaded</div>)}
        </Fragment>
    );
}