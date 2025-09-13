<script lang="ts">
    import mapboxgl from "mapbox-gl";
    import "mapbox-gl/dist/mapbox-gl.css";
    import "../pulsingDot.css"
    import { mapState } from "$lib/state/map/map.svelte";

   

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
            mapState.mapInstance = map
            mapState.isLoaded = true
        
            
           
        });

        map.on('error', (e) => {
            console.error('Map error:', e);
        });

        return () => {
            if (map) {
                map.remove();
                mapLoaded = false;
                mapState.mapInstance = null
                mapState.isLoaded = false
            }
        };
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
