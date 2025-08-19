import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UserAvatar from '@/components/common/UserAvatar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Button,
  Badge,
  Input,
  Textarea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator
} from '@/components/ui';
import { 
  MessageSquare,
  Send,
  Paperclip,
  User,
  Clock,
  Search,
  Phone,
  Mail,
  MapPin,
  Tag,
  History,
  ArrowRight,
  CheckCheck,
  Check,
  AlertCircle,
  Star,
  BookOpen,
  FileText,
  Users,
  X
} from 'lucide-react';

const AgentInbox = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [activeQueueTab, setActiveQueueTab] = useState('my-queue');
  const [activeContextTab, setActiveContextTab] = useState('customer-info');
  const [messageInput, setMessageInput] = useState('');
  const [internalNote, setInternalNote] = useState('');
  const [searchKnowledge, setSearchKnowledge] = useState('');

  // Sample data untuk Chat Queue
  const [chatQueue] = useState({
    'my-queue': [
      {
        id: 'chat-001',
        customerName: 'Budi Setiawan',
        customerEmail: 'budi.setiawan@email.com',
        channel: 'whatsapp',
        lastMessage: 'Halo, saya ingin tanya tentang status pesanan saya',
        timestamp: '2024-03-20 14:30:25',
        slaStatus: 'green', // green, yellow, red
        slaTimeLeft: '15:30',
        isUnread: true,
        priority: 'normal'
      },
      {
        id: 'chat-002',
        customerName: 'Siti Nurhaliza',
        customerEmail: 'siti@email.com',
        channel: 'webchat',
        lastMessage: 'Terima kasih atas bantuannya',
        timestamp: '2024-03-20 13:45:12',
        slaStatus: 'yellow',
        slaTimeLeft: '5:20',
        isUnread: false,
        priority: 'high'
      },
      {
        id: 'chat-003',
        customerName: 'Ahmad Hidayat',
        customerEmail: 'ahmad.hidayat@email.com',
        channel: 'facebook',
        lastMessage: 'Bagaimana cara mengembalikan produk?',
        timestamp: '2024-03-20 12:15:45',
        slaStatus: 'red',
        slaTimeLeft: '0:45',
        isUnread: true,
        priority: 'urgent'
      }
    ],
    'unassigned': [
      {
        id: 'chat-004',
        customerName: 'Maya Sari',
        customerEmail: 'maya.sari@email.com',
        channel: 'whatsapp',
        lastMessage: 'Halo, butuh bantuan segera',
        timestamp: '2024-03-20 14:45:00',
        slaStatus: 'green',
        slaTimeLeft: '25:15',
        isUnread: true,
        priority: 'normal'
      }
    ],
    'closed': [
      {
        id: 'chat-005',
        customerName: 'Rina Melati',
        customerEmail: 'rina.melati@email.com',
        channel: 'webchat',
        lastMessage: 'Terima kasih, masalah sudah teratasi',
        timestamp: '2024-03-20 11:30:18',
        slaStatus: 'completed',
        slaTimeLeft: 'Completed',
        isUnread: false,
        priority: 'normal'
      }
    ]
  });

  // Sample chat messages
  const [chatMessages] = useState({
    'chat-001': [
      {
        id: 'msg-001',
        senderId: 'customer',
        senderName: 'Budi Setiawan',
        message: 'Halo, saya ingin tanya tentang status pesanan saya',
        timestamp: '2024-03-20 14:30:25',
        deliveredAt: '2024-03-20 14:30:26',
        readAt: '2024-03-20 14:30:30'
      },
      {
        id: 'msg-002',
        senderId: user?.id,
        senderName: user?.name,
        message: 'Halo Pak Budi, saya akan bantu cek status pesanan Anda. Bisa berikan nomor pesanan?',
        timestamp: '2024-03-20 14:31:15',
        deliveredAt: '2024-03-20 14:31:16',
        readAt: '2024-03-20 14:31:20'
      },
      {
        id: 'msg-003',
        senderId: 'customer',
        senderName: 'Budi Setiawan',
        message: 'Nomor pesanan saya adalah #ORD-123456',
        timestamp: '2024-03-20 14:32:10',
        deliveredAt: '2024-03-20 14:32:11',
        readAt: null
      }
    ]
  });

  // Sample customer data
  const [customerData] = useState({
    'chat-001': {
      name: 'Budi Setiawan',
      email: 'budi.setiawan@email.com',
      phone: '+62 812-3456-7890',
      location: 'Jakarta, Indonesia',
      joinDate: '2023-08-15',
      totalOrders: 12,
      totalSpent: 'Rp 2.450.000',
      customerTier: 'Gold',
      tags: ['VIP Customer', 'Frequent Buyer'],
      notes: 'Customer setia, sering order produk elektronik'
    }
  });

  // Sample interaction history
  const [interactionHistory] = useState({
    'chat-001': [
      {
        id: 'history-001',
        date: '2024-03-15',
        type: 'chat',
        summary: 'Pertanyaan tentang garansi produk',
        agent: 'Rina Sari',
        duration: '8 menit',
        rating: 5
      },
      {
        id: 'history-002', 
        date: '2024-03-10',
        type: 'phone',
        summary: 'Komplain produk rusak, sudah di-resolve',
        agent: 'Ahmad Rahman',
        duration: '15 menit',
        rating: 4
      }
    ]
  });

  // Sample knowledge base articles
  const [knowledgeArticles] = useState([
    {
      id: 'kb-001',
      title: 'Cara Cek Status Pesanan',
      summary: 'Panduan lengkap untuk mengecek status pesanan customer',
      category: 'Orders',
      relevance: 95
    },
    {
      id: 'kb-002',
      title: 'Kebijakan Return & Refund',
      summary: 'Prosedur pengembalian barang dan kebijakan refund',
      category: 'Policy',
      relevance: 88
    },
    {
      id: 'kb-003',
      title: 'FAQ Produk Elektronik',
      summary: 'Pertanyaan umum seputar produk elektronik',
      category: 'Products',
      relevance: 75
    }
  ]);

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'whatsapp':
        return '💬';
      case 'webchat':
        return '🌐';
      case 'facebook':
        return '📘';
      case 'email':
        return '📧';
      default:
        return '💬';
    }
  };

  const getSLAStatusColor = (status) => {
    switch (status) {
      case 'green':
        return 'bg-green-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'red':
        return 'bg-red-500';
      case 'completed':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      'urgent': 'destructive',
      'high': 'secondary',
      'normal': 'outline'
    };
    return <Badge variant={variants[priority]}>{priority}</Badge>;
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // Logic to send message
    console.log('Sending message:', messageInput);
    setMessageInput('');
  };

  const handleSaveInternalNote = () => {
    if (!internalNote.trim()) return;
    
    // Logic to save internal note
    console.log('Saving internal note:', internalNote);
    setInternalNote('');
  };

  const handleTransferChat = () => {
    // Logic to transfer chat
    console.log('Transferring chat:', selectedChat?.id);
  };

  const handleCloseChat = () => {
    // Logic to close chat with wrap-up form
    console.log('Closing chat:', selectedChat?.id);
  };

  const currentCustomer = selectedChat ? customerData[selectedChat.id] : null;
  const currentMessages = selectedChat ? chatMessages[selectedChat.id] || [] : [];
  const currentHistory = selectedChat ? interactionHistory[selectedChat.id] || [] : [];

  return (
    <div className="max-w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-8rem)]">
        {/* Panel Kiri - Queue & Navigation */}
        <div className="w-full lg:w-80 flex flex-col order-1 lg:order-1">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Inbox</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <Tabs value={activeQueueTab} onValueChange={setActiveQueueTab}>
              <TabsList className="grid w-full grid-cols-3 mx-3 text-xs">
                <TabsTrigger value="my-queue" className="text-xs px-2">My Queue</TabsTrigger>
                <TabsTrigger value="unassigned" className="text-xs px-2">Unassigned</TabsTrigger>
                <TabsTrigger value="closed" className="text-xs px-2">Closed</TabsTrigger>
              </TabsList>

              {Object.entries(chatQueue).map(([queueType, chats]) => (
                <TabsContent key={queueType} value={queueType} className="mt-3">
                  <div className="space-y-2 px-3 pb-3">
                    {chats.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => setSelectedChat(chat)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                          selectedChat?.id === chat.id 
                            ? 'bg-primary/10 border-primary' 
                            : 'hover:bg-muted/50 border-transparent'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className="relative">
                              <UserAvatar 
                                email={chat.customerEmail} 
                                name={chat.customerName} 
                                size="sm" 
                              />
                              {chat.isUnread && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
                              )}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm truncate">
                                {chat.customerName}
                              </span>
                              <span className="text-lg">{getChannelIcon(chat.channel)}</span>
                              {getPriorityBadge(chat.priority)}
                            </div>
                            
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2 break-words">
                              {chat.lastMessage}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {chat.timestamp.split(' ')[1]}
                              </span>
                              <div className="flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${getSLAStatusColor(chat.slaStatus)}`} />
                                <span className="text-xs text-muted-foreground">
                                  {chat.slaTimeLeft}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

        {/* Panel Tengah - Chat Window */}
        <div className="w-full lg:flex-1 flex flex-col order-3 lg:order-2 min-h-0">
        {selectedChat ? (
          <Card className="flex-1 flex flex-col">
            {/* Chat Header */}
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserAvatar 
                    email={selectedChat.customerEmail} 
                    name={selectedChat.customerName} 
                    size="default" 
                  />
                  <div>
                    <h3 className="font-semibold">{selectedChat.customerName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {getChannelIcon(selectedChat.channel)} {selectedChat.channel}
                      <span className="ml-2">• SLA: {selectedChat.slaTimeLeft}</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleTransferChat}>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Transfer
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCloseChat}>
                    <X className="w-4 h-4 mr-2" />
                    Close
                  </Button>
                </div>
              </div>
            </CardHeader>

                          {/* Messages Area */}
            <CardContent className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg break-words ${
                      message.senderId === user?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm break-words">{message.message}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs opacity-70">
                          {message.timestamp.split(' ')[1]}
                        </span>
                        {message.senderId === user?.id && (
                          <div className="flex">
                            {message.deliveredAt && (
                              <Check className="w-3 h-3 opacity-70" />
                            )}
                            {message.readAt && (
                              <CheckCheck className="w-3 h-3 opacity-70" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ketik pesan..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                {/* Internal Notes */}
                <details className="group">
                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                    + Tambah Catatan Internal
                  </summary>
                  <div className="mt-2 space-y-2">
                    <Textarea
                      placeholder="Catatan internal (hanya bisa dilihat oleh agen lain)"
                      value={internalNote}
                      onChange={(e) => setInternalNote(e.target.value)}
                      rows={2}
                    />
                    <Button size="sm" onClick={handleSaveInternalNote}>
                      Simpan Catatan
                    </Button>
                  </div>
                </details>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Pilih Percakapan</h3>
              <p className="text-muted-foreground">Pilih chat dari queue untuk mulai membalas</p>
            </div>
          </Card>
        )}
      </div>

        {/* Panel Kanan - Context & Management */}
        <div className="w-full lg:w-80 flex flex-col order-2 lg:order-3">
        <Card className="flex-1">
          <CardContent className="p-0 h-full">
            <Tabs value={activeContextTab} onValueChange={setActiveContextTab} className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-3 m-3 text-xs">
                <TabsTrigger value="customer-info" className="text-xs px-2">Customer</TabsTrigger>
                <TabsTrigger value="knowledge" className="text-xs px-2">Knowledge</TabsTrigger>
                <TabsTrigger value="history" className="text-xs px-2">History</TabsTrigger>
              </TabsList>

              {/* Customer Info Tab */}
              <TabsContent value="customer-info" className="flex-1 px-3 pb-3">
                {currentCustomer ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <UserAvatar 
                        email={currentCustomer.email} 
                        name={currentCustomer.name} 
                        size="lg" 
                      />
                      <h3 className="font-semibold mt-2">{currentCustomer.name}</h3>
                      <Badge variant="outline">{currentCustomer.customerTier}</Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm truncate">{currentCustomer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 min-w-0">
                        <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm truncate">{currentCustomer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 min-w-0">
                        <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm truncate">{currentCustomer.location}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Customer Stats</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Join Date</span>
                          <p className="font-medium">{currentCustomer.joinDate}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Orders</span>
                          <p className="font-medium">{currentCustomer.totalOrders}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Total Spent</span>
                          <p className="font-medium">{currentCustomer.totalSpent}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Tags</h4>
                      <div className="flex flex-wrap gap-1">
                        {currentCustomer.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Notes</h4>
                      <p className="text-xs text-muted-foreground">{currentCustomer.notes}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-sm text-muted-foreground">Pilih chat untuk melihat info customer</p>
                  </div>
                )}
              </TabsContent>

              {/* Knowledge Base Tab */}
              <TabsContent value="knowledge" className="flex-1 px-3 pb-3">
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari artikel..."
                      value={searchKnowledge}
                      onChange={(e) => setSearchKnowledge(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  <div className="space-y-2">
                    {knowledgeArticles.map((article) => (
                      <div
                        key={article.id}
                        className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                      >
                        <div className="flex items-start gap-2">
                          <BookOpen className="w-4 h-4 text-blue-500 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">{article.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{article.summary}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">{article.category}</Badge>
                              <span className="text-xs text-green-600">{article.relevance}% match</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="flex-1 px-3 pb-3">
                {currentHistory.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Riwayat Interaksi</h4>
                    {currentHistory.map((interaction) => (
                      <div key={interaction.id} className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <History className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{interaction.date}</span>
                          <Badge variant="outline" className="text-xs">{interaction.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{interaction.summary}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span>Agent: {interaction.agent}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span>{interaction.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-sm text-muted-foreground">Tidak ada riwayat interaksi</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentInbox;
