import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UserAvatar from '@/components/common/UserAvatar';
import WhatsAppQRConnector from './WhatsAppQRConnector';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Button,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Alert,
  AlertDescription,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui';
import { 
  Plus,
  MessageSquare,
  QrCode,
  Globe,
  Mail,
  Phone,
  Instagram,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreHorizontal,
  Settings,
  Users,
  Bot,
  Trash2,
  Edit,
  Eye,
  Zap,
  Shield,
  Activity,
  Clock,
  TrendingUp
} from 'lucide-react';

const InboxManagement = () => {
  const { user } = useAuth();
  const [showWhatsAppConnector, setShowWhatsAppConnector] = useState(false);
  const [activeTab, setActiveTab] = useState('connected-platforms');

  // Sample data untuk connected platforms
  const [connectedPlatforms, setConnectedPlatforms] = useState([
    {
      id: 'inbox-001',
      name: 'CS Tim Marketing',
      platform: 'whatsapp',
      status: 'connected',
      method: 'qr_scan',
      connectedAt: '2024-03-15 10:30:00',
      lastActivity: '2024-03-20 14:25:12',
      totalMessages: 342,
      activeChats: 8,
      assignedAgents: 3,
      phoneNumber: '+62 812-3456-7890'
    },
    {
      id: 'inbox-002',
      name: 'Support Technical',
      platform: 'webchat',
      status: 'connected',
      method: 'api_integration',
      connectedAt: '2024-03-10 09:15:00',
      lastActivity: '2024-03-20 13:50:45',
      totalMessages: 156,
      activeChats: 3,
      assignedAgents: 2,
      websiteUrl: 'https://company.com'
    },
    {
      id: 'inbox-003',
      name: 'Facebook Page',
      platform: 'facebook',
      status: 'error',
      method: 'oauth',
      connectedAt: '2024-03-12 14:20:00',
      lastActivity: '2024-03-18 16:30:22',
      totalMessages: 89,
      activeChats: 0,
      assignedAgents: 1,
      pageId: '@company.official'
    }
  ]);

  // Available platforms for connection
  const availablePlatforms = [
    {
      id: 'whatsapp-qr',
      name: 'WhatsApp QR Scan',
      description: 'Hubungkan nomor WhatsApp melalui QR Code (WAHA Session)',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      popular: true,
      riskLevel: 'medium'
    },
    {
      id: 'whatsapp-api',
      name: 'WhatsApp Business API',
      description: 'Koneksi resmi WhatsApp untuk bisnis (Coming Soon)',
      icon: Shield,
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      popular: false,
      riskLevel: 'low',
      comingSoon: true
    },
    {
      id: 'webchat',
      name: 'Website Chat Widget',
      description: 'Embed chat widget di website Anda',
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      popular: true,
      riskLevel: 'low'
    },
    {
      id: 'facebook',
      name: 'Facebook Messenger',
      description: 'Hubungkan halaman Facebook bisnis Anda',
      icon: MessageSquare,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      popular: false,
      riskLevel: 'low'
    },
    {
      id: 'instagram',
      name: 'Instagram Direct',
      description: 'Kelola pesan Instagram bisnis (Coming Soon)',
      icon: Instagram,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      popular: false,
      riskLevel: 'low',
      comingSoon: true
    },
    {
      id: 'email',
      name: 'Email Integration',
      description: 'Kelola email support melalui platform',
      icon: Mail,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      popular: false,
      riskLevel: 'low'
    }
  ];

  const getPlatformIcon = (platform) => {
    const icons = {
      whatsapp: MessageSquare,
      webchat: Globe,
      facebook: MessageSquare,
      instagram: Instagram,
      email: Mail,
      phone: Phone
    };
    const IconComponent = icons[platform] || MessageSquare;
    return <IconComponent className="w-4 h-4" />;
  };

  const getStatusBadge = (status) => {
    const variants = {
      connected: { variant: 'default', color: 'text-green-600', icon: CheckCircle },
      error: { variant: 'destructive', color: 'text-red-600', icon: XCircle },
      disconnected: { variant: 'secondary', color: 'text-gray-600', icon: AlertCircle }
    };
    
    const config = variants[status] || variants.disconnected;
    const IconComponent = config.icon;
    
    return (
      <Badge variant={config.variant} className="capitalize">
        <IconComponent className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getRiskBadge = (riskLevel) => {
    const configs = {
      low: { color: 'text-green-600', bg: 'bg-green-100', label: 'Rendah' },
      medium: { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Sedang' },
      high: { color: 'text-red-600', bg: 'bg-red-100', label: 'Tinggi' }
    };
    
    const config = configs[riskLevel] || configs.low;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
        Risk: {config.label}
      </span>
    );
  };

  const handleConnectPlatform = (platformId) => {
    if (platformId === 'whatsapp-qr') {
      setShowWhatsAppConnector(true);
    } else {
      // Handle other platform connections
      alert(`Koneksi ${platformId} akan segera tersedia`);
    }
  };

  const handleWhatsAppSuccess = (newInbox) => {
    setConnectedPlatforms(prev => [...prev, {
      ...newInbox,
      connectedAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      totalMessages: 0,
      activeChats: 0,
      assignedAgents: 0,
      phoneNumber: '+62 XXX-XXXX-XXXX'
    }]);
    setShowWhatsAppConnector(false);
  };

  const handleInboxAction = (action, inboxId) => {
    console.log(`${action} inbox:`, inboxId);
    // Implement inbox actions (edit, delete, configure, etc.)
  };

  return (
    <div className="space-y-4 lg:space-y-6 max-w-full overflow-hidden">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Inbox Management</h1>
        <p className="text-sm lg:text-base text-muted-foreground">
          Kelola koneksi platform dan inbox untuk menangani percakapan pelanggan
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="connected-platforms">Connected Platforms</TabsTrigger>
          <TabsTrigger value="add-platform">Add New Platform</TabsTrigger>
        </TabsList>

        {/* Connected Platforms Tab */}
        <TabsContent value="connected-platforms" className="space-y-4 lg:space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Platforms</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{connectedPlatforms.length}</div>
                <p className="text-xs text-muted-foreground">
                  {connectedPlatforms.filter(p => p.status === 'connected').length} aktif
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {connectedPlatforms.reduce((sum, p) => sum + p.totalMessages, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Minggu ini
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {connectedPlatforms.reduce((sum, p) => sum + p.activeChats, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Sedang berlangsung
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assigned Agents</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {connectedPlatforms.reduce((sum, p) => sum + p.assignedAgents, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total agent
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Connected Platforms Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Connected Platforms</CardTitle>
                  <CardDescription>Kelola semua platform yang terhubung dengan akun Anda</CardDescription>
                </div>
                <Button onClick={() => setActiveTab('add-platform')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Platform
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Stats</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {connectedPlatforms.map((platform) => (
                    <TableRow key={platform.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            platform.platform === 'whatsapp' ? 'bg-green-100' :
                            platform.platform === 'webchat' ? 'bg-blue-100' :
                            platform.platform === 'facebook' ? 'bg-blue-50' :
                            'bg-gray-100'
                          }`}>
                            {getPlatformIcon(platform.platform)}
                          </div>
                          <div>
                            <p className="font-medium">{platform.name}</p>
                            <p className="text-sm text-muted-foreground capitalize">
                              {platform.platform} • {platform.method.replace('_', ' ')}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(platform.status)}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {new Date(platform.lastActivity).toLocaleString('id-ID')}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Connected: {new Date(platform.connectedAt).toLocaleDateString('id-ID')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div>Messages: <span className="font-medium">{platform.totalMessages}</span></div>
                          <div>Active: <span className="font-medium">{platform.activeChats}</span></div>
                          <div>Agents: <span className="font-medium">{platform.assignedAgents}</span></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleInboxAction('view', platform.id)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleInboxAction('configure', platform.id)}>
                              <Settings className="w-4 h-4 mr-2" />
                              Configure
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleInboxAction('agents', platform.id)}>
                              <Users className="w-4 h-4 mr-2" />
                              Manage Agents
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleInboxAction('ai', platform.id)}>
                              <Bot className="w-4 h-4 mr-2" />
                              AI Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleInboxAction('edit', platform.id)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleInboxAction('delete', platform.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add Platform Tab */}
        <TabsContent value="add-platform" className="space-y-4 lg:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Platform</CardTitle>
              <CardDescription>
                Pilih platform yang ingin Anda hubungkan untuk menangani percakapan pelanggan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {availablePlatforms.map((platform) => {
                  const IconComponent = platform.icon;
                  return (
                    <Card 
                      key={platform.id} 
                      className={`relative cursor-pointer transition-all hover:shadow-md ${
                        platform.comingSoon ? 'opacity-60' : 'hover:border-primary'
                      }`}
                      onClick={() => !platform.comingSoon && handleConnectPlatform(platform.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg ${platform.bgColor}`}>
                              <IconComponent className={`w-6 h-6 ${platform.color}`} />
                            </div>
                            <div>
                              <CardTitle className="text-base">{platform.name}</CardTitle>
                              {platform.popular && (
                                <Badge variant="secondary" className="mt-1">Popular</Badge>
                              )}
                            </div>
                          </div>
                          {platform.comingSoon && (
                            <Badge variant="outline">Coming Soon</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                          {platform.description}
                        </p>
                        <div className="flex items-center justify-between">
                          {getRiskBadge(platform.riskLevel)}
                          <Button 
                            size="sm" 
                            disabled={platform.comingSoon}
                            variant={platform.comingSoon ? "ghost" : "default"}
                          >
                            {platform.comingSoon ? 'Coming Soon' : 'Connect'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Risk Information */}
              <Alert className="mt-6">
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Informasi Risiko:</strong>
                  <ul className="mt-2 text-sm space-y-1">
                    <li>• <strong>Rendah:</strong> API resmi, stabil untuk produksi</li>
                    <li>• <strong>Sedang:</strong> Tidak resmi, cocok untuk testing/skala kecil</li>
                    <li>• <strong>Tinggi:</strong> Eksperimental, dapat berubah sewaktu-waktu</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* WhatsApp QR Connector Modal */}
      {showWhatsAppConnector && (
        <WhatsAppQRConnector
          onClose={() => setShowWhatsAppConnector(false)}
          onSuccess={handleWhatsAppSuccess}
        />
      )}
    </div>
  );
};

export default InboxManagement;
