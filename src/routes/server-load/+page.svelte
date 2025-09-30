<script lang="ts">
    import type { PageData } from './$types';
    
    let { data }: { data: PageData } = $props();
    
    // This will be available immediately since data was loaded on server
    console.log('📄 PAGE: Server data received:', data);
</script>

<svelte:head>
    <title>Server Load Test</title>
</svelte:head>

<div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Server Load Test</h1>
    
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        <h2 class="font-bold">🖥️ Server-Side Loading</h2>
        <p class="text-sm">This data was fetched on the server before the page was sent to the browser.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg border border-gray-200">
            <h3 class="text-lg font-semibold mb-4">Load Information</h3>
            <div class="space-y-2 text-sm">
                <p><strong>Load Type:</strong> <span class="bg-green-100 px-2 py-1 rounded">{data.loadType}</span></p>
                <p><strong>Load Time:</strong> {data.loadTime}ms</p>
                <p><strong>Timestamp:</strong> {data.timestamp}</p>
                <p><strong>Message:</strong> {data.message}</p>
            </div>
        </div>

        <div class="bg-white p-6 rounded-lg border border-gray-200">
            <h3 class="text-lg font-semibold mb-4">Server Information</h3>
            <div class="space-y-2 text-sm">
                <p><strong>Node Version:</strong> {data.serverInfo.nodeVersion}</p>
                <p><strong>Platform:</strong> {data.serverInfo.platform}</p>
                <p><strong>Uptime:</strong> {Math.round(data.serverInfo.uptime)}s</p>
                <p><strong>Memory (RSS):</strong> {Math.round(data.serverInfo.memoryUsage.rss / 1024 / 1024)}MB</p>
            </div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-lg border border-gray-200 mt-6">
        <h3 class="text-lg font-semibold mb-4">Random Data (Server Generated)</h3>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
            {#each data.randomData as item}
                <div class="bg-gray-100 p-3 rounded text-center">
                    <div class="font-bold">{item.id}</div>
                    <div class="text-sm text-gray-600">{item.value.toFixed(2)}</div>
                </div>
            {/each}
        </div>
    </div>

    <div class="mt-6 text-center">
        <a href="/client-load" class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Compare with Client Load →
        </a>
    </div>
</div>
