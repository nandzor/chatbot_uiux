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
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Users,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings as SettingsIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Tag,
  UserCheck,
  Clock,
  Info,
  Zap,
  Hash,
  MessageSquare,
  UserCheck as UserCheckIcon,
  Clock as ClockIcon,
  Activity,
  AlertTriangle as AlertTriangleIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  Search,
  Filter
} from 'lucide-react';
import { agentsData, integrationsData } from '../../data/sampleData';
import IntegrationCard from './IntegrationCard';
import IntegrationModal from './IntegrationModal';
import ChannelsTab from './ChannelsTab';
import IntegrationsTab from './IntegrationsTab';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('channels');
  const [showApiKey, setShowApiKey] = useState(false);
  const [teamTab, setTeamTab] = useState('users');
  const [editingAgent, setEditingAgent] = useState(null);
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
    { id: 1, name: 'Ramah & Profesional', language: 'ID', tone: 'Formal', greetingMessage: 'Halo! Selamat datang di layanan kami. Ada yang bisa saya bantu?', errorMessage: 'Maaf, saya tidak memahami permintaan Anda. Bisakah Anda menjelaskan lebih detail?' },
    { id: 2, name: 'Casual & Friendly', language: 'ID', tone: 'Informal', greetingMessage: 'Hai! Gimana kabarnya? Ada yang bisa dibantu?', errorMessage: 'Waduh, saya kurang paham nih. Coba dijelasin lagi dong!' },
  ];

  const users = [
    { id: 1, name: 'Ahmad Rahman', email: 'ahmad@company.com', role: 'Admin', status: 'online', lastSeen: 'Sekarang', avatar: '/avatars/ahmad.jpg' },
    { id: 2, name: 'Sari Dewi', email: 'sari@company.com', role: 'Agent', status: 'busy', lastSeen: '5 menit lalu', avatar: '/avatars/sari.jpg' },
    { id: 3, name: 'Budi Santoso', email: 'budi@company.com', role: 'Agent', status: 'offline', lastSeen: '2 jam lalu', avatar: '/avatars/budi.jpg' },
  ];

  const agents = [
    { id: 1, name: 'Sari Dewi', email: 'sari@company.com', specialization: 'Customer Support', status: 'online', activeSessions: 3, totalSessions: 127, avgResponseTime: '2m 30s', personalityName: 'Ramah & Profesional', botPersonalityId: 1 },
    { id: 2, name: 'Budi Santoso', email: 'budi@company.com', specialization: 'Technical Support', status: 'busy', activeSessions: 1, totalSessions: 89, avgResponseTime: '4m 15s', personalityName: 'Casual & Friendly', botPersonalityId: 2 },
    { id: 3, name: 'Rina Sari', email: 'rina@company.com', specialization: 'Sales', status: 'offline', activeSessions: 0, totalSessions: 156, avgResponseTime: '1m 45s', personalityName: 'Ramah & Profesional', botPersonalityId: 1 },
  ];

  const auditLogs = [
    { id: 1, timestamp: '2024-03-20 14:30:25', user: 'Ahmad Rahman', action: 'API Key Created', resource: 'Production API', ip: '192.168.1.100' },
    { id: 2, timestamp: '2024-03-20 13:45:12', user: 'Sari Dewi', action: 'User Role Updated', resource: 'Budi Santoso', ip: '192.168.1.101' },
    { id: 3, timestamp: '2024-03-20 12:15:45', user: 'Ahmad Rahman', action: 'Webhook Modified', resource: 'Order Notifications', ip: '192.168.1.100' },
    { id: 4, timestamp: '2024-03-20 11:30:18', user: 'System', action: 'Bot Personality Updated', resource: 'Ramah & Profesional', ip: 'System' },
  ];

  // Integration handlers
  const handleConfigureIntegration = (integration) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };

  const handleSaveIntegrationConfig = (config) => {
    if (selectedIntegration) {
      setIntegrationsState(prev => 
        prev.map(integration => 
          integration.id === selectedIntegration.id 
            ? { ...integration, config }
            : integration
        )
      );
    }
    setIsModalOpen(false);
    setSelectedIntegration(null);
  };

  const handleToggleIntegrationStatus = (integrationId) => {
    setIntegrationsState(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: integration.status === 'active' ? 'inactive' : 'active' }
          : integration
      )
    );
  };

  const updateAgentPersonality = (agentId, personalityId) => {
    // Update agent personality logic here
    console.log('Updating agent', agentId, 'with personality', personalityId);
    setEditingAgent(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Pengaturan</h2>
          <p className="text-muted-foreground">Konfigurasi teknis dan administratif untuk organisasi</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto scrollbar-hide mb-6">
            <TabsList className="inline-flex h-10 min-w-full lg:grid lg:grid-cols-7 lg:h-10">
              <TabsTrigger value="channels" className="text-xs lg:text-sm whitespace-nowrap px-3 lg:px-4">Channels</TabsTrigger>
              <TabsTrigger value="bot-personalities" className="text-xs lg:text-sm whitespace-nowrap px-3 lg:px-4">Bot Personalities</TabsTrigger>
              <TabsTrigger value="integrations" className="text-xs lg:text-sm whitespace-nowrap px-3 lg:px-4">Integrations</TabsTrigger>
              <TabsTrigger value="team-management" className="text-xs lg:text-sm whitespace-nowrap px-3 lg:px-4">Team</TabsTrigger>
              <TabsTrigger value="billing" className="text-xs lg:text-sm whitespace-nowrap px-3 lg:px-4">Billing</TabsTrigger>
              <TabsTrigger value="developer" className="text-xs lg:text-sm whitespace-nowrap px-3 lg:px-4">Developer</TabsTrigger>
              <TabsTrigger value="security" className="text-xs lg:text-sm whitespace-nowrap px-3 lg:px-4">Security</TabsTrigger>
            </TabsList>
          </div>

          {/* Channels Tab */}
          <TabsContent value="channels" className="space-y-6 focus:outline-none data-[state=inactive]:hidden">
            <ChannelsTab 
              channels={channels}
              showApiKey={showApiKey}
              setShowApiKey={setShowApiKey}
            />
          </TabsContent>

          {/* Bot Personalities Tab */}
          <TabsContent value="bot-personalities" className="space-y-6 focus:outline-none data-[state=inactive]:hidden">
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
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[200px]">Nama Personality</TableHead>
                        <TableHead className="min-w-[120px]">Bahasa</TableHead>
                        <TableHead className="min-w-[100px]">Tone</TableHead>
                        <TableHead className="min-w-[100px]">Aksi</TableHead>
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
                </div>
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
              <CardContent className="space-y-6 p-6">
                <div className="space-y-3">
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

                <div className="space-y-3">
                  <Label htmlFor="greeting-message">Greeting Message</Label>
                  <Textarea 
                    id="greeting-message" 
                    defaultValue={botPersonalities[0].greetingMessage}
                    rows={3}
                    placeholder="Pesan sambutan untuk pengguna baru"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="error-message">Error Message</Label>
                  <Textarea 
                    id="error-message" 
                    defaultValue={botPersonalities[0].errorMessage}
                    rows={3}
                    placeholder="Pesan ketika bot tidak memahami input pengguna"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
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
                  <div className="space-y-3">
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
          <TabsContent value="integrations" className="space-y-6 focus:outline-none data-[state=inactive]:hidden">
            <IntegrationsTab
              integrationsState={integrationsState}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleConfigureIntegration={handleConfigureIntegration}
              handleToggleIntegrationStatus={handleToggleIntegrationStatus}
            />
          </TabsContent>

          {/* Team Management Tab */}
          <TabsContent value="team-management" className="space-y-6 focus:outline-none data-[state=inactive]:hidden">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Management
                </CardTitle>
                <CardDescription>Kelola users dan agents dalam organisasi</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={teamTab} onValueChange={setTeamTab}>
                  <TabsList>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="agents">Agents</TabsTrigger>
                  </TabsList>

                  <TabsContent value="users" className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Seen</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={user.avatar} />
                                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{user.role}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  user.status === 'online' ? 'bg-green-500' : 
                                  user.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                                }`}></div>
                                <span className="capitalize">{user.status}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{user.lastSeen}</TableCell>
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

                  <TabsContent value="agents" className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Agent</TableHead>
                          <TableHead>Specialization</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Active Sessions</TableHead>
                          <TableHead>Avg Response</TableHead>
                          <TableHead>Bot Personality</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {agents.map((agent) => (
                          <TableRow key={agent.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${
                                  agent.status === 'online' ? 'bg-green-500' : 
                                  agent.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                                }`}></div>
                                <div>
                                  <p className="font-medium">{agent.name}</p>
                                  <p className="text-sm text-muted-foreground">{agent.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{agent.specialization}</TableCell>
                            <TableCell>
                              <Badge variant={
                                agent.status === 'online' ? 'default' : 
                                agent.status === 'busy' ? 'secondary' : 'outline'
                              }>
                                {agent.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{agent.activeSessions}</TableCell>
                            <TableCell>{agent.avgResponseTime}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setEditingAgent(agent)}
                              >
                                {agent.personalityName}
                              </Button>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4" />
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

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6 focus:outline-none data-[state=inactive]:hidden">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Subscription Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Billing content here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Developer Tab */}
          <TabsContent value="developer" className="space-y-6 focus:outline-none data-[state=inactive]:hidden">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API Keys
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Developer content here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6 focus:outline-none data-[state=inactive]:hidden">
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
      </div>
    </div>
  );
};

export default Settings;