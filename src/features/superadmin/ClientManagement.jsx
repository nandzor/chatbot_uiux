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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui';
import { 
  Building2,
  Search,
  Filter,
  Eye,
  MoreHorizontal,
  UserCheck,
  Ban,
  KeyRound,
  LogIn,
  Plus,
  Users,
  CreditCard,
  Activity,
  Calendar
} from 'lucide-react';

const ClientManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrg, setSelectedOrg] = useState(null);

  // Sample organizations data
  const [organizations] = useState([
    {
      id: 'org-001',
      name: 'ABC Corporation',
      orgCode: 'ABC-001',
      email: 'admin@abccorp.com',
      status: 'active',
      planId: 'enterprise',
      planName: 'Enterprise',
      createdAt: '2024-01-15',
      userCount: 25,
      agentCount: 8,
      messagesThisMonth: 4520,
      lastLogin: '2024-03-19 14:30:25'
    },
    {
      id: 'org-002',
      name: 'TechStart Inc',
      orgCode: 'TSI-002',
      email: 'contact@techstart.com',
      status: 'trial',
      planId: 'pro',
      planName: 'Pro Trial',
      createdAt: '2024-03-10',
      userCount: 5,
      agentCount: 2,
      messagesThisMonth: 850,
      lastLogin: '2024-03-20 09:15:42'
    },
    {
      id: 'org-003',
      name: 'Global Solutions Ltd',
      orgCode: 'GSL-003',
      email: 'admin@globalsolutions.com',
      status: 'suspended',
      planId: 'basic',
      planName: 'Basic',
      createdAt: '2023-11-20',
      userCount: 12,
      agentCount: 4,
      messagesThisMonth: 0,
      lastLogin: '2024-02-28 16:45:12'
    },
    {
      id: 'org-004',
      name: 'Digital Agency Pro',
      orgCode: 'DAP-004',
      email: 'hello@digitalagency.com',
      status: 'active',
      planId: 'pro',
      planName: 'Professional',
      createdAt: '2024-02-05',
      userCount: 15,
      agentCount: 6,
      messagesThisMonth: 2890,
      lastLogin: '2024-03-20 11:22:18'
    }
  ]);

  // Sample organization detail data
  const [orgDetails] = useState({
    'org-001': {
      overview: {
        subscription: {
          plan: 'Enterprise',
          status: 'Active',
          nextBilling: '2024-04-15',
          amount: '$299/month'
        },
        usage: {
          users: { current: 25, limit: 50 },
          agents: { current: 8, limit: 20 },
          messages: { current: 4520, limit: 10000 }
        }
      },
      users: [
        { id: 1, name: 'Ahmad Rahman', email: 'ahmad.rahman@abccorp.com', role: 'org_admin', lastLogin: '2024-03-20 10:30:00' },
        { id: 2, name: 'Sari Dewi', email: 'sari.dewi@abccorp.com', role: 'agent', lastLogin: '2024-03-20 14:15:00' },
        { id: 3, name: 'Budi Santoso', email: 'budi.santoso@abccorp.com', role: 'agent', lastLogin: '2024-03-19 16:45:00' }
      ],
      billing: [
        { id: 1, date: '2024-03-15', amount: '$299.00', status: 'paid', description: 'Enterprise Plan - March' },
        { id: 2, date: '2024-02-15', amount: '$299.00', status: 'paid', description: 'Enterprise Plan - February' },
        { id: 3, date: '2024-01-15', amount: '$299.00', status: 'paid', description: 'Enterprise Plan - January' }
      ],
      workflows: [
        { id: 1, name: 'Customer Onboarding', status: 'active', executions: 245, lastRun: '2024-03-20 13:45:00' },
        { id: 2, name: 'Lead Qualification', status: 'active', executions: 189, lastRun: '2024-03-20 12:30:00' },
        { id: 3, name: 'Support Escalation', status: 'paused', executions: 67, lastRun: '2024-03-18 09:15:00' }
      ]
    }
  });

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.orgCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || org.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const variants = {
      'active': 'default',
      'trial': 'secondary',
      'suspended': 'destructive'
    };
    
    const labels = {
      'active': 'Active',
      'trial': 'Trial',
      'suspended': 'Suspended'
    };

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const handleViewDetails = (org) => {
    setSelectedOrg(org);
  };

  const handleOrgAction = (action, orgId) => {
    console.log(`${action} for organization ${orgId}`);
    // Implement action logic here
  };

  if (selectedOrg) {
    const details = orgDetails[selectedOrg.id];
    
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedOrg(null)}
          >
            ← Back to Organizations
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{selectedOrg.name}</h1>
            <p className="text-muted-foreground">{selectedOrg.email}</p>
          </div>
          <div className="ml-auto flex gap-2">
            {getStatusBadge(selectedOrg.status)}
            <Badge variant="outline">{selectedOrg.planName}</Badge>
          </div>
        </div>

        {/* Organization Details Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="billing">Subscription & Billing</TabsTrigger>
            <TabsTrigger value="workflows">N8N Workflows</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Subscription Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-medium">{details?.overview.subscription.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge>{details?.overview.subscription.status}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Billing</span>
                    <span className="font-medium">{details?.overview.subscription.nextBilling}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">{details?.overview.subscription.amount}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Resource Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {details?.overview.usage && Object.entries(details.overview.usage).map(([key, usage]) => (
                    <div key={key}>
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground capitalize">{key}</span>
                        <span className="text-sm">{usage.current}/{usage.limit}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{width: `${(usage.current / usage.limit) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Organization Users</CardTitle>
                <CardDescription>Manage users within this organization</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Last Login</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {details?.users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>Payment transactions and subscription history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {details?.billing.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell className="font-medium">{transaction.amount}</TableCell>
                        <TableCell>
                          <Badge variant={transaction.status === 'paid' ? 'default' : 'secondary'}>
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workflows Tab */}
          <TabsContent value="workflows">
            <Card>
              <CardHeader>
                <CardTitle>N8N Workflows</CardTitle>
                <CardDescription>Read-only view of organization workflows for troubleshooting</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Workflow Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total Executions</TableHead>
                      <TableHead>Last Run</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {details?.workflows.map((workflow) => (
                      <TableRow key={workflow.id}>
                        <TableCell className="font-medium">{workflow.name}</TableCell>
                        <TableCell>
                          <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                            {workflow.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{workflow.executions}</TableCell>
                        <TableCell className="text-muted-foreground">{workflow.lastRun}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Client Management</h1>
          <p className="text-muted-foreground">Manage organizations and their subscriptions</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Organization
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search organizations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Organizations Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Messages</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrganizations.map((org) => (
                <TableRow key={org.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{org.name}</div>
                      <div className="text-sm text-muted-foreground">{org.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{org.orgCode}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{org.planName}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(org.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{org.userCount} users</div>
                      <div className="text-muted-foreground">{org.agentCount} agents</div>
                    </div>
                  </TableCell>
                  <TableCell>{org.messagesThisMonth.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">{org.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(org)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOrgAction('login', org.id)}>
                            <LogIn className="w-4 h-4 mr-2" />
                            Login as Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOrgAction('suspend', org.id)}>
                            <Ban className="w-4 h-4 mr-2" />
                            {org.status === 'suspended' ? 'Activate' : 'Suspend'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOrgAction('resetPassword', org.id)}>
                            <KeyRound className="w-4 h-4 mr-2" />
                            Force Password Reset
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

export default ClientManagement;
