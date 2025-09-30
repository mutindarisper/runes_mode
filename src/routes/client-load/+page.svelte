<script lang="ts">
    import { onMount } from 'svelte';
    
    let isLoading = true;
    let data: any = null;
    let loadTime = 0;
    
    // Simulate client-side loading after component mounts
    onMount(async () => {
        console.log('🌐 CLIENT: Starting data fetch in component...');
        const startTime = Date.now();
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const endTime = Date.now();
        loadTime = endTime - startTime;
        
        data = {
            timestamp: new Date().toISOString(),
            message: "This data was loaded on the CLIENT after component mounted",
            clientInfo: {
                userAgent: navigator.userAgent,
                language: navigator.language,
                screenResolution: `${window.screen.width}x${window.screen.height}`,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            randomData: Array.from({ length: 10 }, (_, i) => ({
                id: i + 1,
                value: Math.random() * 100,
                clientGenerated: true
            })),
            loadTime,
            loadType: 'client'
        };
        
        console.log('🌐 CLIENT: Data fetch completed in', loadTime, 'ms');
        isLoading = false;
    });
</script>

<svelte:head>
    <title>Client Load Test</title>
</svelte:head>

<div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Client Load Test</h1>
    
    <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
        <h2 class="font-bold">🌐 Client-Side Loading</h2>
        <p class="text-sm">This data was fetched on the client after the page was loaded in the browser.</p>
    </div>

    {#if isLoading}
        <div class="flex items-center justify-center py-12">
            <div class="text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p class="text-gray-600">Loading data on client-side...</p>
                <p class="text-sm text-gray-500 mt-2">Notice the loading state!</p>
            </div>
        </div>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-lg border border-gray-200">
                <h3 class="text-lg font-semibold mb-4">Load Information</h3>
                <div class="space-y-2 text-sm">
                    <p><strong>Load Type:</strong> <span class="bg-blue-100 px-2 py-1 rounded">{data.loadType}</span></p>
                    <p><strong>Load Time:</strong> {data.loadTime}ms</p>
                    <p><strong>Timestamp:</strong> {data.timestamp}</p>
                    <p><strong>Message:</strong> {data.message}</p>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg border border-gray-200">
                <h3 class="text-lg font-semibold mb-4">Client Information</h3>
                <div class="space-y-2 text-sm">
                    <p><strong>User Agent:</strong> <span class="text-xs break-all">{data.clientInfo.userAgent}</span></p>
                    <p><strong>Language:</strong> {data.clientInfo.language}</p>
                    <p><strong>Screen:</strong> {data.clientInfo.screenResolution}</p>
                    <p><strong>Timezone:</strong> {data.clientInfo.timezone}</p>
                </div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-lg border border-gray-200 mt-6">
            <h3 class="text-lg font-semibold mb-4">Random Data (Client Generated)</h3>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
                {#each data.randomData as item}
                    <div class="bg-blue-50 p-3 rounded text-center">
                        <div class="font-bold">{item.id}</div>
                        <div class="text-sm text-gray-600">{item.value.toFixed(2)}</div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    <div class="mt-6 text-center">
        <a href="/server-load" class="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Compare with Server Load ←
        </a>
    </div>
</div>
