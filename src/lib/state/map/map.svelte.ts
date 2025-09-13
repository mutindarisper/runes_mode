import type mapboxgl from "mapbox-gl";


export const mapState = $state<{
    mapInstance: mapboxgl.Map | null;
    isLoaded: boolean;
}>({
    mapInstance: null,
    isLoaded: false
})