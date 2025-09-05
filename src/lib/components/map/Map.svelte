<script lang="ts">
    import mapboxgl from "mapbox-gl";
    import "mapbox-gl/dist/mapbox-gl.css";
    import "../pulsingDot.css"

    type GeoJSONType = 'FeatureCollection' | 'Feature' | 'Polygon' | 'MultiPolygon';
    type GeoJSONGeometry = { type: GeoJSONType; coordinates: any[] };
    type GeoJSONFeature = { type: 'Feature'; properties: Record<string, any>; geometry: GeoJSONGeometry; bbox?: number[] };
    type GeoJSONFeatureCollection = { type: 'FeatureCollection'; licence: string; features: GeoJSONFeature[] };

    let { searchResults, selectedLayer = $bindable([]) }: { searchResults: GeoJSONFeatureCollection | null; selectedLayer: string[] } = $props();
   

    let mapContainer: HTMLDivElement;
    let map: mapboxgl.Map;
    let mapLoaded = false;
    let userMarker: mapboxgl.Marker;
    let userLocationCoordinates = $state<{ lat: number; lng:number } | null> (null)
    let locationError = $state<string | null>(null)

    const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

    $effect(() => {
        if (!MAPBOX_TOKEN) {
            console.error('VITE_MAPBOX_TOKEN is not set'); 
            return;
        }

        mapboxgl.accessToken = MAPBOX_TOKEN;
        map = new mapboxgl.Map({
            container: mapContainer,
            style: "mapbox://styles/mapbox/satellite-v9",
            center: [36.8219, -1.2921], 
            zoom: 2
        });

      
        map.on("load", () => {
            console.log('Map loaded');
            mapLoaded = true;
            
            // Add empty source for polygons
            map.addSource("search-polygon", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: []
                }
            });

        
            // Add outline layer
            map.addLayer({
                id: "search-polygon-outline",
                type: "line",
                source: "search-polygon",
                paint: {
                    "line-color": "#fff",
                    "line-width": 2
                }
            });

            console.log('Empty source added to map');
        });

        map.on('error', (e) => {
            console.error('Map error:', e);
        });

        return () => {
            if (map) {
                map.remove();
                mapLoaded = false;
            }
        };
    });

    // Update source when searchResults changes
    $effect(() => {
        console.log('Effect triggered - mapLoaded:', mapLoaded, 'searchResults:', searchResults);
        
        if (!mapLoaded || !map) {
            console.log('Map not ready yet');
            return;
        }

        const source = map.getSource("search-polygon") as mapboxgl.GeoJSONSource;
        if (!source) {
            console.log('Source not found');
            return;
        }

        if (searchResults && searchResults.features && searchResults.features.length > 0) {
          
            $inspect(searchResults, 'Setting polygon data');
            
            // Set the data directly - Nominatim returns proper GeoJSON format
            source.setData(searchResults as GeoJSON.FeatureCollection);

            // Calculate bounds and fit map
            const bounds = new mapboxgl.LngLatBounds();
            let hasValidBounds = false;

            searchResults.features.forEach(feature => {
                if (feature.geometry.type === "Polygon") {
                    feature.geometry.coordinates[0].forEach(([lng, lat]: [number, number]) => {
                        if (typeof lng === 'number' && typeof lat === 'number') {
                            bounds.extend([lng, lat]);
                            hasValidBounds = true;
                        }
                    });
                } else if (feature.geometry.type === "MultiPolygon") {
                    feature.geometry.coordinates.forEach(polygon => {
                        polygon[0].forEach(([lng, lat]: [number, number]) => {
                            if (typeof lng === 'number' && typeof lat === 'number') {
                                bounds.extend([lng, lat]);
                                hasValidBounds = true;
                            }
                        });
                    });
                }
            });

            if (hasValidBounds) {
                console.log('Fitting bounds:', bounds);
                map.fitBounds(bounds, { 
                    padding: 50,
                    maxZoom: 15
                });
            }
        } else {
            console.log('Clearing polygon data');
            // Clear the map when searchResults is null or empty
            source.setData({
                type: "FeatureCollection",
                features: []
            });
        }
    });

    //effect to get the updated user location
    $effect(()=> {
      

        const watchId = navigator.geolocation.watchPosition(
			pos => {
				userLocationCoordinates = { lat: pos.coords.latitude, lng: pos.coords.longitude };
				locationError = null;
			},
			err => {
				locationError = err.message; 
			},
			{ enableHighAccuracy: true }
		);

		// Cleanup on unmount
		return () => {
			navigator.geolocation.clearWatch(watchId);
		};

    })

    //effect to update selected layer
  
    $effect(() => {
  console.log(
    "Effect triggered - mapLoaded:", 
    mapLoaded, 
    "selectedLayer:", 
    JSON.stringify(selectedLayer)
  );

  if (Array.isArray(selectedLayer) && selectedLayer.length > 0) {
    console.log("Active layers:", selectedLayer.join(", "));
  } else {
    console.log("No layers selected");
  }
});


    

$effect(() => {  
    if (!map || !userLocationCoordinates) return;

    if (!userMarker) {
        // Create a custom HTML element for the marker
        const el = document.createElement('div');
        el.className = 'pulse-marker';
        userMarker = new mapboxgl.Marker({element: el})
            .setLngLat([userLocationCoordinates.lng, userLocationCoordinates.lat])
            .addTo(map);

            map.flyTo({
            center: [userLocationCoordinates.lng, userLocationCoordinates.lat],
            zoom: 15,
            essential: true
        });
    } else {
        userMarker.setLngLat([userLocationCoordinates.lng, userLocationCoordinates.lat]);
    }
});

</script>

<div bind:this={mapContainer} class="h-full w-full"></div>
