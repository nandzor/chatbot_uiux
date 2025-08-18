import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    {
      role: "Super Admin",
      email: "superadmin@platform.com",
      password: "superadmin123",
      description: "Akses penuh ke seluruh platform",
      color: "bg-blue-50 border-blue-200"
    },
    {
      role: "Admin Organisasi",
      email: "admin@company.com",
      password: "orgadmin123",
      description: "Kelola chatbot dan tim CS",
      color: "bg-green-50 border-green-200"
    },
    {
      role: "Agent",
      email: "agent1@company.com",
      password: "agent123",
      description: "Tangani percakapan pelanggan",
      color: "bg-purple-50 border-purple-200"
    }
  ];

  const handleDemoLogin = (email, password) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo dan Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <span className="text-white text-2xl">🤖</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ChatBot Platform</h1>
          <p className="text-gray-600">Masuk ke dashboard Anda</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl border-0 p-6">
          <h2 className="text-xl font-semibold text-center mb-6">Masuk</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 font-medium"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Demo Credentials
          </h3>
          <div className="space-y-3">
            {demoCredentials.map((cred, index) => (
              <div key={index} className={`border rounded-lg p-4 ${cred.color} hover:shadow-md transition-shadow cursor-pointer`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{cred.role}</h4>
                    <p className="text-sm text-gray-600 mb-2">{cred.description}</p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div><strong>Email:</strong> {cred.email}</div>
                      <div><strong>Password:</strong> {cred.password}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDemoLogin(cred.email, cred.password)}
                    className="ml-4 px-3 py-1 text-xs bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Use
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 ChatBot Platform. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
