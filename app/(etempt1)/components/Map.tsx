import { useEffect } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen';
import * as echarts from 'echarts';
import { Spinner } from '@/components/ui/spinner';




const Map = () => {
    useEffect(() => {
        let map: L.Map | null = null;
        let communeGeojson: L.GeoJSON<any> | null = null;
        let batimentData: any = null;
        let pieChart2Data: any = null;
        let allGreen: boolean = true;
        let selectedCommuneFeature: any = null;

        const initializeMap = () => {
            map = L.map('the_map').setView([31.2734, -7.5807], 8.5);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);

            return map;
        };

        map = initializeMap();
        const info = L.control();

        info.onAdd = function () {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };

        info.update = function (props?: { Nom_Commun?: string }) {
            const contents = props 
                ? `<b class="text-blue-500 text-lg">${props.Nom_Commun}</b>` 
                : '<p class="text-black">Survolez une commune </p>';
            this._div.innerHTML = `<h4 class="font-bold text-black ">Nom de la Commune</h4>${contents}`;
        };

        info.addTo(map);

        const legend = L.control({ position: 'bottomright' });
        legend.onAdd = function () {
            const div = L.DomUtil.create('div', 'legend p-4 bg-white shadow-lg text-black rounded-md');
            const grades = [
                { color: 'green', label: 'sein' },
                { color: 'orange', label: 'peu détruit' },
                { color: 'red', label: 'totallement détruit' },
                { color: 'gray', label: 'no data' },
            ];

            div.innerHTML = '<h4 class="text-lg font-semibold mb-2">Légende</h4>';
            grades.forEach(({ color, label }) => {
                div.innerHTML += `<div class="flex items-center mb-2">
                    <i style="background:${color}; width: 18px; height: 18px; display: inline-block; margin-right: 8px; border: 1px solid #ccc;"></i>
                    <span class="text-sm">${label}</span>
                </div>`;
            });

            div.classList.add('sm:text-xs', 'sm:p-2');
            return div;
        };

        legend.addTo(map);

        const loadingIndicator = L.control({ position: 'topright' });
loadingIndicator.onAdd = function () {
    const div = L.DomUtil.create('div', 'loading-indicator');
    div.innerHTML = `
        <div class="flex items-center space-x-2 p-2 bg-white shadow-md rounded-lg">
            <div role="status" class="flex items-center">
                <svg aria-hidden="true" class="w-6 h-6 mr-2 text-gray-200 animate-spin fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100 50 100C22.3858 100 0 78.2051 0 50.5908C0 22.9766 22.3858 0 50 0C77.6142 0 100 22.9766 100 50.5908ZM9.08168 50.5908C9.08168 74.2462 27.6975 92.6621 50 92.6621C72.3025 92.6621 90.9183 74.2462 90.9183 50.5908C90.9183 26.9354 72.3025 8.51953 50 8.51953C27.6975 8.51953 9.08168 26.9354 9.08168 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 96.9087 33.5532C95.1085 28.8227 92.5922 24.3692 89.4094 20.348C84.3662 14.3514 77.8881 9.69042 70.5626 6.84559C63.2371 4.00077 55.2958 3.05177 47.553 4.08695C45.085 4.46205 43.6156 6.92576 44.2526 9.35107C44.8897 11.7764 47.3482 13.2076 49.8419 12.851C55.7193 12.0807 61.702 12.803 67.1987 14.9512C72.6954 17.0995 77.4958 20.6013 81.2633 25.1437C83.882 28.4509 85.8416 32.1587 87.0775 36.056C87.803 38.264 90.5422 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="text-sm font-medium text-gray-700">Chargement...</span>
            </div>
        </div>`;
    div.style.display = 'block';
    return div;
};
loadingIndicator.addTo(map);

        const spinnerElement = document.querySelector('.loading-indicator');

        function style(feature: any) {
            return {
                weight: 3,
                opacity: 0.2,
                color: 'black',
                dashArray: '3',
                fillOpacity: 0.2,
                fillColor: '#3498db',
            };
        }

        function highlightFeature(e: L.LeafletMouseEvent) {
            const layer = e.target;
            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.4,
            });
            layer.bringToFront();
            info.update(layer.feature.properties);
        }

        function resetHighlight(e: L.LeafletMouseEvent) {
            if (communeGeojson) {
                communeGeojson.resetStyle(e.target);
            }
            info.update();

        }

        function zoomToFeature(e: L.LeafletMouseEvent) {
            if (map) {
                map.fitBounds(e.target.getBounds());
            }
        }

        function showBatimentsInCommune(communeFeature: any, customStyle?: any) {
            if (!batimentData) {
                console.warn('Batiment data not loaded yet.');
                return;
            }

            map?.eachLayer((layer) => {
                if (layer instanceof L.GeoJSON && layer !== communeGeojson) {
                    map?.removeLayer(layer);
                }
            });

            const communeName = communeFeature.properties.Nom_Commun;
            const filteredBatiments = batimentData.features.filter(
                (batiment: any) => batiment.properties.Nom_Commun === communeName
            );

            L.geoJSON(filteredBatiments, {
                style: customStyle ||((feature) => {
                
                    const confidence = feature.properties.confidence;
                    let color;

                    if (confidence >= 0.75) {
                        color = 'green';
                    } else if (confidence > 0.7 && confidence < 0.75) {
                        color = 'orange';
                    } else if (confidence >= 0.65 && confidence < 0.7) {
                        color = 'red';
                    } else {
                        color = 'gray';
                    }

                    return {
                        weight: 1,
                        color: color,
                        fillOpacity: 0.6,
                    };
                }),
                pointToLayer: (feature, latlng) => L.circleMarker(latlng, { radius: 5 }),
            }).addTo(map);
            showPieChart(filteredBatiments);
            showPieChart2(communeName);
            showPopulationChart(communeFeature);
            
        }

        function onEachCommuneFeature(feature: any, layer: L.Layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: (e: L.LeafletMouseEvent) => {
                    if (spinnerElement) spinnerElement.style.display = 'block';
                    setTimeout(() => {
                        showBatimentsInCommune(feature, () => ({ color: 'green', weight: 1, fillOpacity: 0.6 }));
                        selectedCommuneFeature = feature;
                        zoomToFeature(e);
                        if (spinnerElement) spinnerElement.style.display = 'none';
                    }, 1000);
                },
            });
        }
        function showPopulationChart(communeFeature: any) {
            const population = communeFeature.properties.Population;
            const chartContainer = document.getElementById('graph');
            if (!chartContainer) return;

            const chart = echarts.init(chartContainer);
            const option = {
                
                tooltip: {},
                legend: {
                  data: ['']
                },
                xAxis: {
                  data: ['Population']
                },
              
                yAxis: {},
                series: [
                  {
                    name: '',
                    type: 'bar',
                    data: [population]
                  }
                ]
              };

            chart.setOption(option);
        }

        function showPieChart(filteredBatiments: any[]) {
            const chartContainer = document.getElementById('piechart1');
            if (!chartContainer) return;

            const confidenceCounts = {
                high: filteredBatiments.filter((b) => b.properties.confidence >= 0.75).length,
                medium: filteredBatiments.filter(
                    (b) => b.properties.confidence > 0.7 && b.properties.confidence < 0.75
                ).length,
                low: filteredBatiments.filter(
                    (b) => b.properties.confidence >= 0.65 && b.properties.confidence < 0.7
                ).length,
            };

            const chart = echarts.init(chartContainer);
            const option = {
                
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                label: {
                    show: false
                  },
                series: [
                    {
                        name: 'Bâtiments',
                        type: 'pie',
                        radius: '50%',
                        label: {
                            show: false
                          },
                        data: [
                            { value: confidenceCounts.high, name: 'detruit' },
                            { value: confidenceCounts.medium, name: 'peu detruit ' },
                            { value: confidenceCounts.low, name: 'totalement detruit' },
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                    },
                ],
            };

            chart.setOption(option);
        }

        function showPieChart2(communeName: string) {
            const chartContainer = document.getElementById('piechart2');
            if (!chartContainer || !pieChart2Data) return;

            const communeData = pieChart2Data[communeName];
            if (!communeData) {
                console.warn('No data for commune:', communeName);
                return;
            }

            const chart = echarts.init(chartContainer);
            const option = {
                
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                label: {
                    show: false
                  },
                series: [
                    {
                        name: 'Remboursements',
                        type: 'pie',
                        radius: '50%',
                        data: communeData,
                        label: {
                            show: false
                          },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                    },
                ],
            };

            chart.setOption(option);
        }
        
        document.getElementById('avant')?.addEventListener('click', () => {
            if (!selectedCommuneFeature) {
                console.warn('No commune selected.');
                return;
            }
            if (spinnerElement) spinnerElement.style.display = 'block';
                    setTimeout(() => {
                        showBatimentsInCommune(selectedCommuneFeature, () => ({ color: 'green', weight: 1, fillOpacity: 0.6 }));
                        
                        if (spinnerElement) spinnerElement.style.display = 'none';
                    }, 1000);
            
        });

        document.getElementById('apres')?.addEventListener('click', () => {
            if (!selectedCommuneFeature) {
                console.warn('No commune selected.');
                return;
            }
            if (spinnerElement) spinnerElement.style.display = 'block';
            setTimeout(() => {
                showBatimentsInCommune(selectedCommuneFeature);
                if (spinnerElement) spinnerElement.style.display = 'none';
            }, 1000);
            
        });

        fetch('/api/commune')
            .then((response) => response.json())
            .then((data) => {
                communeGeojson = L.geoJSON(data, {
                    style,
                    onEachFeature: onEachCommuneFeature,
                }).addTo(map!);
                if (spinnerElement) spinnerElement.style.display = 'none';
            })
            .catch((error) => console.error('Error loading commune GeoJSON:', error));

        fetch('/api/batiment')
            .then((response) => response.json())
            .then((data) => {
                batimentData = data;
            })
            .catch((error) => console.error('Error loading batiment GeoJSON:', error));

        fetch('/api/communeStats')
            .then((response) => response.json())
            .then((data) => {
                pieChart2Data = data;
            })
            .catch((error) => console.error('Error loading piechart2 data:', error));

        return () => {
            if (map) {
                map.eachLayer((layer) => {
                    map.removeLayer(layer);
                });
                map.off();
                map.remove();
                map = null;
            }
        };
    }, []);

    return (
        <div id="the_map" className="h-full w-full relative"></div>
    );
};

export default Map;
