import React, { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Badge,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Switch,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui';
import { 
  MessageSquare,
  Clock,
  User,
  Send,
  Paperclip,
  Search,
  Filter,
  MoreVertical,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Timer,
  Flag,
  Star,
  UserPlus,
  Phone,
  Mail,
  Calendar,
  Building,
  Tag,
  FileText,
  Zap,
  ThumbsUp,
  ThumbsDown,
  Eye,
  EyeOff,
  ArrowRightLeft,
  Archive,
  Ban,
  Plus,
  Edit,
  Trash2,
  Copy,
  BookOpen,
  Info,
  History,
  Users,
  MessageCircle,
  X
} from 'lucide-react';

const AgentInbox = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('my-queue');
  const [contextTab, setContextTab] = useState('customer-info');
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [isWrapUpDialogOpen, setIsWrapUpDialogOpen] = useState(false);
  const [internalNotes, setInternalNotes] = useState('');
  const [showInternalNotes, setShowInternalNotes] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock data untuk chat sessions
  const [chatSessions, setChatSessions] = useState([
    {
      id: 'session-001',
      customer: {
        id: 'cust-001',
        name: 'Ahmad Rahman',
        email: 'ahmad.rahman@abccorp.com',
        company: 'PT ABC Corporation',
        plan: 'Enterprise',
        avatar: null,
        phone: '+62812345678',
        lastActivity: '2024-01-25T15:30:00Z',
        joinDate: '2023-06-15',
        totalSessions: 12,
        avgRating: 4.5
      },
      status: 'active',
      priority: 'high',
      startTime: '2024-01-25T15:15:00Z',
      lastMessage: '2024-01-25T15:29:00Z',
      waitingTime: 2,
      slaStatus: 'warning',
      unreadCount: 2,
      category: 'technical',
      tags: ['api', 'integration'],
      messages: [
        {
          id: 'msg-001',
          type: 'customer',
          content: 'Halo, saya mengalami masalah dengan integrasi API. Status code 401 terus muncul.',
          timestamp: '2024-01-25T15:15:00Z',
          delivered: true,
          read: true
        },
        {
          id: 'msg-002',
          type: 'agent',
          content: 'Halo Ahmad! Saya akan membantu Anda dengan masalah API ini. Bisakah Anda share endpoint yang Anda gunakan?',
          timestamp: '2024-01-25T15:17:00Z',
          delivered: true,
          read: true
        },
        {
          id: 'msg-003',
          type: 'customer',
          content: 'Saya menggunakan POST /api/v1/users untuk membuat user baru. API key sudah benar.',
          timestamp: '2024-01-25T15:20:00Z',
          delivered: true,
          read: true
        },
        {
          id: 'msg-004',
          type: 'customer',
          content: 'Apakah ada perubahan pada authentikasi?',
          timestamp: '2024-01-25T15:29:00Z',
          delivered: true,
          read: false
        }
      ],
      internalNotes: 'Customer menggunakan old API key. Perlu update ke v2. Follow up untuk training tim development mereka.'
    },
    {
      id: 'session-002',
      customer: {
        id: 'cust-002',
        name: 'Sari Dewi',
        email: 'sari.dewi@techstart.id',
        company: 'CV TechStart Indonesia',
        plan: 'Professional',
        avatar: null,
        phone: '+62821234567',
        lastActivity: '2024-01-25T14:45:00Z',
        joinDate: '2023-09-20',
        totalSessions: 8,
        avgRating: 4.8
      },
      status: 'waiting',
      priority: 'medium',
      startTime: '2024-01-25T14:30:00Z',
      lastMessage: '2024-01-25T14:45:00Z',
      waitingTime: 45,
      slaStatus: 'danger',
      unreadCount: 1,
      category: 'billing',
      tags: ['payment', 'upgrade'],
      messages: [
        {
          id: 'msg-005',
          type: 'customer',
          content: 'Saya ingin upgrade ke plan Enterprise. Bagaimana prosesnya?',
          timestamp: '2024-01-25T14:30:00Z',
          delivered: true,
          read: true
        },
        {
          id: 'msg-006',
          type: 'customer',
          content: 'Apakah ada diskon untuk upgrade annual?',
          timestamp: '2024-01-25T14:45:00Z',
          delivered: true,
          read: false
        }
      ],
      internalNotes: 'High-value customer. Tanyakan ke sales team tentang diskon khusus. Potential upsell opportunity.'
    },
    {
      id: 'session-003',
      customer: {
        id: 'cust-003',
        name: 'Budi Santoso',
        email: 'budi@digitalsolutions.com',
        company: 'Digital Solutions Pro',
        plan: 'Basic',
        avatar: null,
        phone: '+62813456789',
        lastActivity: '2024-01-25T13:20:00Z',
        joinDate: '2024-01-10',
        totalSessions: 3,
        avgRating: 4.2
      },
      status: 'pending',
      priority: 'low',
      startTime: '2024-01-25T13:00:00Z',
      lastMessage: '2024-01-25T13:20:00Z',
      waitingTime: 125,
      slaStatus: 'safe',
      unreadCount: 0,
      category: 'general',
      tags: ['onboarding', 'training'],
      messages: [
        {
          id: 'msg-007',
          type: 'customer',
          content: 'Terima kasih atas bantuan setup awal. Semuanya sudah berjalan dengan baik.',
          timestamp: '2024-01-25T13:20:00Z',
          delivered: true,
          read: true
        }
      ],
      internalNotes: 'New customer. Perlu follow-up training untuk advanced features. Schedule demo session.'
    }
  ]);

  // Mock data untuk quick replies
  const [quickReplies, setQuickReplies] = useState([
    'Halo! Saya akan membantu Anda hari ini.',
    'Terima kasih telah menghubungi support. Saya sedang mengecek masalah Anda.',
    'Apakah masalah ini sudah teratasi?',
    'Saya akan eskalasi masalah ini ke tim teknis.',
    'Terima kasih atas kesabaran Anda.'
  ]);

  // Mock data untuk knowledge base
  const [knowledgeArticles, setKnowledgeArticles] = useState([
    {
      id: 'kb-001',
      title: 'API Authentication Setup',
      category: 'technical',
      relevance: 95,
      url: '/kb/api-auth'
    },
    {
      id: 'kb-002',
      title: 'Troubleshooting 401 Errors',
      category: 'technical',
      relevance: 90,
      url: '/kb/401-errors'
    },
    {
      id: 'kb-003',
      title: 'Upgrade Pricing Plans',
      category: 'billing',
      relevance: 85,
      url: '/kb/pricing'
    }
  ]);

  // Mock data untuk customer history
  const [customerHistory, setCustomerHistory] = useState([
    {
      id: 'hist-001',
      date: '2024-01-20',
      type: 'chat',
      summary: 'Setup initial configuration',
      rating: 5,
      agent: 'Agent Sarah'
    },
    {
      id: 'hist-002',
      date: '2024-01-15',
      type: 'email',
      summary: 'Welcome onboarding sequence',
      rating: null,
      agent: 'System'
    },
    {
      id: 'hist-003',
      date: '2024-01-10',
      type: 'phone',
      summary: 'Account activation assistance',
      rating: 4,
      agent: 'Agent Mike'
    }
  ]);

  const getSLAIndicator = (slaStatus, waitingTime) => {
    const colors = {
      safe: 'bg-green-500',
      warning: 'bg-yellow-500',
      danger: 'bg-red-500'
    };
    
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${colors[slaStatus]} ${slaStatus === 'danger' ? 'animate-pulse' : ''}`}></div>
        <span className={`text-xs ${
          slaStatus === 'danger' ? 'text-red-600' : 
          slaStatus === 'warning' ? 'text-yellow-600' : 'text-green-600'
        }`}>
          {waitingTime}m
        </span>
      </div>
    );
  };

  const getPriorityBadge = (priority) => {
    const config = {
      high: { color: 'red', label: 'High' },
      medium: { color: 'yellow', label: 'Medium' },
      low: { color: 'green', label: 'Low' }
    };
    const priorityConfig = config[priority] || config.medium;
    return <Badge variant={priorityConfig.color} className="text-xs">{priorityConfig.label}</Badge>;
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedSession) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      type: 'agent',
      content: messageText,
      timestamp: new Date().toISOString(),
      delivered: true,
      read: false
    };

    setChatSessions(sessions => 
      sessions.map(session => 
        session.id === selectedSession.id 
          ? { ...session, messages: [...session.messages, newMessage] }
          : session
      )
    );

    setMessageText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSessionSelect = (session) => {
    setSelectedSession(session);
    // Mark messages as read
    setChatSessions(sessions => 
      sessions.map(s => 
        s.id === session.id 
          ? { ...s, unreadCount: 0, messages: s.messages.map(msg => ({ ...msg, read: true })) }
          : s
      )
    );
  };

  const handleTransferSession = () => {
    // Logic for transferring session
    setIsTransferDialogOpen(false);
  };

  const handleWrapUpSession = () => {
    // Logic for wrapping up session
    setIsWrapUpDialogOpen(false);
  };

  const filteredSessions = chatSessions.filter(session => {
    const matchesSearch = session.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.customer.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || session.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedSession?.messages]);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Panel - Chat Queue */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Queue Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Queue</h2>
            <Badge variant="blue">{filteredSessions.length}</Badge>
          </div>
          
          {/* Search & Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Chat Sessions List */}
        <div className="flex-1 overflow-y-auto">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => handleSessionSelect(session)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedSession?.id === session.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              {/* Session Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{session.customer.name}</h3>
                    <p className="text-xs text-gray-500">{session.customer.company}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  {getSLAIndicator(session.slaStatus, session.waitingTime)}
                  {session.unreadCount > 0 && (
                    <Badge variant="red" className="text-xs">
                      {session.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Session Info */}
              <div className="flex items-center justify-between mb-2">
                {getPriorityBadge(session.priority)}
                <div className="flex items-center space-x-1">
                  {session.tags.map(tag => (
                    <Badge key={tag} variant="gray" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Last Message Preview */}
              <p className="text-xs text-gray-600 truncate">
                {session.messages[session.messages.length - 1]?.content}
              </p>
              
              {/* Timestamp */}
              <p className="text-xs text-gray-400 mt-1">
                {new Date(session.lastMessage).toLocaleTimeString('id-ID', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Center Panel - Chat Window */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedSession ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedSession.customer.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{selectedSession.customer.company}</span>
                      <span>•</span>
                      <Badge variant="blue" className="text-xs">{selectedSession.customer.plan}</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowInternalNotes(!showInternalNotes)}>
                    <FileText className="w-4 h-4" />
                  </Button>
                  
                  <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ArrowRightLeft className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Transfer Session</DialogTitle>
                        <DialogDescription>Transfer chat ini ke agent atau departemen lain</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="transferTo">Transfer ke</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih agent atau departemen" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="agent-sarah">Agent Sarah</SelectItem>
                              <SelectItem value="agent-mike">Agent Mike</SelectItem>
                              <SelectItem value="technical-team">Tim Teknis</SelectItem>
                              <SelectItem value="billing-team">Tim Billing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="transferReason">Alasan Transfer</Label>
                          <Textarea 
                            placeholder="Jelaskan alasan transfer..." 
                            rows={3}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsTransferDialogOpen(false)}>
                            Batal
                          </Button>
                          <Button onClick={handleTransferSession}>
                            Transfer
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isWrapUpDialogOpen} onOpenChange={setIsWrapUpDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Wrap-Up Session</DialogTitle>
                        <DialogDescription>Selesaikan chat session ini</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="category">Kategori Sesi</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technical">Masalah Teknis</SelectItem>
                              <SelectItem value="billing">Pertanyaan Billing</SelectItem>
                              <SelectItem value="general">Pertanyaan Umum</SelectItem>
                              <SelectItem value="feature">Permintaan Fitur</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Tandai untuk Tim Lain</Label>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="sales" />
                              <Label htmlFor="sales">Peluang Sales</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="churn" />
                              <Label htmlFor="churn">Risiko Churn</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="feedback" />
                              <Label htmlFor="feedback">Feedback Produk</Label>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="summary">Ringkasan Session</Label>
                          <Textarea 
                            placeholder="Ringkas masalah dan solusi yang diberikan..." 
                            rows={3}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsWrapUpDialogOpen(false)}>
                            Batal
                          </Button>
                          <Button onClick={handleWrapUpSession}>
                            Selesaikan Session
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            {/* Internal Notes (Collapsible) */}
            {showInternalNotes && (
              <div className="p-4 bg-yellow-50 border-b border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-yellow-800">Internal Notes</Label>
                  <Button variant="ghost" size="sm" onClick={() => setShowInternalNotes(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea 
                  value={internalNotes || selectedSession.internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Catatan internal untuk tim..."
                  rows={2}
                  className="bg-white"
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm">
                    Simpan Catatan
                  </Button>
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {selectedSession.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'agent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'agent' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <div className={`text-xs mt-1 flex items-center justify-end space-x-1 ${
                      message.type === 'agent' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      <span>
                        {new Date(message.timestamp).toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      {message.type === 'agent' && (
                        <div className="flex items-center space-x-1">
                          {message.delivered && <CheckCircle className="w-3 h-3" />}
                          {message.read && <Eye className="w-3 h-3" />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
              <div className="flex space-x-2 overflow-x-auto">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="whitespace-nowrap text-xs"
                    onClick={() => setMessageText(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <Textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ketik pesan..."
                    rows={2}
                    className="resize-none"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Pilih Chat Session</h3>
              <p className="text-gray-600">Pilih chat dari antrian untuk mulai membantu customer</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Context & Help */}
      <div className="w-80 bg-white border-l border-gray-200">
        <Tabs value={contextTab} onValueChange={setContextTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 p-1 m-4">
            <TabsTrigger value="customer-info" className="text-xs">Customer</TabsTrigger>
            <TabsTrigger value="knowledge" className="text-xs">Knowledge</TabsTrigger>
            <TabsTrigger value="history" className="text-xs">History</TabsTrigger>
          </TabsList>

          {/* Customer Info Tab */}
          <TabsContent value="customer-info" className="flex-1 overflow-y-auto p-4 pt-0">
            {selectedSession ? (
              <div className="space-y-4">
                {/* Customer Details */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Customer Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedSession.customer.name}</h3>
                        <p className="text-sm text-gray-600">{selectedSession.customer.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span>{selectedSession.customer.company}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{selectedSession.customer.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Member since {new Date(selectedSession.customer.joinDate).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Plan & Stats */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Plan & Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Current Plan</span>
                      <Badge variant="blue">{selectedSession.customer.plan}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Sessions</span>
                      <span className="text-sm font-medium">{selectedSession.customer.totalSessions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Avg Rating</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{selectedSession.customer.avgRating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Activity</span>
                      <span className="text-sm font-medium">
                        {new Date(selectedSession.customer.lastActivity).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Session Tags */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Session Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedSession.tags.map(tag => (
                        <Badge key={tag} variant="gray" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Info className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Pilih chat untuk melihat info customer</p>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Knowledge Base Tab */}
          <TabsContent value="knowledge" className="flex-1 overflow-y-auto p-4 pt-0">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari knowledge..."
                  className="pl-10"
                />
              </div>
              
              <div className="space-y-2">
                {knowledgeArticles.map((article) => (
                  <Card key={article.id} className="p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{article.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{article.category}</p>
                      </div>
                      <Badge variant="green" className="text-xs">
                        {article.relevance}%
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="flex-1 overflow-y-auto p-4 pt-0">
            {selectedSession ? (
              <div className="space-y-3">
                {customerHistory.map((item) => (
                  <Card key={item.id} className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          item.type === 'chat' ? 'bg-blue-500' :
                          item.type === 'email' ? 'bg-green-500' : 'bg-purple-500'
                        }`}></div>
                        <span className="text-xs text-gray-500">{item.date}</span>
                      </div>
                      {item.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs">{item.rating}</span>
                        </div>
                      )}
                    </div>
                    <h4 className="text-sm font-medium text-gray-900">{item.summary}</h4>
                    <p className="text-xs text-gray-600 mt-1">by {item.agent}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <History className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Pilih chat untuk melihat history</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentInbox;