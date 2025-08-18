import React from 'react';
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

const Sidebar = ({ role, activeMenu, setActiveMenu }) => {
  const { user } = useAuth();
  const getSidebarItems = () => {
    switch(role) {
      case 'super_admin':
        return [
          { id: 'dashboard', label: 'Platform Dashboard', icon: Home },
          { id: 'organizations', label: 'Organizations', icon: Building2 },
          { id: 'subscriptions', label: 'Subscription Plans', icon: CreditCard },
          { id: 'system', label: 'System Health', icon: Activity },
          { id: 'audit', label: 'Audit Logs', icon: Shield }
        ];
      case 'org_admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'inbox', label: 'Inbox', icon: MessageSquare },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
          // { id: 'automations', label: 'Automations', icon: Workflow },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      case 'agent':
        return [
          { id: 'my-dashboard', label: 'My Dashboard', icon: Home },
          { id: 'inbox', label: 'Inbox (Percakapan)', icon: MessageSquare },
          { id: 'my-profile', label: 'My Profile & Settings', icon: User }
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
            <p className="text-xs text-muted-foreground capitalize">{role.replace('_', ' ')}</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {sidebarItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  activeMenu === item.id 
                    ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-primary border-l-4 border-primary' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
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
