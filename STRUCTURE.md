# 🏗️ ChatBot Pro - Project Structure

## 📋 Overview

Proyek ini telah direstrukturisasi mengikuti best practices React untuk skalabilitas, maintainability, dan developer experience yang optimal.

## 🗂️ Directory Structure

```
src/
├── api/                    # API services dan konfigurasi
│   ├── axios.js           # Konfigurasi axios dengan interceptors
│   ├── authService.js     # Authentication API calls
│   └── subscriptionPlansService.js
├── assets/                # Static assets
│   ├── images/           # Gambar dan icons
│   └── styles/           # Global styles
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Button, Card, etc.)
│   ├── layout/          # Layout components (Header, Sidebar, etc.)
│   └── common/          # Shared components (UserAvatar, etc.)
├── config/              # Konfigurasi aplikasi
│   └── constants.js     # Semua konstanta aplikasi
├── contexts/            # React Context providers
│   ├── AuthContext.jsx
│   └── RoleContext.jsx
├── features/            # Feature-specific components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard components
│   ├── superadmin/     # Super admin components
│   ├── agent/          # Agent components
│   └── shared/         # Shared feature components
├── hooks/              # Custom React hooks
│   ├── useAuth.js      # Authentication hook
│   └── useNavigation.js
├── layouts/            # Layout components
│   ├── RootLayout.jsx
│   ├── AuthLayout.jsx
│   ├── DashboardLayout.jsx
│   ├── SuperAdminLayout.jsx
│   └── AgentLayout.jsx
├── pages/              # Page components (routes)
│   ├── auth/           # Auth pages
│   ├── dashboard/      # Dashboard pages
│   ├── superadmin/     # Super admin pages
│   ├── agent/          # Agent pages
│   └── errors/         # Error pages
├── routes/             # Routing configuration
│   └── index.jsx       # Main router configuration
├── utils/              # Utility functions
│   ├── validators.js   # Form validation utilities
│   ├── formatters.js   # Data formatting utilities
│   └── avatarUtils.js
├── data/               # Static data
│   ├── sampleData.js
│   └── subscriptionPlans.json
├── styles/             # Global styles
│   └── globals.css
├── App.jsx             # Root component
└── main.jsx           # Entry point
```

## 🔧 Key Features

### **1. Path Aliases**
- Menggunakan `@/` untuk import absolut
- Konfigurasi di `jsconfig.json` dan `vite.config.js`
- Contoh: `import { Button } from '@/components/ui/Button'`

### **2. API Layer**
- Centralized API configuration dengan axios
- Automatic token injection
- Error handling dan logging
- Request/response interceptors

### **3. Authentication System**
- Service-based authentication
- Custom hook `useAuth`
- Role-based access control
- Automatic token refresh

### **4. Component Organization**
- **UI Components**: Reusable, stateless components
- **Feature Components**: Business logic components
- **Layout Components**: Page structure components
- **Page Components**: Route-specific components

### **5. Validation & Formatting**
- Comprehensive form validation
- Data formatting utilities
- Currency, date, phone number formatting

## 🚀 Best Practices Implemented

### **1. Separation of Concerns**
- API logic terpisah dari components
- Business logic di custom hooks
- UI logic di components
- Data formatting di utilities

### **2. Code Quality**
- ESLint configuration untuk code quality
- Prettier untuk consistent formatting
- Import ordering dan organization
- Error handling yang comprehensive

### **3. Security**
- Environment variables untuk sensitive data
- Token-based authentication
- Role-based access control
- Input validation

### **4. Scalability**
- Modular architecture
- Feature-based organization
- Reusable components dan hooks
- Centralized configuration

## 📝 Usage Examples

### **Import Components**
```javascript
// Absolute imports
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency } from '@/utils/formatters';
import { ROUTES } from '@/config/constants';
```

### **API Calls**
```javascript
import authService from '@/api/authService';

const { success, user } = await authService.login(credentials);
```

### **Custom Hooks**
```javascript
import { useAuth } from '@/hooks/useAuth';

const { user, isAuthenticated, login, logout } = useAuth();
```

### **Validation**
```javascript
import { validateForm, validateEmail } from '@/utils/validators';

const errors = validateForm(values, validationRules);
```

## 🔄 Migration Notes

### **From Old Structure**
- Components moved from `src/components/` to `src/features/`
- Services moved to `src/api/`
- Utilities organized in `src/utils/`
- Constants centralized in `src/config/`

### **Import Updates**
- Update all relative imports to use path aliases
- Replace `../../components/` with `@/components/`
- Replace `../utils/` with `@/utils/`

## 🛠️ Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```

4. **Code Quality**
   ```bash
   npm run lint
   npm run format
   ```

## 📚 Additional Resources

- [React Best Practices](https://react.dev/learn)
- [Vite Configuration](https://vitejs.dev/config/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
