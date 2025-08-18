# 📘 Project Best Practices

## 1. Project Purpose
This is a React-based chatbot UI/UX application built with Vite, featuring a multi-role dashboard system for chatbot management. The application supports three distinct user roles: Super Admin (platform-wide management), Organization Admin (organization-level management), and Agent (individual agent interface). It provides comprehensive chatbot management capabilities including conversation handling, analytics, knowledge base management, and automation workflows.

## 2. Project Structure
```
src/
├── components/          # React components organized by feature
│   ├── agent/          # Agent-specific components
│   ├── analytics/      # Analytics and reporting components
│   ├── auth/           # Authentication components
│   ├── automations/    # Automation workflow components
│   ├── dashboard/      # Dashboard components
│   ├── inbox/          # Message/conversation components
│   ├── knowledge/      # Knowledge base components
│   ├── layout/         # Layout components (Sidebar, etc.)
│   ├── settings/       # Settings and configuration components
│   ├── superadmin/     # Super admin specific components
│   └── ui/             # Reusable UI components with index.js barrel export
├── contexts/           # React Context providers for global state
├── data/               # Static data, mock data, and configuration
├── hooks/              # Custom React hooks (currently empty)
├── styles/             # Global CSS and styling
└── utils/              # Utility functions and helpers
```

- **Feature-based organization**: Components are grouped by business domain/feature
- **UI components**: Centralized reusable components with barrel exports
- **Context-based state management**: Global state managed through React Context
- **Data layer**: Separated mock data and configuration from components

## 3. Test Strategy
- **Framework**: No testing framework currently configured
- **Recommendation**: Consider adding Jest + React Testing Library for unit tests
- **Testing approach**: Focus on component behavior, context providers, and utility functions
- **Mock strategy**: Use existing mock data structure in `/src/data/` for testing

## 4. Code Style

### Language-specific Rules
- **React**: Functional components with hooks, no class components
- **JSX**: Use React 18+ automatic JSX runtime (no explicit React imports needed)
- **ES Modules**: Use ES6+ import/export syntax throughout
- **Async/Await**: Prefer async/await over Promise chains

### Naming Conventions
- **Components**: PascalCase (e.g., `AuthProvider`, `MyDashboard`)
- **Files**: PascalCase for components (e.g., `Button.jsx`, `AuthContext.jsx`)
- **Variables/Functions**: camelCase (e.g., `currentUser`, `authenticateUser`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `BEST_PRACTICES`)
- **CSS Classes**: Use Tailwind utility classes, kebab-case for custom classes

### Component Structure
- Use `React.forwardRef` for UI components that need ref forwarding
- Set `displayName` for better debugging experience
- Destructure props with default values in function signature
- Use spread operator for passing through additional props

### Error Handling
- Use try-catch blocks for async operations
- Provide user-friendly error messages
- Log errors to console for debugging
- Implement loading states for async operations

## 5. Common Patterns

### Context Pattern
```jsx
// Create context with custom hook
const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Component Composition
- Use compound components pattern for complex UI (e.g., Card, CardHeader, CardContent)
- Implement variant-based styling with object mapping
- Use `cn()` utility for conditional class merging

### Role-based Rendering
- Centralized role configuration in `userConfig.js`
- Switch-case pattern for role-based content rendering
- Menu items dynamically generated based on user role

### UI Component Pattern
- Consistent API across all UI components
- Support for `variant`, `size`, and `className` props
- Use Tailwind CSS with CSS custom properties for theming

## 6. Do's and Don'ts

### ✅ Do's
- Use the `cn()` utility for combining Tailwind classes
- Implement proper loading states for async operations
- Use React Context for global state management
- Follow the established folder structure for new components
- Use barrel exports (`index.js`) for component groups
- Implement proper error boundaries and error handling
- Use semantic HTML elements and proper accessibility attributes
- Leverage Tailwind's design system and custom properties

### ❌ Don'ts
- Don't use inline styles; prefer Tailwind utility classes
- Don't create deeply nested component hierarchies
- Don't store sensitive data (like passwords) in localStorage without encryption
- Don't bypass the established authentication flow
- Don't create components without proper prop validation
- Don't use class components; stick to functional components
- Don't ignore ESLint warnings and errors

## 7. Tools & Dependencies

### Core Dependencies
- **React 18.2**: UI library with modern hooks and concurrent features
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **Recharts**: Charting library for analytics components

### Development Tools
- **ESLint**: Code linting with React-specific rules
- **PostCSS + Autoprefixer**: CSS processing
- **clsx + tailwind-merge**: Conditional class name utilities

### Setup Instructions
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run lint        # Run ESLint
```

## 8. Other Notes

### For LLM Code Generation
- Always use the established component patterns and folder structure
- Implement proper TypeScript-style prop destructuring even in JavaScript
- Use the existing UI components from `/src/components/ui/` before creating new ones
- Follow the role-based access control patterns when adding new features
- Maintain consistency with the existing Tailwind design system
- Use the `cn()` utility for all conditional styling
- Implement proper loading and error states for user interactions
- Consider the multi-tenant nature of the application (super admin, org admin, agent roles)

### Authentication & Authorization
- Authentication state is managed through `AuthContext`
- User data is persisted in localStorage (consider security implications for production)
- Role-based menu rendering is handled in `RoleContext`
- Always validate user permissions before rendering sensitive components

### Styling System
- Uses CSS custom properties for theming (defined in Tailwind config)
- Consistent spacing, colors, and typography through Tailwind utilities
- Custom animations defined in Tailwind config for smooth transitions
- Responsive design should follow mobile-first approach