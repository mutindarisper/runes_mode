<script lang="ts">
   

    let { searchTerm = $bindable(), searchResults = $bindable() }: {
        searchTerm: string;
        searchResults: any | null;
    } = $props();

</script>

<div>
    <input
        class="bg-slate-200 w-full p-2 border rounded-lg"
        bind:value={searchTerm}
        type="text"
        placeholder="Search for places"
    />
</div>