import React from 'react';
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
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui';
import { MessageSquare, Plus, Key, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

const ChannelsTab = ({ channels, showApiKey, setShowApiKey }) => {
  return (
    <div className="space-y-6">
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
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Nama Channel</TableHead>
                  <TableHead className="min-w-[120px]">Tipe</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[150px]">Terakhir Digunakan</TableHead>
                  <TableHead className="min-w-[100px]">Aksi</TableHead>
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
          </div>
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
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="whatsapp-token">WhatsApp Business Token</Label>
              <div className="flex gap-2">
                <Input 
                  id="whatsapp-token" 
                  type={showApiKey ? "text" : "password"}
                  defaultValue="EAABwzLixnjYBOZB..." 
                  className="flex-1"
                />
                <Button variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="facebook-app-secret">Facebook App Secret</Label>
              <div className="flex gap-2">
                <Input 
                  id="facebook-app-secret" 
                  type="password"
                  defaultValue="**********************" 
                  className="flex-1"
                />
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input 
              id="webhook-url" 
              defaultValue="https://your-domain.com/api/webhook"
              placeholder="https://your-domain.com/webhook" 
            />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label>Enable Webhook Verification</Label>
              <p className="text-sm text-muted-foreground">Verifikasi webhook untuk keamanan tambahan</p>
            </div>
            <Switch defaultChecked className="mt-1" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelsTab;
