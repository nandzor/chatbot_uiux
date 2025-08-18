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
  XCircle
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('channels');
  const [showApiKey, setShowApiKey] = useState(false);
  const [teamTab, setTeamTab] = useState('users');

  // Sample data
  const channels = [
    { id: 1, name: 'Website Chat', type: 'Web Widget', status: 'Aktif', lastUsed: '2 menit lalu' },
    { id: 2, name: 'WhatsApp Business', type: 'WhatsApp', status: 'Aktif', lastUsed: '5 menit lalu' },
    { id: 3, name: 'Facebook Messenger', type: 'Facebook', status: 'Nonaktif', lastUsed: '2 jam lalu' },
  ];

  const botPersonalities = [
    { id: 1, name: 'Ramah & Profesional', language: 'Indonesia', tone: 'Formal', greetingMessage: 'Halo! Selamat datang, bagaimana saya bisa membantu Anda?', errorMessage: 'Maaf, saya tidak mengerti. Bisakah Anda mengulangi dengan kata lain?' },
    { id: 2, name: 'Casual & Bersahabat', language: 'Indonesia', tone: 'Informal', greetingMessage: 'Hai! Ada yang bisa saya bantu?', errorMessage: 'Ups, saya belum paham. Coba tanya dengan cara lain ya!' },
    { id: 3, name: 'Professional English', language: 'English', tone: 'Professional', greetingMessage: 'Hello! How may I assist you today?', errorMessage: 'I apologize, but I didn\'t understand. Could you please rephrase?' },
  ];

  const users = [
    { id: 1, name: 'Ahmad Rahman', email: 'ahmad.rahman@company.com', role: 'org_admin', avatar: 'AR', status: 'Aktif', lastLogin: '2 jam lalu' },
    { id: 2, name: 'Sari Dewi', email: 'sari.dewi@company.com', role: 'agent', avatar: 'SD', status: 'Aktif', lastLogin: '30 menit lalu' },
    { id: 3, name: 'Budi Santoso', email: 'budi.santoso@company.com', role: 'viewer', avatar: 'BS', status: 'Nonaktif', lastLogin: '1 hari lalu' },
  ];

  const agents = [
    { id: 1, name: 'Sari Dewi', specialization: 'Customer Support', maxConcurrentChats: 5, currentChats: 3, totalChats: 245, avgResponseTime: '2 menit' },
    { id: 2, name: 'Riko Pratama', specialization: 'Technical Support', maxConcurrentChats: 3, currentChats: 2, totalChats: 189, avgResponseTime: '3 menit' },
  ];

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
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="bot-personalities">Bot Personalities</TabsTrigger>
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
                        <TableHead>Specialization</TableHead>
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
                          <TableCell className="font-medium">{agent.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{agent.specialization}</Badge>
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
                              <Button variant="outline" size="sm">
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
    </div>
  );
};

export default Settings;
