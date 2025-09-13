import mapboxgl from "mapbox-gl";

export function addSearchLayer(map: mapboxgl.Map) {
    if (!map.getSource("search-polygon")) {
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

        console.log('Search layer added to map');
    }
}

export function updateSearchLayer(map: mapboxgl.Map, searchResults: any) {
    const source = map.getSource("search-polygon") as mapboxgl.GeoJSONSource;
    if (!source) {
        console.log('Search source not found');
        return;
    }

    if (searchResults && searchResults.features && searchResults.features.length > 0) {
        // Set the data directly - Nominatim returns proper GeoJSON format
        source.setData(searchResults);

        // Calculate bounds and fit map
        const bounds = new mapboxgl.LngLatBounds();
        let hasValidBounds = false;

        searchResults.features.forEach((feature: { geometry: { type: string; coordinates: any[]; }; }) => {
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
        console.log('Clearing search polygon data');
        // Clear the map when searchResults is null or empty
        source.setData({
            type: "FeatureCollection",
            features: []
        });
    }
}

export function removeSearchLayer(map: mapboxgl.Map) {
    if (map.getLayer("search-polygon-outline")) map.removeLayer("search-polygon-outline");
    if (map.getSource("search-polygon")) map.removeSource("search-polygon");
}