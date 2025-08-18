// Konfigurasi user untuk testing dengan 3 role berbeda
export const users = [
  {
    id: 1,
    username: "superadmin",
    email: "superadmin@platform.com",
    password: "superadmin123", // Dalam production harus di-hash
    fullName: "Super Admin Platform",
    role: "super_admin",
    organizationId: null, // Super admin tidak terikat organisasi
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    status: "active",
    lastLogin: "2024-03-20T10:00:00Z"
  },
  {
    id: 2,
    username: "orgadmin",
    email: "admin@company.com",
    password: "orgadmin123",
    fullName: "John Company Admin",
    role: "org_admin",
    organizationId: 1,
    organizationName: "Tech Company Ltd",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    status: "active",
    lastLogin: "2024-03-20T09:30:00Z"
  },
  {
    id: 3,
    username: "agent1",
    email: "agent1@company.com",
    password: "agent123",
    fullName: "Sarah Wilson",
    role: "agent",
    organizationId: 1,
    organizationName: "Tech Company Ltd",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    status: "active",
    lastLogin: "2024-03-20T08:45:00Z",
    specialization: "Technical Support",
    maxConcurrentChats: 5,
    currentActiveChats: 2
  },
  {
    id: 4,
    username: "agent2",
    email: "agent2@company.com",
    password: "agent123",
    fullName: "Mike Johnson",
    role: "agent",
    organizationId: 1,
    organizationName: "Tech Company Ltd",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    status: "active",
    lastLogin: "2024-03-20T07:15:00Z",
    specialization: "Sales Support",
    maxConcurrentChats: 3,
    currentActiveChats: 1
  }
];

// Konfigurasi menu berdasarkan role
export const menuConfig = {
  super_admin: [
    {
      id: "platform-dashboard",
      label: "Platform Dashboard",
      icon: "BarChart3",
      path: "/platform-dashboard",
      description: "Overview seluruh platform SaaS"
    },
    {
      id: "organizations",
      label: "Organizations",
      icon: "Building2",
      path: "/organizations",
      description: "Kelola semua organisasi klien"
    },
    {
      id: "subscription-plans",
      label: "Subscription Plans",
      icon: "CreditCard",
      path: "/subscription-plans",
      description: "Kelola paket langganan"
    },
    {
      id: "system-logs",
      label: "System Logs",
      icon: "Activity",
      path: "/system-logs",
      description: "Monitor kesehatan sistem"
    },
    {
      id: "platform-settings",
      label: "Platform Settings",
      icon: "Settings",
      path: "/platform-settings",
      description: "Konfigurasi platform"
    }
  ],
  org_admin: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "BarChart3",
      path: "/dashboard",
      description: "Overview performa organisasi"
    },
    {
      id: "inbox",
      label: "Inbox",
      icon: "Inbox",
      path: "/inbox",
      description: "Kelola percakapan pelanggan"
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: "TrendingUp",
      path: "/analytics",
      description: "Analisis performa dan metrik"
    },
    {
      id: "knowledge",
      label: "Knowledge Base",
      icon: "BookOpen",
      path: "/knowledge",
      description: "Kelola basis pengetahuan bot"
    },
    {
      id: "automations",
      label: "Automations",
      icon: "Zap",
      path: "/automations",
      description: "Workflow dan integrasi N8N"
    },
    {
      id: "settings",
      label: "Settings",
      icon: "Settings",
      path: "/settings",
      description: "Konfigurasi organisasi"
    }
  ],
  agent: [
    {
      id: "my-dashboard",
      label: "My Dashboard",
      icon: "BarChart3",
      path: "/my-dashboard",
      description: "Overview performa pribadi"
    },
    {
      id: "inbox",
      label: "Inbox",
      icon: "Inbox",
      path: "/inbox",
      description: "Tangani percakapan pelanggan"
    },
    {
      id: "my-profile",
      label: "My Profile",
      icon: "User",
      path: "/my-profile",
      description: "Kelola profil dan status"
    }
  ]
};

// Fungsi untuk mendapatkan menu berdasarkan role
export const getMenuByRole = (role) => {
  return menuConfig[role] || [];
};

// Fungsi untuk mendapatkan user berdasarkan credentials
export const authenticateUser = (email, password) => {
  return users.find(user => 
    user.email === email && user.password === password
  );
};

// Fungsi untuk mendapatkan user berdasarkan ID
export const getUserById = (id) => {
  return users.find(user => user.id === parseInt(id));
};
