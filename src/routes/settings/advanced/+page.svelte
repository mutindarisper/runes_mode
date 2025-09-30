<h2 class="text-xl font-semibold text-gray-900 mb-4">Advanced Settings</h2>

<div class="space-y-6">
    <div class="bg-white p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Developer Options</h3>
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <div>
                    <h4 class="font-medium text-gray-900">Debug Mode</h4>
                    <p class="text-sm text-gray-600">Enable additional logging and debugging information</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
            
            <div class="flex items-center justify-between">
                <div>
                    <h4 class="font-medium text-gray-900">Experimental Features</h4>
                    <p class="text-sm text-gray-600">Enable beta features that may be unstable</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Performance</h3>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cache Size</label>
                <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="small">Small (50MB)</option>
                    <option value="medium" selected>Medium (100MB)</option>
                    <option value="large">Large (200MB)</option>
                </select>
            </div>
            
            <button class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                Clear Cache
            </button>
        </div>
    </div>

    <div class="bg-white p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Reset Settings</h3>
        <p class="text-gray-600 mb-4">Reset all settings to their default values. This action cannot be undone.</p>
        <button class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Reset to Defaults
        </button>
    </div>
</div>
