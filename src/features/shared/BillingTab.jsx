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
  CreditCard,
  RefreshCw, 
  Download,
  Zap,
  Activity,
  Users,
  CheckCircle,
  FileText
} from 'lucide-react';

const BillingTab = () => {
  // Sample data untuk Billing
  const subscriptionData = {
    plan: 'Pro Plan',
    price: '$49/bulan',
    validUntil: '20 April 2024',
    status: 'Aktif'
  };

  const usageData = {
    currentMessages: 1245,
    limitMessages: 2000,
    percentage: 62,
    activeUsers: 8,
    totalSeats: 10,
    userPercentage: 80
  };

  const paymentTransactions = [
    { id: 1, date: '20 Mar 2024', description: 'Pro Plan - Subscription', amount: '$49.00', status: 'Paid' },
    { id: 2, date: '20 Feb 2024', description: 'Pro Plan - Subscription', amount: '$49.00', status: 'Paid' },
    { id: 3, date: '20 Jan 2024', description: 'Pro Plan - Subscription', amount: '$49.00', status: 'Paid' },
  ];

  return (
    <div className="space-y-6">
      {/* Subscription Details */}
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
            {/* Plan Info */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <h4 className="font-semibold">{subscriptionData.plan}</h4>
              </div>
              <p className="text-2xl font-bold">{subscriptionData.price}</p>
              <p className="text-sm text-muted-foreground">Berlaku hingga {subscriptionData.validUntil}</p>
              <Badge className="mt-2">{subscriptionData.status}</Badge>
            </div>
            
            {/* Usage Data */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-blue-500" />
                <h4 className="font-semibold">Usage Data</h4>
              </div>
              <p className="text-2xl font-bold">{usageData.currentMessages.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Pesan bulan ini</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{width: `${usageData.percentage}%`}}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {usageData.percentage}% dari {usageData.limitMessages.toLocaleString()} limit
              </p>
            </div>
            
            {/* Active Users */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-green-500" />
                <h4 className="font-semibold">Active Users</h4>
              </div>
              <p className="text-2xl font-bold">{usageData.activeUsers}</p>
              <p className="text-sm text-muted-foreground">dari {usageData.totalSeats} seat</p>
              <Badge variant="secondary" className="mt-2">{usageData.userPercentage}% Used</Badge>
            </div>
          </div>
          
          {/* Action Buttons */}
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

      {/* Payment Transactions */}
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
              {paymentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <Badge variant="default">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
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

export default BillingTab;
