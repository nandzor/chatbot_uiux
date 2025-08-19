import React from 'react';
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
  TableRow
} from '@/components/ui';
import { 
  Key,
  Webhook,
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye
} from 'lucide-react';

const DeveloperTab = () => {
  // Sample data untuk API Keys
  const apiKeys = [
    { id: 1, name: 'Production API', prefix: 'pk_live_', created: '15 Mar 2024', lastUsed: '2 jam lalu', status: 'Aktif' },
    { id: 2, name: 'Development API', prefix: 'pk_test_', created: '10 Mar 2024', lastUsed: '1 hari lalu', status: 'Aktif' },
    { id: 3, name: 'Staging API', prefix: 'pk_test_', created: '5 Mar 2024', lastUsed: '3 hari lalu', status: 'Nonaktif' },
  ];

  // Sample data untuk Webhooks
  const webhooks = [
    { 
      id: 1, 
      name: 'Order Notifications', 
      url: 'https://api.company.com/webhook/orders', 
      events: ['message.received', 'conversation.ended'], 
      status: 'Aktif' 
    },
    { 
      id: 2, 
      name: 'Customer Updates', 
      url: 'https://crm.company.com/webhook', 
      events: ['customer.updated'], 
      status: 'Nonaktif' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* API Keys Section */}
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
                      <Button variant="outline" size="sm" title="Copy API Key">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" title="View Details">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" title="Delete API Key">
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

      {/* Webhooks Section */}
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
                      <Button variant="outline" size="sm" title="Edit Webhook">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" title="Delete Webhook">
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
    </div>
  );
};

export default DeveloperTab;
