<h2 class="text-xl font-semibold text-gray-900 mb-4">Security Settings</h2>

<div class="space-y-6">
    <div class="bg-white p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Password</h3>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter current password">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter new password">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Confirm new password">
            </div>
        </div>
        <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Update Password
        </button>
    </div>

    <div class="bg-white p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
        <p class="text-gray-600 mb-4">Add an extra layer of security to your account.</p>
        <button class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Enable 2FA
        </button>
    </div>
</div>
