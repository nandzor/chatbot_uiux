import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import UserAvatar from '../common/UserAvatar';
import { 
  Home, 
  Building2, 
  Users, 
  CreditCard, 
  Activity, 
  Shield,
  MessageSquare, 
  BarChart3, 
  BookOpen, 
  Workflow, 
  Settings, 
  User,
  Bot
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui';

const Sidebar = ({ role }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  const getSidebarItems = () => {
    switch(role) {
      case 'superadmin':
        return [
          { id: 'dashboard', label: 'Platform Dashboard', icon: Home, href: '/superadmin' },
          { id: 'organizations', label: 'Organizations', icon: Building2, href: '/superadmin/organizations' },
          { id: 'subscriptions', label: 'Subscription Plans', icon: CreditCard, href: '/superadmin/financials' },
          { id: 'system', label: 'System Health', icon: Activity, href: '/superadmin/system' },
          { id: 'audit', label: 'Audit Logs', icon: Shield, href: '/superadmin/audit' }
        ];
      case 'organization_admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard' },
          { id: 'inbox', label: 'Inbox', icon: MessageSquare, href: '/dashboard/inbox' },
          { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
          { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen, href: '/dashboard/knowledge' },
          { id: 'automations', label: 'Automations', icon: Workflow, href: '/dashboard/automations' },
          { id: 'settings', label: 'Settings', icon: Settings, href: '/dashboard/settings' }
        ];
      case 'agent':
        return [
          { id: 'dashboard', label: 'My Dashboard', icon: Home, href: '/agent' },
          { id: 'inbox', label: 'Inbox (Percakapan)', icon: MessageSquare, href: '/agent/inbox' },
          { id: 'profile', label: 'My Profile & Settings', icon: User, href: '/agent/profile' }
        ];
      default:
        return [];
    }
  };

  const sidebarItems = getSidebarItems();

  return (
    <div className="w-64 h-full bg-card border-r border-border">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">ChatBot Pro</h1>
            <p className="text-xs text-muted-foreground capitalize">
              {role === 'superadmin' ? 'Super Admin' : 
               role === 'organization_admin' ? 'Organization Admin' : 
               role === 'agent' ? 'Agent' : role.replace('_', ' ')}
            </p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {sidebarItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href || 
                           (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
            
            return (
              <NavLink
                key={item.id}
                to={item.href}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-primary border-l-4 border-primary' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      
      <div className="bottom-0 left-0 right-0 p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <UserAvatar user={user} size="default" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{user?.name || 'Admin User'}</p>
            <Select defaultValue="online">
              <SelectTrigger className="h-6 text-xs border-0 p-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Online
                  </div>
                </SelectItem>
                <SelectItem value="busy">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    Busy
                  </div>
                </SelectItem>
                <SelectItem value="offline">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                    Offline
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
