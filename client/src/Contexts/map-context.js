// React
import React, { createContext } from 'react';

// Utilities
import mapboxgl from 'mapbox-gl';

export const MapContext = React.createContext({
    accessToken: 'pk.eyJ1IjoiZGp3aXNlbWEiLCJhIjoiY2syemRnazY1MGhzNTNtdDlsaHl5OHMzdiJ9.7oi3h8H_TkSyOuDuP3G7TA',
    mapBox: mapboxgl
});