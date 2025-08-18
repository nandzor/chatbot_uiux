import React from 'react';

const Automations = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Automations</h2>
          <p className="text-gray-600">Manage N8N workflows and integrations</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          ⚡ New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow Status */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold">Workflow Status</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-green-600">🟢</span>
                  <span className="font-medium">Active</span>
                </div>
                <span className="text-sm font-bold text-green-600">8</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-yellow-600">🟡</span>
                  <span className="font-medium">Paused</span>
                </div>
                <span className="text-sm font-bold text-yellow-600">3</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-red-600">🔴</span>
                  <span className="font-medium">Error</span>
                </div>
                <span className="text-sm font-bold text-red-600">1</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">⚫</span>
                  <span className="font-medium">Draft</span>
                </div>
                <span className="text-sm font-bold text-gray-600">2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Workflows List */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold">Active Workflows</h3>
          </div>
          
          <div className="p-4">
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">Order Confirmation</h4>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Automatically sends confirmation emails when orders are placed.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Trigger: New Order</span>
                      <span>Executions: 1,234</span>
                      <span>Last run: 2 min ago</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      ⏸️
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      ✏️
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      🗑️
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">Customer Feedback</h4>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Collects feedback after chat sessions and sends to CRM.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Trigger: Chat End</span>
                      <span>Executions: 856</span>
                      <span>Last run: 15 min ago</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      ⏸️
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      ✏️
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      🗑️
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">Inventory Alert</h4>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Paused</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Notifies team when product inventory is low.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Trigger: Low Stock</span>
                      <span>Executions: 234</span>
                      <span>Last run: 1 day ago</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      ▶️
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      ✏️
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      🗑️
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">Data Sync</h4>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Error</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Syncs customer data between systems every hour.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Trigger: Hourly</span>
                      <span>Executions: 0</span>
                      <span>Last run: Failed</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      🔄
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      ✏️
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automations;
