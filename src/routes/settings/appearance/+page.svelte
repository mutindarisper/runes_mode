<h2 class="text-xl font-semibold text-gray-900 mb-4">Appearance Settings</h2>

<div class="space-y-6">
    <div class="bg-white p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Theme</h3>
        <div class="space-y-4">
            <div class="grid grid-cols-3 gap-4">
                <label class="relative cursor-pointer">
                    <input type="radio" name="theme" value="light" class="sr-only peer" checked>
                    <div class="p-4 border-2 border-gray-200 rounded-lg peer-checked:border-blue-500 peer-checked:bg-blue-50">
                        <div class="w-full h-8 bg-white border border-gray-300 rounded mb-2"></div>
                        <p class="text-sm font-medium text-center">Light</p>
                    </div>
                </label>
                
                <label class="relative cursor-pointer">
                    <input type="radio" name="theme" value="dark" class="sr-only peer">
                    <div class="p-4 border-2 border-gray-200 rounded-lg peer-checked:border-blue-500 peer-checked:bg-blue-50">
                        <div class="w-full h-8 bg-gray-800 border border-gray-600 rounded mb-2"></div>
                        <p class="text-sm font-medium text-center">Dark</p>
                    </div>
                </label>
                
                <label class="relative cursor-pointer">
                    <input type="radio" name="theme" value="system" class="sr-only peer">
                    <div class="p-4 border-2 border-gray-200 rounded-lg peer-checked:border-blue-500 peer-checked:bg-blue-50">
                        <div class="w-full h-8 bg-gradient-to-r from-white to-gray-800 border border-gray-300 rounded mb-2"></div>
                        <p class="text-sm font-medium text-center">System</p>
                    </div>
                </label>
            </div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Layout</h3>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sidebar Position</label>
                <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>
            </div>
            
            <div class="flex items-center justify-between">
                <div>
                    <h4 class="font-medium text-gray-900">Compact Mode</h4>
                    <p class="text-sm text-gray-600">Use a more compact layout to fit more content</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
        </div>
    </div>
</div>
