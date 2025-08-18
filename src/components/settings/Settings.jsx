import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Button,
  Badge,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator,
  Alert,
  AlertDescription,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Avatar,
  AvatarFallback,
  AvatarImage
} from '../ui';
import { 
  Save, 
  RefreshCw, 
  Download, 
  Upload,
  Copy,
  Shield,
  User,
  Bot,
  Globe,
  Bell,
  Palette,
  Database,
  Key,
  Webhook,
  FileText,
  Users,
  Settings as SettingsIcon,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  CreditCard,
  Zap,
  Hash,
  MessageSquare,
  UserCheck,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter
} from 'lucide-react';
import { agentsData, integrationsData } from '../../data/sampleData';
import IntegrationCard from './IntegrationCard';
import IntegrationModal from './IntegrationModal';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('channels');
  const [showApiKey, setShowApiKey] = useState(false);
  const [teamTab, setTeamTab] = useState('users');
  const [editingAgent, setEditingAgent] = useState(null);
  const [agentsList, setAgentsList] = useState(agentsData);
  
  // Integrations state
  const [integrationsState, setIntegrationsState] = useState(integrationsData);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const channels = [
    { id: 1, name: 'Website Chat', type: 'Web Widget', status: 'Aktif', lastUsed: '2 menit lalu' },
    { id: 2, name: 'WhatsApp Business', type: 'WhatsApp', status: 'Aktif', lastUsed: '5 menit lalu' },
    { id: 3, name: 'Facebook Messenger', type: 'Facebook', status: 'Nonaktif', lastUsed: '2 jam lalu' },
  ];

  const botPersonalities = [
    { id: 1, name: 'Bahasa Inggris Professional', language: 'English', tone: 'Formal', greetingMessage: 'Halo! Selamat datang, bagaimana saya bisa membantu Anda?', errorMessage: 'Maaf, saya tidak mengerti. Bisakah Anda mengulangi dengan kata lain?' },
    { id: 2, name: 'Bahasa Jawa', language: 'Indonesia', tone: 'Informal', greetingMessage: 'Hai! Ada yang bisa saya bantu?', errorMessage: 'Ups, saya belum paham. Coba tanya dengan cara lain ya!' },
    { id: 3, name: 'Bahasa Sunda ramah dan cerdas', language: 'Bahasa Sunda', tone: 'Ramag', greetingMessage: 'Hello! How may I assist you today?', errorMessage: 'I apologize, but I didn\'t understand. Could you please rephrase?' },
  ];

  const users = [
    { id: 1, name: 'Ahmad Rahman', email: 'ahmad.rahman@company.com', role: 'org_admin', avatar: 'AR', status: 'Aktif', lastLogin: '2 jam lalu' },
    { id: 2, name: 'Sari Dewi', email: 'sari.dewi@company.com', role: 'agent', avatar: 'SD', status: 'Aktif', lastLogin: '30 menit lalu' },
    { id: 3, name: 'Budi Santoso', email: 'budi.santoso@company.com', role: 'viewer', avatar: 'BS', status: 'Nonaktif', lastLogin: '1 hari lalu' },
  ];

  // Gunakan data agents dari state dengan mapping bot personalities
  const agents = agentsList.map(agent => {
    const personality = botPersonalities.find(p => p.id === agent.botPersonalityId);
    return {
      ...agent,
      personalityName: personality ? personality.name : 'No Personality',
      currentChats: agent.activeChats,
      totalChats: agent.totalHandled,
      avgResponseTime: agent.avgHandlingTime
    };
  });

  // Fungsi untuk update bot personality agent
  const updateAgentPersonality = (agentId, newPersonalityId) => {
    setAgentsList(prevAgents =>
      prevAgents.map(agent =>
        agent.id === agentId
          ? { ...agent, botPersonalityId: newPersonalityId }
          : agent
      )
    );
    setEditingAgent(null);
  };

  // Fungsi untuk integrations
  const handleConfigureIntegration = (integration) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };

  const handleSaveIntegrationConfig = (integrationId, config) => {
    setIntegrationsState(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, config }
          : integration
      )
    );
  };

  const handleToggleIntegrationStatus = (integrationId) => {
    setIntegrationsState(prev => 
      prev.map(integration => {
        if (integration.id === integrationId) {
          const newStatus = integration.status === 'active' ? 'inactive' : 'active';
          return { ...integration, status: newStatus };
        }
        return integration;
      })
    );
  };

  // Filter integrations based on selected category and search query
  const filteredIntegrations = integrationsState.filter(integration => {
    // Filter by category
    const categoryMatch = selectedCategory === 'all' || integration.category === selectedCategory;
    
    // Filter by search query
    const searchMatch = searchQuery === '' || 
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

  // Group integrations by category
  const integrationsByCategory = integrationsState.reduce((acc, integration) => {
    const category = integration.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(integration);
    return acc;
  }, {});

  const categoryNames = {
    productivity: 'Productivity',
    communication: 'Communication',
    shipping: 'Shipping & Logistics',
    notification: 'Notifications',
    security: 'Security',
    automation: 'Automation',
    crm: 'CRM & Sales',
    payment: 'Payment & Billing',
    location: 'Location & Maps',
    marketing: 'Marketing & Campaigns',
    analytics: 'Analytics & Insights',
    feedback: 'Feedback & Surveys',
    inventory: 'Inventory & Stock',
    ai: 'AI & Machine Learning',
    utility: 'Utilities & Tools'
  };

  const apiKeys = [
    { id: 1, name: 'Production API', prefix: 'pk_live_', created: '15 Mar 2024', lastUsed: '2 jam lalu', status: 'Aktif' },
    { id: 2, name: 'Development API', prefix: 'pk_test_', created: '10 Mar 2024', lastUsed: '1 hari lalu', status: 'Aktif' },
    { id: 3, name: 'Staging API', prefix: 'pk_test_', created: '5 Mar 2024', lastUsed: '3 hari lalu', status: 'Nonaktif' },
  ];

  const webhooks = [
    { id: 1, name: 'Order Notifications', url: 'https://api.company.com/webhook/orders', events: ['message.received', 'conversation.ended'], status: 'Aktif' },
    { id: 2, name: 'Customer Updates', url: 'https://crm.company.com/webhook', events: ['customer.updated'], status: 'Nonaktif' },
  ];

  const auditLogs = [
    { id: 1, timestamp: '2024-03-20 14:30:25', user: 'Ahmad Rahman', action: 'API Key Created', resource: 'Production API', ip: '192.168.1.100' },
    { id: 2, timestamp: '2024-03-20 13:45:12', user: 'Sari Dewi', action: 'User Role Updated', resource: 'Budi Santoso', ip: '192.168.1.101' },
    { id: 3, timestamp: '2024-03-20 12:15:45', user: 'Ahmad Rahman', action: 'Webhook Modified', resource: 'Order Notifications', ip: '192.168.1.100' },
    { id: 4, timestamp: '2024-03-20 11:30:18', user: 'System', action: 'Bot Personality Updated', resource: 'Ramah & Profesional', ip: 'System' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Pengaturan</h2>
        <p className="text-muted-foreground">Konfigurasi teknis dan administratif untuk organisasi</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="bot-personalities">Bot Personalities</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="team-management">Team Management</TabsTrigger>
          <TabsTrigger value="billing">Billing & Subscription</TabsTrigger>
          <TabsTrigger value="developer">Developer</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Channels Tab */}
        <TabsContent value="channels" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Channel Configurations
                  </CardTitle>
                  <CardDescription>Kelola channel_configs yang aktif dan konfigurasi kredensial API</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Channel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Channel</TableHead>
                    <TableHead>Tipe</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Terakhir Digunakan</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {channels.map((channel) => (
                    <TableRow key={channel.id}>
                      <TableCell className="font-medium">{channel.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{channel.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={channel.status === 'Aktif' ? 'default' : 'secondary'}>
                          {channel.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{channel.lastUsed}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                API Credentials & Webhook
              </CardTitle>
              <CardDescription>Konfigurasi kredensial API dan webhook untuk integrasi channel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-token">WhatsApp Business Token</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="whatsapp-token" 
                      type={showApiKey ? "text" : "password"}
                      defaultValue="EAABwzLixnjYBOZB..." 
                    />
                    <Button variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook-app-secret">Facebook App Secret</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="facebook-app-secret" 
                      type="password"
                      defaultValue="**********************" 
                    />
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input 
                  id="webhook-url" 
                  defaultValue="https://your-domain.com/api/webhook"
                  placeholder="https://your-domain.com/webhook" 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Webhook Verification</Label>
                  <p className="text-sm text-muted-foreground">Verifikasi webhook untuk keamanan tambahan</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bot Personalities Tab */}
        <TabsContent value="bot-personalities" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    Bot Personalities
                  </CardTitle>
                  <CardDescription>Kelola bot_personalities untuk mengatur bahasa, tone, dan pesan sistem</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Personality
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Personality</TableHead>
                    <TableHead>Bahasa</TableHead>
                    <TableHead>Tone</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {botPersonalities.map((personality) => (
                    <TableRow key={personality.id}>
                      <TableCell className="font-medium">{personality.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{personality.language}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{personality.tone}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Pesan Sistem
              </CardTitle>
              <CardDescription>Konfigurasi greeting_message, error_message, dan pesan sistem lainnya</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="personality-select">Pilih Personality</Label>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {botPersonalities.map((personality) => (
                      <SelectItem key={personality.id} value={personality.id.toString()}>
                        {personality.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="greeting-message">Greeting Message</Label>
                <Textarea 
                  id="greeting-message" 
                  defaultValue={botPersonalities[0].greetingMessage}
                  rows={3}
                  placeholder="Pesan sambutan untuk pengguna baru"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="error-message">Error Message</Label>
                <Textarea 
                  id="error-message" 
                  defaultValue={botPersonalities[0].errorMessage}
                  rows={3}
                  placeholder="Pesan ketika bot tidak memahami input pengguna"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language-select">Bahasa</Label>
                  <Select defaultValue="id">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tone-select">Tone</Label>
                  <Select defaultValue="formal">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="informal">Informal</SelectItem>
                      <SelectItem value="friendly">Ramah</SelectItem>
                      <SelectItem value="professional">Profesional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Connected Apps</h3>
              <p className="text-muted-foreground">
                Connect your chatbot with third-party applications to extend its functionality.
              </p>
            </div>
            
            {/* Filters */}
            <div className="flex gap-3">
              {/* Search Box */}
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              {/* Category Filter */}
              <div className="w-64">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories ({integrationsState.length})</SelectItem>
                    {Object.entries(integrationsByCategory).map(([category, integrations]) => (
                      <SelectItem key={category} value={category}>
                        {categoryNames[category]} ({integrations.length})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Integration Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{filteredIntegrations.filter(i => i.status === 'active').length}</p>
                    <p className="text-sm text-muted-foreground">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{filteredIntegrations.filter(i => i.status === 'inactive').length}</p>
                    <p className="text-sm text-muted-foreground">Inactive</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{filteredIntegrations.length}</p>
                    <p className="text-sm text-muted-foreground">{selectedCategory === 'all' ? 'Total' : 'In Category'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Settings className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {filteredIntegrations.filter(i => 
                        i.configRequired && Object.keys(i.config).length > 0
                      ).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Configured</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedCategory === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All ({integrationsState.length})
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedCategory('communication')}
              className={selectedCategory === 'communication' ? 'bg-primary text-primary-foreground' : ''}
            >
              Communication ({integrationsByCategory.communication?.length || 0})
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedCategory('payment')}
              className={selectedCategory === 'payment' ? 'bg-primary text-primary-foreground' : ''}
            >
              Payment ({integrationsByCategory.payment?.length || 0})
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedCategory('automation')}
              className={selectedCategory === 'automation' ? 'bg-primary text-primary-foreground' : ''}
            >
              Automation ({integrationsByCategory.automation?.length || 0})
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedCategory('productivity')}
              className={selectedCategory === 'productivity' ? 'bg-primary text-primary-foreground' : ''}
            >
              Productivity ({integrationsByCategory.productivity?.length || 0})
            </Button>
          </div>

          {/* Results Info */}
          {(searchQuery || selectedCategory !== 'all') && (
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  Showing {filteredIntegrations.length} of {integrationsState.length} integrations
                  {searchQuery && ` matching "${searchQuery}"`}
                  {selectedCategory !== 'all' && ` in ${categoryNames[selectedCategory]}`}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}

          {/* No Results */}
          {filteredIntegrations.length === 0 && (
            <div className="text-center py-12">
              <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No integrations found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? `No integrations match your search "${searchQuery}"` 
                  : `No integrations found in ${categoryNames[selectedCategory]}`
                }
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Show all integrations
              </Button>
            </div>
          )}

          {/* Integrations Grid */}
          {filteredIntegrations.length > 0 && (
            <div className="space-y-4">
              {selectedCategory === 'all' && !searchQuery ? (
                // Show by categories when viewing all and no search
                Object.entries(integrationsByCategory).map(([category, integrations]) => {
                  const categoryFiltered = integrations.filter(integration => 
                    filteredIntegrations.includes(integration)
                  );
                  
                  if (categoryFiltered.length === 0) return null;
                  
                  return (
                    <div key={category} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-semibold">{categoryNames[category]}</h4>
                        <Badge variant="outline">{categoryFiltered.length}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryFiltered.map((integration) => (
                          <IntegrationCard
                            key={integration.id}
                            integration={integration}
                            onConfigure={handleConfigureIntegration}
                            onToggleStatus={handleToggleIntegrationStatus}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                // Show flat grid when filtering by category or searching
                <div className="space-y-4">
                  {selectedCategory !== 'all' && (
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-semibold">{categoryNames[selectedCategory]}</h4>
                      <Badge variant="outline">{filteredIntegrations.length}</Badge>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredIntegrations.map((integration) => (
                      <IntegrationCard
                        key={integration.id}
                        integration={integration}
                        onConfigure={handleConfigureIntegration}
                        onToggleStatus={handleToggleIntegrationStatus}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* Team Management Tab */}
        <TabsContent value="team-management" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Management
              </CardTitle>
              <CardDescription>Kelola users dan agents dalam organisasi</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={teamTab} onValueChange={setTeamTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="agents">Agents</TabsTrigger>
                </TabsList>

                {/* Users Tab */}
                <TabsContent value="users" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Mengundang users baru dan menetapkan role (org_admin, agent, viewer)</p>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Invite User
                    </Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>{user.avatar}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'org_admin' ? 'default' : user.role === 'agent' ? 'secondary' : 'outline'}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status === 'Aktif' ? 'default' : 'secondary'}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                {/* Agents Tab */}
                <TabsContent value="agents" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Kelola profil spesifik agents, mengatur specialization dan max_concurrent_chats</p>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Agent
                    </Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Agent</TableHead>
                        <TableHead>Bot Personality</TableHead>
                        <TableHead>Max Concurrent</TableHead>
                        <TableHead>Current Chats</TableHead>
                        <TableHead>Total Chats</TableHead>
                        <TableHead>Avg Response</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agents.map((agent) => (
                        <TableRow key={agent.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                agent.status === 'online' ? 'bg-green-500' : 
                                agent.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                              }`}></div>
                              {agent.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Bot className="w-4 h-4 text-primary" />
                              <Badge variant="secondary">{agent.personalityName}</Badge>
                            </div>
                          </TableCell>
                          <TableCell>{agent.maxConcurrentChats}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{agent.currentChats}</span>
                              <Badge variant={agent.currentChats >= agent.maxConcurrentChats ? 'destructive' : 'secondary'} className="text-xs">
                                {agent.currentChats >= agent.maxConcurrentChats ? 'Full' : 'Available'}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>{agent.totalChats}</TableCell>
                          <TableCell>{agent.avgResponseTime}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setEditingAgent(agent)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <UserCheck className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing & Subscription Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Subscription Details
              </CardTitle>
              <CardDescription>Detail subscriptions aktif dan penggunaan saat ini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <h4 className="font-semibold">Pro Plan</h4>
                  </div>
                  <p className="text-2xl font-bold">$49/bulan</p>
                  <p className="text-sm text-muted-foreground">Berlaku hingga 20 April 2024</p>
                  <Badge className="mt-2">Aktif</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-blue-500" />
                    <h4 className="font-semibold">Usage Data</h4>
                  </div>
                  <p className="text-2xl font-bold">1,245</p>
                  <p className="text-sm text-muted-foreground">Pesan bulan ini</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '62%'}}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">62% dari 2,000 limit</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold">Active Users</h4>
                  </div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">dari 10 seat</p>
                  <Badge variant="secondary" className="mt-2">80% Used</Badge>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Invoice
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Payment Transactions
              </CardTitle>
              <CardDescription>Riwayat payment_transactions dan billing</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Invoice</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>20 Mar 2024</TableCell>
                    <TableCell>Pro Plan - Subscription</TableCell>
                    <TableCell>$49.00</TableCell>
                    <TableCell>
                      <Badge variant="default">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>20 Feb 2024</TableCell>
                    <TableCell>Pro Plan - Subscription</TableCell>
                    <TableCell>$49.00</TableCell>
                    <TableCell>
                      <Badge variant="default">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>20 Jan 2024</TableCell>
                    <TableCell>Pro Plan - Subscription</TableCell>
                    <TableCell>$49.00</TableCell>
                    <TableCell>
                      <Badge variant="default">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Developer Tab */}
        <TabsContent value="developer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                API Keys
              </CardTitle>
              <CardDescription>Membuat, melihat prefix, dan menonaktifkan API key</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Kelola API keys untuk integrasi aplikasi</p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create API Key
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Prefix</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((apiKey) => (
                    <TableRow key={apiKey.id}>
                      <TableCell className="font-medium">{apiKey.name}</TableCell>
                      <TableCell>
                        <code className="bg-muted px-2 py-1 rounded text-sm">{apiKey.prefix}***</code>
                      </TableCell>
                      <TableCell>{apiKey.created}</TableCell>
                      <TableCell className="text-muted-foreground">{apiKey.lastUsed}</TableCell>
                      <TableCell>
                        <Badge variant={apiKey.status === 'Aktif' ? 'default' : 'secondary'}>
                          {apiKey.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="w-5 h-5" />
                Webhooks
              </CardTitle>
              <CardDescription>Konfigurasi URL endpoint untuk menerima notifikasi event-driven</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Setup webhook endpoints untuk event notifications</p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Webhook
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Events</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhooks.map((webhook) => (
                    <TableRow key={webhook.id}>
                      <TableCell className="font-medium">{webhook.name}</TableCell>
                      <TableCell>
                        <code className="bg-muted px-2 py-1 rounded text-xs">{webhook.url}</code>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {webhook.events.map((event, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={webhook.status === 'Aktif' ? 'default' : 'secondary'}>
                          {webhook.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security & Audit Logs
              </CardTitle>
              <CardDescription>Tampilan read-only audit_logs dengan filter organization_id</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Audit logs menampilkan aktivitas untuk organization_id Anda saja. Data ini tidak dapat diedit dan bersifat read-only.
                </AlertDescription>
              </Alert>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
                      </TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-sm text-muted-foreground">Menampilkan 4 dari 156 total log entries</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>


      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end gap-2 pt-6 border-t">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Edit Agent Bot Personality Modal */}
      {editingAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Setup Bot Personality untuk {editingAgent.name}
              </CardTitle>
              <CardDescription>
                Pilih personality yang akan digunakan oleh agent ini dalam berinteraksi dengan pelanggan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Agent Info */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 rounded-full ${
                    editingAgent.status === 'online' ? 'bg-green-500' : 
                    editingAgent.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <h4 className="font-semibold">{editingAgent.name}</h4>
                    <p className="text-sm text-muted-foreground">{editingAgent.specialization}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Current Personality:</strong> {editingAgent.personalityName}
                </div>
              </div>

              {/* Personality Selection */}
              <div className="space-y-3">
                <Label>Pilih Bot Personality</Label>
                <div className="space-y-3">
                  {botPersonalities.map((personality) => (
                    <div 
                      key={personality.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        editingAgent.botPersonalityId === personality.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setEditingAgent({...editingAgent, botPersonalityId: personality.id})}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{personality.name}</h4>
                            <Badge variant="outline">{personality.language}</Badge>
                            <Badge variant="secondary">{personality.tone}</Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <strong>Greeting:</strong> 
                              <p className="text-muted-foreground mt-1">{personality.greetingMessage}</p>
                            </div>
                            <div>
                              <strong>Error Message:</strong> 
                              <p className="text-muted-foreground mt-1">{personality.errorMessage}</p>
                            </div>
                          </div>
                        </div>
                        {editingAgent.botPersonalityId === personality.id && (
                          <div className="ml-3">
                            <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setEditingAgent(null)}
                >
                  Batal
                </Button>
                <Button 
                  onClick={() => updateAgentPersonality(editingAgent.id, editingAgent.botPersonalityId)}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Personality
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Integration Configuration Modal */}
      <IntegrationModal
        integration={selectedIntegration}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedIntegration(null);
        }}
        onSave={handleSaveIntegrationConfig}
      />
    </div>
  );
};

export default Settings;
