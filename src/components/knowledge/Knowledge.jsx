import React from 'react';

const Knowledge = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Knowledge Base</h2>
          <p className="text-gray-600">Manage articles and help content</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          📝 New Article
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold">Categories</h3>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">📋</span>
                  <span className="font-medium">Getting Started</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">5 articles</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">🛒</span>
                  <span className="font-medium">Orders & Shipping</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">12 articles</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">🔧</span>
                  <span className="font-medium">Technical Support</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">8 articles</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">💳</span>
                  <span className="font-medium">Billing & Payments</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">6 articles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Articles</h3>
              <input
                type="text"
                placeholder="Search articles..."
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="p-4">
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">How to Place Your First Order</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Step-by-step guide for new customers to place their first order on our platform.
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-gray-500">Category: Getting Started</span>
                      <span className="text-xs text-gray-500">Views: 1,234</span>
                      <span className="text-xs text-gray-500">Last updated: 2 days ago</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
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
                    <h4 className="font-medium text-gray-900">Understanding Shipping Options</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Detailed information about different shipping methods, costs, and delivery times.
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-gray-500">Category: Orders & Shipping</span>
                      <span className="text-xs text-gray-500">Views: 856</span>
                      <span className="text-xs text-gray-500">Last updated: 1 week ago</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
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
                    <h4 className="font-medium text-gray-900">Troubleshooting Common Issues</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Solutions for frequently encountered problems and their quick fixes.
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-gray-500">Category: Technical Support</span>
                      <span className="text-xs text-gray-500">Views: 2,156</span>
                      <span className="text-xs text-gray-500">Last updated: 3 days ago</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
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

export default Knowledge;
