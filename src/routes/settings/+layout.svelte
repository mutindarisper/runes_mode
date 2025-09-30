<script lang="ts">
    import type { LayoutProps } from './$types';
    import { page } from '$app/stores';
    
    let { data, children }: LayoutProps = $props();
</script>

<div class="flex h-screen">
    <!-- Settings Sidebar -->
    <aside class="w-64 bg-gray-100 border-r border-gray-200">
        <div class="p-6">
            <h1 class="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
            <nav>
                <div class="submenu space-y-2">
                    {#each data.sections as section}
                        <a 
                            href="/settings/{section.slug}"
                            class="block px-3 py-2 rounded-md text-sm font-medium transition-colors
                                {$page.url.pathname === `/settings/${section.slug}` 
                                    ? 'bg-blue-100 text-blue-700' 
                                    : 'text-gray-700 hover:bg-gray-200'}"
                        >
                            {section.title}
                        </a>
                    {/each}
                </div>
            </nav>
        </div>
    </aside>

    <!-- Settings Content -->
    <main class="flex-1 overflow-auto">
        <div class="p-6">
            {@render children()}
        </div>
    </main>
</div>
     