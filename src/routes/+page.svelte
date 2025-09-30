<script lang="ts">
    import Navbar from "$lib/components/ui/Navbar.svelte";
    import "../app.css"
    import Sidebar from "$lib/components/ui/Sidebar.svelte";
    import MainContentArea from "$lib/components/ui/MainContentArea.svelte";
    import { goto } from "$app/navigation";
</script>

<div class="h-screen flex flex-col ">
    <!-- <Navbar /> -->

    <div class="flex-1 flex">
        <Sidebar />
        <MainContentArea />
    </div>

    <!-- Test Routes Navigation -->
    <div class="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
        <h3 class="font-semibold text-gray-800 mb-2">Test Routes</h3>
        <div class="space-y-2">
            <a href="/server-load" class="block bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors">
                🖥️ Server Load
            </a>
            <a href="/client-load" class="block bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                🌐 Client Load
            </a>
        </div>
    </div>
</div>