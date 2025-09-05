<script lang="ts">
    import Navbar from "$lib/components/ui/Navbar.svelte";
    import "../app.css"
	import Sidebar from "$lib/components/ui/Sidebar.svelte";
	import MainContentArea from "$lib/components/ui/MainContentArea.svelte";

    let selectedLayer = $state([])
</script>

<div class="h-screen flex flex-col ">
    <Navbar />

    <div class="flex-1 flex">
        <Sidebar {selectedLayer} />
        <MainContentArea />
    </div>
    
    
</div>

