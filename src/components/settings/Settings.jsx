import React from 'react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600">Configure your organization settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold">Settings</h3>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">⚙️</span>
                  <span className="font-medium">General</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">🔐</span>
                  <span className="font-medium">Security</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">👥</span>
                  <span className="font-medium">Team</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">💳</span>
                  <span className="font-medium">Billing</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">🔌</span>
                  <span className="font-medium">Integrations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold">General Settings</h3>
          </div>
          
          <div className="p-4">
            <div className="space-y-6">
              {/* Organization Info */}
              <div>
                <h4 className="text-lg font-medium mb-4">Organization Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Tech Company Ltd"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Code
                    </label>
                    <input
                      type="text"
                      defaultValue="TECH001"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="admin@company.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Bot Settings */}
              <div>
                <h4 className="text-lg font-medium mb-4">Bot Configuration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bot Name
                    </label>
                    <input
                      type="text"
                      defaultValue="CompanyBot"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Greeting Message
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="Hello! Welcome to our company. How can I help you today?"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Operating Hours
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>24/7</option>
                      <option>Business Hours (9 AM - 6 PM)</option>
                      <option>Extended Hours (8 AM - 8 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
