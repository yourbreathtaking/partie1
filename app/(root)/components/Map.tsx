import { useEffect , useState } from 'react';
import * as L from 'leaflet';

export function Map() {
    
      const [map, setMap] = useState(null);

      useEffect(() => {
        const leafletMap = L.map('map').setView([51.505, -0.09], 13);
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(leafletMap);
    
        setMap(leafletMap);
    
        return () => {
          leafletMap.remove(); // Cleanup map instance on component unmount
        };
      }, []);
      
  useEffect(() => {
    if (!map) return;

    async function fetchGeoJSON() {
      try {
        const response = await fetch('/api');
        const data = await response.json();

        L.geoJSON(data, {
          onEachFeature: (feature, layer) => {
            if (feature.properties && feature.properties.Nom_Commun) {
              layer.bindPopup(feature.properties.Nom_Commun);
            }
          },
        }).addTo(map);
      } catch (error) {
        console.error('Error fetching GeoJSON:', error);
      }
    }

    fetchGeoJSON();
  }, [map]);

    return <div id="map" className='aspect-video rounded-xl' />;
};

export default Map;

