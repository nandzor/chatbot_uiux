# 🤖 ChatBot Pro - React Application

## 📋 Overview

ChatBot Pro adalah aplikasi React modern yang dirancang untuk manajemen chatbot dengan sistem role-based access control (RBAC). Aplikasi ini mendukung tiga role utama: Super Admin, Organization Admin, dan Agent.

## 🏗️ Architecture

Proyek ini mengikuti **best practices React** dengan struktur yang scalable, maintainable, dan developer-friendly:

```
src/
├── api/                    # 🚀 API services & configuration
├── assets/                 # 📁 Static assets
├── components/             # 🧩 Reusable UI components
├── config/                 # ⚙️ Application configuration
├── contexts/               # 🔄 React contexts
├── features/               # 🎯 Feature-specific components
├── hooks/                  # 🪝 Custom React hooks
├── layouts/                # 🏠 Layout components
├── pages/                  # 📄 Page components
├── routes/                 # 🛣️ Routing configuration
├── utils/                  # 🛠️ Utility functions
├── data/                   # 📊 Static data
└── styles/                 # 🎨 Global styles
```

## 🚀 Key Features

### **1. Role-Based Access Control (RBAC)**
- **Super Admin**: Akses penuh ke seluruh sistem
- **Organization Admin**: Manajemen organisasi dan tim
- **Agent**: Handling chat dan customer support

### **2. Modern React Architecture**
- **Path Aliases**: Import absolut dengan `@/` prefix
- **Custom Hooks**: Reusable logic dengan `useAuth`, `useNavigation`
- **Service Layer**: API calls terpisah dari components
- **Context API**: Global state management

### **3. UI/UX Excellence**
- **Tailwind CSS**: Utility-first styling
- **Lucide Icons**: Modern icon library
- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme support

### **4. Security & Performance**
- **Environment Variables**: Sensitive data protection
- **Input Validation**: Comprehensive form validation
- **Error Handling**: Robust error boundaries
- **Code Splitting**: Lazy loading untuk performance

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: React Context API
- **Code Quality**: ESLint, Prettier
- **Build Tool**: Vite

## 📦 Installation

### **Prerequisites**
- Node.js 18+ 
- npm atau yarn

### **Setup**
```bash
# Clone repository
git clone <repository-url>
cd chatbot_uiux

# Install dependencies
npm install

# Setup environment
cp env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Run Prettier
```

## 🔐 Authentication

### **Test Users**
```javascript
// Super Admin
username: 'superadmin'
password: 'super123'

// Organization Admin  
username: 'orgadmin'
password: 'admin123'

// Agent
username: 'agent1'
password: 'agent123'
```

### **Role Permissions**
- **Super Admin**: `['*']` (All permissions)
- **Organization Admin**: `['handle_chats', 'manage_users', 'manage_agents', 'manage_settings', 'view_analytics', 'manage_billing', 'manage_automations']`
- **Agent**: `['handle_chats', 'view_conversations', 'update_profile']`

## 🗂️ Project Structure

### **Components Organization**
```
src/components/
├── ui/              # Base UI components (Button, Card, Input, etc.)
├── layout/          # Layout components (Sidebar, Header, etc.)
└── common/          # Shared components (UserAvatar, etc.)
```

### **Features Organization**
```
src/features/
├── auth/           # Authentication components
├── dashboard/      # Dashboard components
├── superadmin/     # Super admin components
├── agent/          # Agent components
└── shared/         # Shared feature components
```

### **API Layer**
```
src/api/
├── axios.js        # Axios configuration with interceptors
├── authService.js  # Authentication API calls
└── subscriptionPlansService.js
```

### **Configuration**
```
src/config/
└── constants.js    # Application constants (roles, permissions, routes)
```

## 🔧 Development

### **Path Aliases**
Proyek menggunakan path aliases untuk import yang bersih:
```javascript
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency } from '@/utils/formatters';
import { ROUTES } from '@/config/constants';
```

### **Code Quality**
- **ESLint**: Code linting dan quality rules
- **Prettier**: Code formatting
- **Import Ordering**: Automatic import organization

### **Best Practices**
- **Separation of Concerns**: Logic terpisah dari UI
- **Component Composition**: Reusable components
- **Error Boundaries**: Proper error handling
- **Performance Optimization**: Lazy loading, memoization

## 📱 Features by Role

### **Super Admin Dashboard**
- Platform overview
- Organization management
- Subscription plans
- System health monitoring
- Financial analytics

### **Organization Admin Dashboard**
- Team management
- Chat handling
- Analytics & reporting
- Knowledge base
- Automations
- Settings

### **Agent Dashboard**
- Chat interface
- Customer support
- Profile management
- Conversation history

## 🔄 State Management

### **Authentication Context**
```javascript
const { user, isAuthenticated, login, logout, hasPermission } = useAuth();
```

### **Role-Based Routing**
```javascript
<RoleBasedRoute requiredRole="organization_admin">
  <Dashboard />
</RoleBasedRoute>
```

## 🎨 Styling

### **Tailwind CSS Classes**
- Utility-first approach
- Responsive design
- Dark/light mode support
- Custom component styling

### **Component Styling**
```javascript
// Example component with Tailwind
<div className="w-full p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
</div>
```

## 🚀 Deployment

### **Production Build**
```bash
npm run build
```

### **Environment Variables**
```bash
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_NAME=ChatBot Pro
VITE_DEBUG=false
```

## 📚 Documentation

- **STRUCTURE.md**: Detailed project structure
- **API Documentation**: Service layer documentation
- **Component Documentation**: UI components guide

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

Untuk bantuan dan pertanyaan:
- Create an issue di repository
- Contact development team
- Check documentation di `STRUCTURE.md`

---

**ChatBot Pro** - Modern React Application dengan Best Practices 🚀
