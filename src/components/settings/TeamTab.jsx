import React, { useState } from 'react';
import UserAvatar from '../common/UserAvatar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Button,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Label
} from '../ui';
import { 
  Users,
  Plus,
  Edit,
  Trash2,
  Bot,
  Save
} from 'lucide-react';

const TeamTab = ({ 
  editingAgent, 
  setEditingAgent, 
  updateAgentPersonality 
}) => {
  const [teamTab, setTeamTab] = useState('users');

  // Sample data untuk Users
  const users = [
    { id: 1, name: 'Ahmad Rahman', email: 'ahmad.rahman@company.com', role: 'Admin', status: 'online', lastSeen: 'Sekarang' },
    { id: 2, name: 'Sari Dewi', email: 'sari.dewi@company.com', role: 'Agent', status: 'busy', lastSeen: '5 menit lalu' },
    { id: 3, name: 'Budi Santoso', email: 'budi.santoso@company.com', role: 'Agent', status: 'offline', lastSeen: '2 jam lalu' },
  ];

  // Sample data untuk Agents
  const agents = [
    { id: 1, name: 'Sari Dewi', email: 'sari@company.com', specialization: 'Customer Support', status: 'online', activeSessions: 3, totalSessions: 127, avgResponseTime: '2m 30s', personalityName: 'Ramah & Profesional', botPersonalityId: 1 },
    { id: 2, name: 'Budi Santoso', email: 'budi@company.com', specialization: 'Technical Support', status: 'busy', activeSessions: 1, totalSessions: 89, avgResponseTime: '4m 15s', personalityName: 'Casual & Friendly', botPersonalityId: 2 },
    { id: 3, name: 'Rina Sari', email: 'rina@company.com', specialization: 'Sales', status: 'offline', activeSessions: 0, totalSessions: 156, avgResponseTime: '1m 45s', personalityName: 'Ramah & Profesional', botPersonalityId: 1 },
  ];

  // Sample data untuk Bot Personalities (untuk modal)
  const botPersonalities = [
    { 
      id: 1, 
      name: 'Ramah & Profesional', 
      language: 'ID', 
      tone: 'Formal', 
      greetingMessage: 'Halo! Selamat datang di layanan kami. Ada yang bisa saya bantu?', 
      errorMessage: 'Maaf, saya tidak memahami permintaan Anda. Bisakah Anda menjelaskan lebih detail?' 
    },
    { 
      id: 2, 
      name: 'Casual & Friendly', 
      language: 'ID', 
      tone: 'Informal', 
      greetingMessage: 'Hai! Gimana kabarnya? Ada yang bisa dibantu?', 
      errorMessage: 'Waduh, saya kurang paham nih. Coba dijelasin lagi dong!' 
    },
  ];

  return (
    <div className="space-y-6">
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
                    <TableHead>Last Seen</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <UserAvatar user={user} size="default" showOnlineStatus={true} status={user.status} />
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
                          <Button variant="outline" size="sm" title="Edit User">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" title="Delete User">
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
                          onClick={() => setEditingAgent && setEditingAgent(agent)}
                        >
                          {agent.personalityName}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" title="Edit Agent">
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
                      onClick={() => setEditingAgent && setEditingAgent({...editingAgent, botPersonalityId: personality.id})}
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
                  onClick={() => setEditingAgent && setEditingAgent(null)}
                >
                  Batal
                </Button>
                <Button 
                  onClick={() => {
                    if (updateAgentPersonality && editingAgent) {
                      updateAgentPersonality(editingAgent.id, editingAgent.botPersonalityId);
                    }
                  }}
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
  );
};

export default TeamTab;
