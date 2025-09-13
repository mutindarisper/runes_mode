<script lang="ts">
  import Map from "$lib/components/map/Map.svelte";
  import axios from "axios";
  import Search from "$lib/components/ui/Search.svelte";
	import { mapState } from "$lib/state/map/map.svelte";

  type GeoJSONType = 'FeatureCollection' | 'Feature' | 'Polygon' | 'MultiPolygon';
  type GeoJSONGeometry = { type: GeoJSONType; coordinates: any[] };
  type GeoJSONFeature = { type: 'Feature'; properties: Record<string, any>; geometry: GeoJSONGeometry; bbox?: number[] };
  type GeoJSONFeatureCollection = { type: 'FeatureCollection'; licence: string; features: GeoJSONFeature[] };
  
  let searchTerm = $state('');
  let searchResults = $state<GeoJSONFeatureCollection | null>(null);
  
    
  async function fetchData() {
    if (!searchTerm.trim()) return;

    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchTerm)}&format=geojson&polygon_geojson=1&limit=5`
      );
      
      console.log('Raw API response:', res.data);
      
      if (res.data && res.data.features) {
        // Filter for features with polygon geometry only
        const polygonFeatures = res.data.features.filter((feature: GeoJSONFeature) => 
          feature.geometry && 
          (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon')
        );

        console.log('Filtered polygon features:', polygonFeatures);

        if (polygonFeatures.length > 0) {
          searchResults = {
            type: 'FeatureCollection',
            licence: res.data.licence || '',
            features: polygonFeatures
          };
          console.log('Setting search results:', searchResults);
        } else {
          searchResults = null;
          console.log('No polygon features found for this search term');
        }
      } else {
        searchResults = null;
        console.log('No features found in API response');
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      searchResults = null;
    }
  }

  $effect(() => {
    if (searchTerm.trim()) {
      // Add a small debounce to avoid too many requests
      const timeoutId = setTimeout(fetchData, 500);


      return () => clearTimeout(timeoutId);
    } else {
      searchResults = null; // Clear results when search term is empty
    }
  });

  


	function addedEmptyRegionLayer(map: Map | null) {
		throw new Error("Function not implemented.");
	}
</script>

<div class="flex-1 flex flex-col">
  <div class="flex-1 relative bg-muted">
    <div class="absolute inset-0">
      <Map />
    </div>
 
    <div class="absolute top-4 left-0 right-0 flex items-center justify-between px-4">
      <div class="max-w-md w-full">
        <Search bind:searchTerm bind:searchResults />
      </div>
  
      <div class="flex flex-col items-center space-y-2 ">
        <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">+</button>
        <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer ">−</button>
      </div>
    </div>
  </div>
</div>