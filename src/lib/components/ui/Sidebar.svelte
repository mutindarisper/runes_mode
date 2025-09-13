<script lang="ts">
	import { mapState } from "$lib/state/map/map.svelte";
  import { addCropsLayer, removeCropsLayer } from "../../../features/crop-suitability/layers/cropLayer";
  import { addDisastersLayer, removeDisastersLayer } from "../../../features/disasters/layers/disasterLayer";
  import { addEnergyLayer, removeEnergyLayer } from "../../../features/energy/layers/energyLayer";


  // Internal state for selected layers
  let selectedLayer = $state<string[]>([]);

  const layers = [
    { id: "crops", label: "Crops", color: "bg-blue-500" },
    { id: "disasters", label: "Disasters", color: "bg-orange-500" },
    { id: "energy", label: "Energy", color: "bg-green-500" },
  ];


  $effect(()=> {
    const map = mapState.mapInstance;
    if(!map) return

    //check for crops selection and add to map

    if(selectedLayer.includes("crops")) {
      addCropsLayer(map)
      } else {
        removeCropsLayer(map)
    }

    //check for disasters selection and add to map
    if(selectedLayer.includes("disasters")) {
      addDisastersLayer(map)
      } else {
        removeDisastersLayer(map)
    }

    //check for energy selection and add to map
    if(selectedLayer.includes("energy")) {
      addEnergyLayer(map)
      } else {
        removeEnergyLayer(map)
    }
  })

  function handleLayerChange(e: Event, layerId: string) {
    const input = e.target as HTMLInputElement;

    if (input.checked) {
      // Add layer if not already in array
      if (!selectedLayer.includes(layerId)) {
        selectedLayer = [...selectedLayer, layerId];
      }
    } else {
      // Remove layer from array
      selectedLayer = selectedLayer.filter((id) => id !== layerId);
    }

    console.log("Sidebar - Selected layers:", selectedLayer);
  }
</script>

<aside class="w-64 bg-sidebar border-r border-sidebar-border p-4 space-y-6">
  <div>
    <h3 class="text-sm font-medium text-gray-500 mb-3">Layers</h3>
   

    <div class="space-y-3">
      {#each layers as layer}
        <label class="flex items-center space-x-2">
          <input
            type="checkbox"
            class={`w-3 h-3 rounded-full ${layer.color}`}
            value={layer.id}
            checked={selectedLayer.includes(layer.id)}
            onchange={(e) => handleLayerChange(e, layer.id)}
          />
          <span class="text-gray-700 text-sm">{layer.label}</span>
        </label>
      {/each}
    </div>
  </div>
</aside>