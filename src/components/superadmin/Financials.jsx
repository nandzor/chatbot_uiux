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
} from '../ui';
import { 
  CreditCard,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  TrendingUp,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

const Financials = () => {
  const [activeTab, setActiveTab] = useState('plans');
  const [editingPlan, setEditingPlan] = useState(null);
  const [showCreatePlan, setShowCreatePlan] = useState(false);

  // Sample subscription plans data
  const [subscriptionPlans] = useState([
    {
      id: 'basic',
      name: 'Basic',
      tier: 'basic',
      priceMonthly: 49,
      maxAgents: 5,
      maxMessagesPerMonth: 1000,
      features: ['Live Chat', 'Basic Analytics', 'Email Support'],
      activeSubscriptions: 45,
      totalRevenue: 2205
    },
    {
      id: 'pro',
      name: 'Professional',
      tier: 'professional',
      priceMonthly: 149,
      maxAgents: 15,
      maxMessagesPerMonth: 5000,
      features: ['Live Chat', 'Advanced Analytics', 'API Access', 'Priority Support', 'Custom Integrations'],
      activeSubscriptions: 89,
      totalRevenue: 13261
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tier: 'enterprise',
      priceMonthly: 299,
      maxAgents: 50,
      maxMessagesPerMonth: 20000,
      features: ['All Pro Features', 'White Label', 'Custom Workflows', 'Dedicated Support', 'SLA Guarantee'],
      activeSubscriptions: 23,
      totalRevenue: 6877
    }
  ]);

  // Sample transactions data
  const [transactions] = useState([
    {
      id: 'txn-001',
      date: '2024-03-20',
      organization: 'ABC Corporation',
      orgCode: 'ABC-001',
      description: 'Enterprise Plan - March 2024',
      amount: 299.00,
      status: 'success',
      paymentMethod: 'Credit Card',
      transactionId: 'ch_1234567890'
    },
    {
      id: 'txn-002',
      date: '2024-03-20',
      organization: 'TechStart Inc',
      orgCode: 'TSI-002',
      description: 'Professional Plan - March 2024',
      amount: 149.00,
      status: 'success',
      paymentMethod: 'Bank Transfer',
      transactionId: 'tr_0987654321'
    },
    {
      id: 'txn-003',
      date: '2024-03-19',
      organization: 'Digital Agency Pro',
      orgCode: 'DAP-004',
      description: 'Professional Plan - March 2024',
      amount: 149.00,
      status: 'failed',
      paymentMethod: 'Credit Card',
      transactionId: 'ch_1122334455'
    },
    {
      id: 'txn-004',
      date: '2024-03-18',
      organization: 'StartupXYZ',
      orgCode: 'SXZ-005',
      description: 'Basic Plan - March 2024',
      amount: 49.00,
      status: 'refunded',
      paymentMethod: 'Credit Card',
      transactionId: 'ch_5566778899'
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const variants = {
      'success': 'default',
      'failed': 'destructive',
      'refunded': 'secondary',
      'pending': 'outline'
    };
    
    const labels = {
      'success': 'Success',
      'failed': 'Failed',
      'refunded': 'Refunded',
      'pending': 'Pending'
    };

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const handleTransactionAction = (action, transactionId) => {
    console.log(`${action} for transaction ${transactionId}`);
    // Implement transaction action logic here
  };

  const PlanForm = ({ plan, onSave, onCancel }) => {
    const [formData, setFormData] = useState(plan || {
      name: '',
      tier: 'basic',
      priceMonthly: 0,
      maxAgents: 1,
      maxMessagesPerMonth: 100,
      features: []
    });

    const [featureInput, setFeatureInput] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    const addFeature = () => {
      if (featureInput.trim()) {
        setFormData(prev => ({
          ...prev,
          features: [...prev.features, featureInput.trim()]
        }));
        setFeatureInput('');
      }
    };

    const removeFeature = (index) => {
      setFormData(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }));
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>{plan ? 'Edit Plan' : 'Create New Plan'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Plan Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tier">Tier</Label>
                <Select value={formData.tier} onValueChange={(value) => setFormData(prev => ({ ...prev, tier: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Monthly Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.priceMonthly}
                  onChange={(e) => setFormData(prev => ({ ...prev, priceMonthly: parseInt(e.target.value) || 0 }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agents">Max Agents</Label>
                <Input
                  id="agents"
                  type="number"
                  value={formData.maxAgents}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxAgents: parseInt(e.target.value) || 1 }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="messages">Max Messages/Month</Label>
                <Input
                  id="messages"
                  type="number"
                  value={formData.maxMessagesPerMonth}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxMessagesPerMonth: parseInt(e.target.value) || 100 }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Features</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add feature"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <Button type="button" onClick={addFeature}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeFeature(index)}>
                    {feature} ×
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit">Save Plan</Button>
              <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Financials</h1>
        <p className="text-muted-foreground">Manage subscription plans and view transaction history</p>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(22343)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">157</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8</span> subscription baru
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Revenue Per User</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(142)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">2</span> perlu tindak lanjut
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        {/* Subscription Plans Tab */}
        <TabsContent value="plans" className="space-y-6">
          {showCreatePlan || editingPlan ? (
            <PlanForm
              plan={editingPlan}
              onSave={(planData) => {
                console.log('Saving plan:', planData);
                setEditingPlan(null);
                setShowCreatePlan(false);
              }}
              onCancel={() => {
                setEditingPlan(null);
                setShowCreatePlan(false);
              }}
            />
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Subscription Plans</h2>
                <Button onClick={() => setShowCreatePlan(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Plan
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan) => (
                  <Card key={plan.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription className="capitalize">{plan.tier} tier</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setEditingPlan(plan)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Plan
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Plan
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-3xl font-bold">{formatCurrency(plan.priceMonthly)}<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Max Agents</span>
                          <span>{plan.maxAgents}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Messages/Month</span>
                          <span>{plan.maxMessagesPerMonth.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {plan.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {plan.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{plan.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 border-t space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Active Subscriptions</span>
                          <span className="font-medium">{plan.activeSubscriptions}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Monthly Revenue</span>
                          <span className="font-medium">{formatCurrency(plan.totalRevenue)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Transaction History</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{transaction.organization}</div>
                          <div className="text-sm text-muted-foreground">{transaction.orgCode}</div>
                        </div>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(transaction.amount)}</TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      <TableCell>{transaction.paymentMethod}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleTransactionAction('view', transaction.id)}>
                              View Details
                            </DropdownMenuItem>
                            {transaction.status === 'success' && (
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleTransactionAction('refund', transaction.id)}
                              >
                                Process Refund
                              </DropdownMenuItem>
                            )}
                            {transaction.status === 'failed' && (
                              <DropdownMenuItem onClick={() => handleTransactionAction('retry', transaction.id)}>
                                Retry Payment
                              </DropdownMenuItem>
                            )}
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
      </Tabs>
    </div>
  );
};

export default Financials;
