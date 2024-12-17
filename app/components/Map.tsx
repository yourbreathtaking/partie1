import { useEffect } from 'react';
import * as L from 'leaflet';

const Map = () => {
    useEffect(() => {
        // Initialize the map only once
        const map = L.map('map').setView([31.2734, -7.5807], 8.5);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        return () => {
            // Cleanup when component unmounts
            map.remove();
        };
    }, []);

    return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default Map;
