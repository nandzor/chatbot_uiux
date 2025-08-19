import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Button,
  Badge,
  Alert,
  AlertDescription,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui';
import { 
  Shield,
  AlertTriangle
} from 'lucide-react';

const SecurityTab = () => {
  // Sample data untuk Audit Logs
  const auditLogs = [
    { id: 1, timestamp: '2024-03-20 14:30:25', user: 'Ahmad Rahman', action: 'API Key Created', resource: 'Production API', ip: '192.168.1.100' },
    { id: 2, timestamp: '2024-03-20 13:45:12', user: 'Sari Dewi', action: 'User Role Updated', resource: 'Budi Santoso', ip: '192.168.1.101' },
    { id: 3, timestamp: '2024-03-20 12:15:45', user: 'Ahmad Rahman', action: 'Webhook Modified', resource: 'Order Notifications', ip: '192.168.1.100' },
    { id: 4, timestamp: '2024-03-20 11:30:18', user: 'System', action: 'Bot Personality Updated', resource: 'Ramah & Profesional', ip: 'System' },
    { id: 5, timestamp: '2024-03-20 10:22:33', user: 'Sari Dewi', action: 'Integration Configured', resource: 'WhatsApp Business', ip: '192.168.1.101' },
    { id: 6, timestamp: '2024-03-20 09:45:17', user: 'Ahmad Rahman', action: 'User Invited', resource: 'budi.santoso@company.com', ip: '192.168.1.100' },
    { id: 7, timestamp: '2024-03-20 08:30:45', user: 'System', action: 'Backup Completed', resource: 'Database Backup', ip: 'System' },
    { id: 8, timestamp: '2024-03-19 17:22:11', user: 'Rina Sari', action: 'Channel Activated', resource: 'Facebook Messenger', ip: '192.168.1.102' },
  ];

  // Statistics for security overview
  const securityStats = {
    totalLogs: 156,
    todayLogs: 8,
    activeUsers: 3,
    failedAttempts: 0
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{securityStats.totalLogs}</p>
                <p className="text-sm text-muted-foreground">Total Logs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{securityStats.todayLogs}</p>
                <p className="text-sm text-muted-foreground">Today's Activity</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{securityStats.activeUsers}</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{securityStats.failedAttempts}</p>
                <p className="text-sm text-muted-foreground">Failed Attempts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security & Audit Logs */}
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
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[180px]">Timestamp</TableHead>
                  <TableHead className="min-w-[120px]">User</TableHead>
                  <TableHead className="min-w-[150px]">Action</TableHead>
                  <TableHead className="min-w-[150px]">Resource</TableHead>
                  <TableHead className="min-w-[120px]">IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {log.user === 'System' && (
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        )}
                        <span className={log.user === 'System' ? 'text-blue-600 font-medium' : ''}>
                          {log.user}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          log.action.includes('Created') || log.action.includes('Activated') ? 'border-green-200 text-green-700' :
                          log.action.includes('Updated') || log.action.includes('Modified') ? 'border-blue-200 text-blue-700' :
                          log.action.includes('Deleted') || log.action.includes('Removed') ? 'border-red-200 text-red-700' :
                          'border-gray-200 text-gray-700'
                        }
                      >
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{log.resource}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{log.ip}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Menampilkan {auditLogs.length} dari {securityStats.totalLogs} total log entries
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Settings
          </CardTitle>
          <CardDescription>Konfigurasi keamanan untuk organisasi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Session Management</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Session Timeout</p>
                    <p className="text-sm text-muted-foreground">Automatically logout after inactivity</p>
                  </div>
                  <Badge>24 hours</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Extra security for admin accounts</p>
                  </div>
                  <Badge variant="secondary">Disabled</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Access Control</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">IP Whitelist</p>
                    <p className="text-sm text-muted-foreground">Restrict access to specific IPs</p>
                  </div>
                  <Badge variant="secondary">Not configured</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">API Rate Limiting</p>
                    <p className="text-sm text-muted-foreground">Limit API requests per minute</p>
                  </div>
                  <Badge>1000/min</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button>
              Configure Security Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTab;
