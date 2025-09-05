<script lang="ts">
  // Bindable prop (array since multiple checkboxes)
  let { selectedLayer = $bindable() }: { selectedLayer: string[] } = $props();

  const layers = [
    { id: "crops", label: "Crops", color: "bg-blue-500" },
    { id: "disasters", label: "Disasters", color: "bg-orange-500" },
    { id: "energy", label: "Energy", color: "bg-green-500" },
  ];

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

    console.log("Selected layers:", selectedLayer);
  }
</script>

<aside class="w-64 bg-sidebar border-r border-sidebar-border p-4 space-y-6">
  <div>
    <h3 class="text-sm font-medium text-gray-500 mb-3">Layers</h3>
    <p class="mb-2">Selected: {selectedLayer.join(", ")}</p>

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
