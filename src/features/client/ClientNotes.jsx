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
  Label
} from '@/components/ui';
import { 
  Plus, 
  FileText, 
  MessageSquare, 
  Phone,
  Video,
  Mail,
  Calendar,
  User,
  Edit,
  Trash2,
  Search
} from 'lucide-react';

const ClientNotes = ({ clientData }) => {
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Sample notes data
  const [notes] = React.useState([
    {
      id: 1,
      type: 'call',
      title: 'Weekly Check-in Call',
      content: 'Discussed platform usage and upcoming feature requests. Client is very satisfied with current performance and looking forward to new AI chatbot features.',
      author: 'Sarah Johnson',
      date: '2024-03-20 14:30',
      tags: ['check-in', 'satisfaction', 'feature-request'],
      followUp: 'Schedule demo for AI chatbot v2.0'
    },
    {
      id: 2,
      type: 'email',
      title: 'Support Ticket Resolution',
      content: 'Resolved SSO integration issue. Client was experiencing login problems with their Azure AD. Provided step-by-step configuration guide.',
      author: 'Mike Chen',
      date: '2024-03-19 16:45',
      tags: ['support', 'sso', 'resolved'],
      followUp: 'Follow up in 1 week to ensure no further issues'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Quarterly Business Review',
      content: 'Q1 performance review meeting. Client achieved 95% of their usage goals. Discussed expansion opportunities and potential upsell.',
      author: 'Sarah Johnson',
      date: '2024-03-18 10:00',
      tags: ['qbr', 'performance', 'upsell'],
      followUp: 'Prepare proposal for additional user licenses'
    },
    {
      id: 4,
      type: 'call',
      title: 'Technical Implementation Support',
      content: 'Helped client set up webhook integrations for their CRM system. Provided API documentation and sample code.',
      author: 'David Kim',
      date: '2024-03-17 11:20',
      tags: ['technical', 'integration', 'api'],
      followUp: 'Send follow-up email with additional resources'
    }
  ]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'meeting': return <Video className="w-4 h-4" />;
      case 'note': return <FileText className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'call': return 'bg-green-100 text-green-600';
      case 'email': return 'bg-blue-100 text-blue-600';
      case 'meeting': return 'bg-purple-100 text-purple-600';
      case 'note': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || note.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notes & Communication Log</h2>
          <p className="text-gray-600">Track all interactions and notes for {clientData.name}</p>
        </div>
        <Dialog open={isAddNoteOpen} onOpenChange={setIsAddNoteOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Note</DialogTitle>
              <DialogDescription>
                Record a new interaction or note for {clientData.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="noteTitle">Title</Label>
                <Input id="noteTitle" placeholder="Enter note title" />
              </div>
              <div>
                <Label htmlFor="noteType">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="call">Phone Call</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="note">General Note</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="noteContent">Content</Label>
                <Textarea id="noteContent" placeholder="Enter note content" rows={6} />
              </div>
              <div>
                <Label htmlFor="noteTags">Tags (comma separated)</Label>
                <Input id="noteTags" placeholder="e.g., support, follow-up, important" />
              </div>
              <div>
                <Label htmlFor="noteFollowUp">Follow-up Action</Label>
                <Input id="noteFollowUp" placeholder="What needs to be done next?" />
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Save Note</Button>
                <Button variant="outline" onClick={() => setIsAddNoteOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="call">Phone Calls</SelectItem>
                  <SelectItem value="email">Emails</SelectItem>
                  <SelectItem value="meeting">Meetings</SelectItem>
                  <SelectItem value="note">General Notes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${getTypeColor(note.type)}`}>
                    {getTypeIcon(note.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg">{note.title}</h3>
                      <Badge variant="outline" className="capitalize">{note.type}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {note.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {note.date}
                      </div>
                    </div>
                    <div className="text-gray-700 mb-4 leading-relaxed">
                      {note.content}
                    </div>
                    {note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {note.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {note.followUp && (
                      <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                        <div className="text-sm font-medium text-blue-800 mb-1">Follow-up Required:</div>
                        <div className="text-sm text-blue-700">{note.followUp}</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Communication Summary</CardTitle>
          <CardDescription>Overview of recent interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{notes.length}</div>
              <p className="text-sm text-muted-foreground">Total Notes</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {notes.filter(n => n.type === 'call').length}
              </div>
              <p className="text-sm text-muted-foreground">Phone Calls</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {notes.filter(n => n.type === 'meeting').length}
              </div>
              <p className="text-sm text-muted-foreground">Meetings</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {notes.filter(n => n.type === 'email').length}
              </div>
              <p className="text-sm text-muted-foreground">Emails</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientNotes;
