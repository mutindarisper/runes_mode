import type { PageServerLoad } from './$types';

// Simulate server-side data fetching (e.g., database query, API call)
async function fetchServerData() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
        timestamp: new Date().toISOString(),
        message: "This data was loaded on the SERVER",
        serverInfo: {
            nodeVersion: process.version,
            platform: process.platform,
            memoryUsage: process.memoryUsage(),
            uptime: process.uptime()
        },
        randomData: Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            value: Math.random() * 100,
            serverGenerated: true
        }))
    };
}

export const load: PageServerLoad = async () => {
    console.log('🖥️  SERVER: Starting data fetch...');
    const startTime = Date.now();
    
    const data = await fetchServerData();
    
    const endTime = Date.now();
    console.log(`🖥️  SERVER: Data fetch completed in ${endTime - startTime}ms`);
    
    return {
        ...data,
        loadTime: endTime - startTime,
        loadType: 'server'
    };
};
