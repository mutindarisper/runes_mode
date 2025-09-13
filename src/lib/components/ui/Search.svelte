<script lang="ts">
	import { mapState } from "$lib/state/map/map.svelte";
    import { addSearchLayer, updateSearchLayer } from "../../../features/search/layers/searchLayer";


    let { searchTerm = $bindable(), searchResults = $bindable() }: {
        searchTerm: string;
        searchResults: any | null;
    } = $props();



    // Initialize search layer when map is ready
    $effect(() => {
        const map = mapState.mapInstance;
        if (!map || !mapState.isLoaded) return;

        addSearchLayer(map);
    });

    // Update search layer when searchResults change
    $effect(() => {
        const map = mapState.mapInstance;
        if (!map || !mapState.isLoaded) return;

        updateSearchLayer(map, searchResults);
    });

</script>


<div>
    <input
        class="bg-slate-200 w-full p-2 border rounded-lg"
        bind:value={searchTerm}
        type="text"
        placeholder="Search for places"
    />
</div>