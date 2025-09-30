<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    
    // Redirect to account settings by default
    onMount(() => {
        goto('/settings/account', { replaceState: true });
    });
</script>

<div class="flex items-center justify-center h-64">
    <div class="text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Redirecting to settings...</p>
    </div>
</div>