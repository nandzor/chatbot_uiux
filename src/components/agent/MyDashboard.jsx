import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const MyDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Overview performa dan beban kerja pribadi</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
            <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
            online
          </span>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            ⏰ Set Status
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Active Chats</h3>
            <span className="text-2xl">💬</span>
          </div>
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-gray-500">of 5 max</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Avg Response Time</h3>
            <span className="text-2xl">⏱️</span>
          </div>
          <div className="text-2xl font-bold">2m 34s</div>
          <p className="text-xs text-gray-500">Target: &lt; 3 minutes</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Satisfaction Rating</h3>
            <span className="text-2xl">⭐</span>
          </div>
          <div className="text-2xl font-bold">4.8</div>
          <p className="text-xs text-gray-500">from 42 ratings</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Weekly Trend</h3>
            <span className="text-2xl">📈</span>
          </div>
          <div className="text-2xl font-bold text-green-600">+12%</div>
          <p className="text-xs text-gray-500">vs last week</p>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white text-center p-6 rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Chats Today</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-2xl font-bold">8</span>
            <span className="text-sm font-medium text-green-600">+2</span>
          </div>
        </div>
        <div className="bg-white text-center p-6 rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Avg Response</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-2xl font-bold">2m 34s</span>
            <span className="text-sm font-medium text-green-600">-30s</span>
          </div>
        </div>
        <div className="bg-white text-center p-6 rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Satisfaction</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-2xl font-bold">4.8</span>
            <span className="text-sm font-medium text-green-600">+0.2</span>
          </div>
        </div>
        <div className="bg-white text-center p-6 rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-2xl font-bold">94%</span>
            <span className="text-sm font-medium text-green-600">+3%</span>
          </div>
        </div>
      </div>

      {/* Recent Chats & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Chats */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Chats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-medium">JD</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                  medium
                </span>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 ml-2">
                  active
                </span>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            View All Chats
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 h-12">
              💬 Start New Chat
            </button>
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 h-12">
              👥 View Queue
            </button>
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 h-12">
              ✅ Mark as Available
            </button>
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 h-12">
              ⚠️ Report Issue
            </button>
          </div>
        </div>
      </div>

      {/* Today's Summary */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Today's Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">8</div>
            <p className="text-sm text-gray-600">Chats Handled</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">6</div>
            <p className="text-sm text-gray-600">Resolved</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">2</div>
            <p className="text-sm text-gray-600">Escalated</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;
