import React from 'react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600">Real-time performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
            📅 Today
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
            📥 Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Sessions</h3>
            <span className="text-2xl">📊</span>
          </div>
          <div className="text-2xl font-bold">1,247</div>
          <p className="text-xs text-green-600">+12% from yesterday</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Customer Satisfaction</h3>
            <span className="text-2xl">⭐</span>
          </div>
          <div className="text-2xl font-bold">4.8/5</div>
          <p className="text-xs text-green-600">+0.2 from last week</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Response Time</h3>
            <span className="text-2xl">⏱️</span>
          </div>
          <div className="text-2xl font-bold">2.3s</div>
          <p className="text-xs text-green-600">-0.5s from average</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Active Agents</h3>
            <span className="text-2xl">👥</span>
          </div>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-gray-600">of 30 total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Top Intents</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Order Status</p>
                <p className="text-sm text-gray-500">342 queries</p>
              </div>
              <span className="text-sm text-green-600">+5%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Product Information</p>
                <p className="text-sm text-gray-500">289 queries</p>
              </div>
              <span className="text-sm text-gray-600">0%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Technical Support</p>
                <p className="text-sm text-gray-500">198 queries</p>
              </div>
              <span className="text-sm text-red-600">-3%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-500">✅</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Chat session resolved</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-500">🔄</span>
              <div>
                <p className="text-sm font-medium text-gray-900">New agent joined</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-yellow-500">⚠️</span>
              <div>
                <p className="text-sm font-medium text-gray-900">High queue volume</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
