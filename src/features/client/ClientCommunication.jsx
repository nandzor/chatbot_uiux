import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Badge,
  Button,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui';
import { 
  Plus, 
  Send, 
  Mail, 
  Phone, 
  MessageSquare,
  Calendar,
  Clock,
  User,
  FileText,
  Video
} from 'lucide-react';

const ClientCommunication = ({ clientData }) => {
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);

  // Sample communication data
  const [communicationData] = useState({
    recentCommunications: [
      {
        id: 1,
        type: 'email',
        subject: 'Weekly Check-in: Platform Usage Review',
        from: 'Sarah Johnson (CSM)',
        to: 'John Doe (Admin)',
        date: '2024-03-20 10:30',
        status: 'sent',
        preview: 'Hi John, I wanted to follow up on our last conversation about increasing your team\'s adoption...'
      },
      {
        id: 2,
        type: 'call',
        subject: 'Technical Setup Call',
        from: 'Mike Chen (Support)',
        to: 'Jane Smith (IT Manager)',
        date: '2024-03-18 14:00',
        duration: '45 minutes',
        status: 'completed',
        notes: 'Discussed SSO integration and API configuration. Follow-up required for testing phase.'
      },
      {
        id: 3,
        type: 'meeting',
        subject: 'Quarterly Business Review',
        from: 'Sarah Johnson (CSM)',
        to: 'ABC Corporation Team',
        date: '2024-03-15 09:00',
        duration: '60 minutes',
        status: 'completed',
        notes: 'Reviewed Q1 performance, discussed expansion opportunities, scheduled next QBR for June.'
      },
      {
        id: 4,
        type: 'email',
        subject: 'Feature Update: AI Chatbot v2.0',
        from: 'Product Team',
        to: 'All Users',
        date: '2024-03-12 16:00',
        status: 'delivered',
        preview: 'We\'re excited to announce the latest updates to our AI chatbot capabilities...'
      }
    ],
    upcomingCommunications: [
      {
        id: 1,
        type: 'call',
        subject: 'Monthly Success Review',
        scheduled: '2024-03-25 10:00',
        attendees: ['Sarah Johnson', 'John Doe'],
        status: 'scheduled'
      },
      {
        id: 2,
        type: 'email',
        subject: 'Invoice Reminder',
        scheduled: '2024-03-30 09:00',
        status: 'scheduled'
      }
    ]
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'call': return <Phone className="w-4 h-4" />;
      case 'meeting': return <Video className="w-4 h-4" />;
      case 'message': return <MessageSquare className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-600';
      case 'call': return 'bg-green-100 text-green-600';
      case 'meeting': return 'bg-purple-100 text-purple-600';
      case 'message': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Communication Center</h2>
          <p className="text-gray-600">All communication history with {clientData.name}</p>
        </div>
        <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Communication
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>New Communication</DialogTitle>
              <DialogDescription>
                Send a message or schedule a communication with {clientData.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="commType">Communication Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="call">Phone Call</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="message">Internal Message</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter subject" />
              </div>
              <div>
                <Label htmlFor="recipient">Recipient</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">John Doe (Admin)</SelectItem>
                    <SelectItem value="it">Jane Smith (IT Manager)</SelectItem>
                    <SelectItem value="team">All Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your message" rows={6} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="schedule">Schedule (Optional)</Label>
                  <Input id="schedule" type="datetime-local" />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send Now
                </Button>
                <Button variant="outline" onClick={() => setIsNewMessageOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Communication Tabs */}
      <Tabs defaultValue="history" className="w-full">
        <TabsList>
          <TabsTrigger value="history">Communication History</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Communications</TabsTrigger>
          <TabsTrigger value="templates">Message Templates</TabsTrigger>
        </TabsList>

        {/* Communication History */}
        <TabsContent value="history" className="space-y-4">
          {communicationData.recentCommunications.map((comm) => (
            <Card key={comm.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-2 rounded-full ${getTypeColor(comm.type)}`}>
                      {getTypeIcon(comm.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{comm.subject}</h3>
                        <Badge className={getStatusColor(comm.status)}>
                          {comm.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">From:</span> {comm.from} → 
                        <span className="font-medium"> To:</span> {comm.to}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {comm.date}
                        </div>
                        {comm.duration && (
                          <div>Duration: {comm.duration}</div>
                        )}
                      </div>
                      {comm.preview && (
                        <p className="text-sm text-gray-700 mb-3 italic">
                          "{comm.preview}"
                        </p>
                      )}
                      {comm.notes && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 mb-1">Notes:</div>
                          <p className="text-sm text-gray-600">{comm.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Upcoming Communications */}
        <TabsContent value="upcoming" className="space-y-4">
          {communicationData.upcomingCommunications.map((comm) => (
            <Card key={comm.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${getTypeColor(comm.type)}`}>
                      {getTypeIcon(comm.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{comm.subject}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {comm.scheduled}
                        </div>
                        {comm.attendees && (
                          <div>Attendees: {comm.attendees.join(', ')}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Message Templates */}
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Templates</CardTitle>
              <CardDescription>Pre-written message templates for common communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 flex-col">
                  <Mail className="w-6 h-6 mb-2" />
                  <span className="font-medium">Weekly Check-in</span>
                  <span className="text-xs text-gray-500">Weekly status update template</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col">
                  <Phone className="w-6 h-6 mb-2" />
                  <span className="font-medium">Support Follow-up</span>
                  <span className="text-xs text-gray-500">Post-support call template</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col">
                  <Video className="w-6 h-6 mb-2" />
                  <span className="font-medium">QBR Preparation</span>
                  <span className="text-xs text-gray-500">Quarterly review template</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col">
                  <MessageSquare className="w-6 h-6 mb-2" />
                  <span className="font-medium">Feature Announcement</span>
                  <span className="text-xs text-gray-500">New feature notification</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientCommunication;
