import React from 'react';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          <p className="text-gray-600">Performance insights and metrics</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          📊 Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Sessions</h3>
            <span className="text-2xl">📊</span>
          </div>
          <div className="text-2xl font-bold">12,847</div>
          <p className="text-xs text-green-600">+15% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Avg Response Time</h3>
            <span className="text-2xl">⏱️</span>
          </div>
          <div className="text-2xl font-bold">2.3s</div>
          <p className="text-xs text-green-600">-0.5s from average</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Customer Satisfaction</h3>
            <span className="text-2xl">⭐</span>
          </div>
          <div className="text-2xl font-bold">4.8/5</div>
          <p className="text-xs text-green-600">+0.2 from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Resolution Rate</h3>
            <span className="text-2xl">✅</span>
          </div>
          <div className="text-2xl font-bold">94%</div>
          <p className="text-xs text-green-600">+3% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Channel Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌐</span>
                <div>
                  <p className="font-medium text-gray-900">Web Chat</p>
                  <p className="text-sm text-gray-500">Most popular channel</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">8,234</div>
                <p className="text-xs text-green-600">+12%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-medium text-gray-900">WhatsApp</p>
                  <p className="text-sm text-gray-500">Mobile preferred</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">3,456</div>
                <p className="text-xs text-green-600">+8%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📘</span>
                <div>
                  <p className="font-medium text-gray-900">Facebook</p>
                  <p className="text-sm text-gray-500">Social media</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">1,157</div>
                <p className="text-xs text-red-600">-2%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Top Intents</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Order Status</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold">28%</span>
                <p className="text-xs text-gray-500">3,456 queries</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Product Info</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold">24%</span>
                <p className="text-xs text-gray-500">2,987 queries</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium">Technical Support</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold">16%</span>
                <p className="text-xs text-gray-500">1,987 queries</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">Billing Issues</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold">13%</span>
                <p className="text-xs text-gray-500">1,567 queries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
