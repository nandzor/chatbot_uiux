import React from 'react';

const PlatformDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Dashboard</h1>
          <p className="text-gray-600">Overview kesehatan dan performa platform SaaS</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          📊 System Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Organizations</h3>
            <span className="text-2xl">🏢</span>
          </div>
          <div className="text-2xl font-bold">156</div>
          <p className="text-xs text-gray-500">142 active</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Subscriptions</h3>
            <span className="text-2xl">💳</span>
          </div>
          <div className="text-2xl font-bold">189</div>
          <p className="text-xs text-gray-500">$45,600/month</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Agents</h3>
            <span className="text-2xl">👥</span>
          </div>
          <div className="text-2xl font-bold">1,247</div>
          <p className="text-xs text-gray-500">Across all organizations</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">System Health</h3>
            <span className="text-2xl">📈</span>
          </div>
          <div className="text-2xl font-bold">99.98%</div>
          <p className="text-xs text-gray-500">Uptime • 0.02% error rate</p>
        </div>
      </div>

      {/* Recent Organizations & System Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Organizations */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Organizations</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">🏢</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">TechCorp Solutions</p>
                  <p className="text-sm text-gray-500">Professional Plan</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  active
                </span>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            View All Organizations
          </button>
        </div>

        {/* System Alerts */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">System Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-yellow-500">⚠️</span>
              <div className="flex-1">
                <p className="text-sm text-gray-900">High memory usage on server-03</p>
                <p className="text-xs text-gray-500">5 minutes ago</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            View All Alerts
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="h-20 border border-gray-300 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center">
            <span className="text-2xl mb-2">🏢</span>
            <span>Create Organization</span>
          </button>
          <button className="h-20 border border-gray-300 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center">
            <span className="text-2xl mb-2">💳</span>
            <span>Manage Plans</span>
          </button>
          <button className="h-20 border border-gray-300 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center">
            <span className="text-2xl mb-2">📈</span>
            <span>System Monitor</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlatformDashboard;
