// Sample data untuk semua komponen
export const conversationsData = [
  { 
    id: 1, 
    customer: "John Doe", 
    status: "active", 
    channel: "webchat", 
    lastMessage: "I need help with my order #12345", 
    time: "2 min ago", 
    agent: "Sarah Wilson", 
    sentiment: "neutral",
    unread: 2,
    priority: "high"
  },
  { 
    id: 2, 
    customer: "Emma Smith", 
    status: "bot_handled", 
    channel: "whatsapp", 
    lastMessage: "What are your business hours?", 
    time: "5 min ago", 
    agent: "Bot", 
    sentiment: "positive",
    unread: 0,
    priority: "low"
  },
  { 
    id: 3, 
    customer: "Michael Brown", 
    status: "agent_handled", 
    channel: "facebook", 
    lastMessage: "Thank you for your help!", 
    time: "10 min ago", 
    agent: "John Davis", 
    sentiment: "positive",
    unread: 0,
    priority: "medium"
  },
  { 
    id: 4, 
    customer: "Lisa Johnson", 
    status: "completed", 
    channel: "webchat", 
    lastMessage: "Issue resolved", 
    time: "1 hour ago", 
    agent: "Sarah Wilson", 
    sentiment: "positive",
    unread: 0,
    priority: "low"
  },
  { 
    id: 5, 
    customer: "Robert Taylor", 
    status: "active", 
    channel: "telegram", 
    lastMessage: "Can you check my refund status?", 
    time: "15 min ago", 
    agent: "Mike Chen", 
    sentiment: "negative",
    unread: 3,
    priority: "high"
  }
];

export const chatMessages = [
  { id: 1, sender: "customer", message: "Hi, I need help with my recent order", time: "10:23 AM", type: "text" },
  { id: 2, sender: "bot", message: "Hello! I'd be happy to help you with your order. Could you please provide your order number?", time: "10:23 AM", type: "text" },
  { id: 3, sender: "customer", message: "It's order #12345", time: "10:24 AM", type: "text" },
  { id: 4, sender: "bot", message: "Thank you! I can see your order #12345 was placed on March 15th. Let me transfer you to an agent who can assist you better.", time: "10:24 AM", type: "text" },
  { id: 5, sender: "agent", message: "Hi John! This is Sarah from customer support. I can see you have an issue with order #12345. How can I help you today?", time: "10:25 AM", type: "text", agentName: "Sarah Wilson" },
  { id: 6, sender: "customer", message: "The product arrived damaged. I need a replacement.", time: "10:26 AM", type: "text" },
  { id: 7, sender: "agent", message: "I'm sorry to hear that! I'll immediately process a replacement for you. You should receive it within 2-3 business days.", time: "10:27 AM", type: "text", agentName: "Sarah Wilson" }
];

export const knowledgeArticles = [
  { 
    id: 1, 
    title: "Base knowledge utama", 
    content: "Selamat datang di platform kami! Panduan ini akan membantu Anda memahami cara menggunakan fitur-fitur utama. Pertama, pastikan Anda telah login ke akun Anda. Kemudian, navigasi ke dashboard utama untuk melihat ringkasan aktivitas. Menu sidebar kiri berisi semua fitur yang tersedia seperti Inbox untuk mengelola percakapan, Analytics untuk melihat performa, dan Knowledge Base untuk mengelola informasi. Untuk memulai, cobalah mengeksplorasi setiap menu dan familiarkan diri dengan antarmuka pengguna.", 
    status: "active", 
    updated_at: "2024-03-20 14:30:00" 
  },
  { 
    id: 2, 
    title: "Base knowledge 2", 
    content: "Kami memahami bahwa terkadang produk atau layanan yang diterima mungkin tidak sesuai harapan. Oleh karena itu, kami menyediakan kebijakan pengembalian dana yang jelas dan mudah dipahami. Pengembalian dana dapat diajukan dalam waktu 30 hari sejak pembelian dengan syarat produk masih dalam kondisi asli. Untuk mengajukan pengembalian, silakan hubungi tim customer service kami melalui chat atau email dengan menyertakan nomor pesanan dan alasan pengembalian. Tim kami akan memproses permintaan Anda dalam waktu 3-5 hari kerja.", 
    status: "inactive", 
    updated_at: "2024-03-19 10:15:00" 
  },
  { 
    id: 3, 
    title: "Base knowledge 99 ", 
    content: "Pengaturan profil akun yang lengkap dan akurat sangat penting untuk pengalaman yang optimal. Untuk mengakses pengaturan profil, klik pada avatar Anda di pojok kanan atas, kemudian pilih 'Pengaturan Akun'. Di halaman ini, Anda dapat memperbarui informasi personal seperti nama, email, nomor telepon, dan alamat. Pastikan juga untuk mengatur preferensi notifikasi sesuai kebutuhan Anda. Jangan lupa untuk menyimpan perubahan yang telah dibuat dengan mengklik tombol 'Simpan' di bagian bawah halaman.", 
    status: "inactive", 
    updated_at: "2024-03-18 16:45:00" 
  }
];

export const agentsData = [
  { 
    id: 1, 
    name: "Sarah Wilson", 
    email: "sarah@company.com", 
    status: "online", 
    activeChats: 3, 
    satisfaction: 4.8, 
    avgHandlingTime: "4m 32s", 
    totalHandled: 152, 
    specialization: "Technical Support",
    botPersonalityId: 1,
    maxConcurrentChats: 5
  },
  { 
    id: 2, 
    name: "John Davis", 
    email: "john@company.com", 
    status: "busy", 
    activeChats: 5, 
    satisfaction: 4.6, 
    avgHandlingTime: "5m 12s", 
    totalHandled: 98, 
    specialization: "Billing",
    botPersonalityId: 2,
    maxConcurrentChats: 6
  },
  { 
    id: 3, 
    name: "Mike Chen", 
    email: "mike@company.com", 
    status: "offline", 
    activeChats: 0, 
    satisfaction: 4.9, 
    avgHandlingTime: "3m 45s", 
    totalHandled: 203, 
    specialization: "General Support",
    botPersonalityId: 3,
    maxConcurrentChats: 4
  },
  { 
    id: 4, 
    name: "Emily Rodriguez", 
    email: "emily@company.com", 
    status: "online", 
    activeChats: 2, 
    satisfaction: 4.7, 
    avgHandlingTime: "4m 10s", 
    totalHandled: 176, 
    specialization: "Product Expert",
    botPersonalityId: 1,
    maxConcurrentChats: 3
  }
];

// Data untuk Session Manager
export const channelConfigsData = [
  {
    id: 1,
    name: "Website Chat",
    channel: "webchat",
    channel_type: "web",
    settings: {
      widget_color: "#2563eb",
      greeting_message: "Halo! Ada yang bisa kami bantu?",
      offline_message: "Maaf, kami sedang offline. Silakan tinggalkan pesan."
    },
    is_active: true
  },
  {
    id: 2,
    name: "WhatsApp Business",
    channel: "whatsapp",
    channel_type: "whatsapp",
    settings: {
      phone_number: "+6281234567890",
      webhook_url: "https://api.whatsapp.com/webhook",
      verify_token: "whatsapp_verify_token"
    },
    is_active: true
  },
  {
    id: 3,
    name: "Telegram Bot",
    channel: "telegram",
    channel_type: "telegram",
    settings: {
      bot_token: "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11",
      webhook_url: "https://api.telegram.org/webhook"
    },
    is_active: true
  },
  {
    id: 4,
    name: "Facebook Messenger",
    channel: "facebook",
    channel_type: "facebook",
    settings: {
      page_id: "123456789",
      app_secret: "facebook_app_secret",
      verify_token: "facebook_verify_token"
    },
    is_active: false
  }
];

export const customersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+6281234567890",
    created_at: "2024-03-15T08:30:00Z",
    last_seen: "2024-03-20T14:25:00Z",
    metadata: {
      location: "Jakarta",
      source: "website",
      customer_since: "2023-01-15"
    }
  },
  {
    id: 2,
    name: "Emma Smith",
    email: "emma.smith@email.com",
    phone: "+6281234567891",
    created_at: "2024-02-10T10:15:00Z",
    last_seen: "2024-03-20T14:20:00Z",
    metadata: {
      location: "Bandung",
      source: "whatsapp",
      customer_since: "2024-02-10"
    }
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@email.com",
    phone: "+6281234567892",
    created_at: "2024-01-20T16:45:00Z",
    last_seen: "2024-03-20T14:15:00Z",
    metadata: {
      location: "Surabaya",
      source: "facebook",
      customer_since: "2024-01-20"
    }
  },
  {
    id: 4,
    name: "Lisa Johnson",
    email: "lisa.johnson@email.com",
    phone: "+6281234567893",
    created_at: "2024-03-01T09:20:00Z",
    last_seen: "2024-03-20T13:30:00Z",
    metadata: {
      location: "Medan",
      source: "website",
      customer_since: "2024-03-01"
    }
  },
  {
    id: 5,
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    phone: "+6281234567894",
    created_at: "2024-02-28T11:10:00Z",
    last_seen: "2024-03-20T14:10:00Z",
    metadata: {
      location: "Yogyakarta",
      source: "telegram",
      customer_since: "2024-02-28"
    }
  }
];

export const chatSessionsData = [
  {
    id: 1,
    customer_id: 1,
    channel_config_id: 1,
    agent_id: 1,
    status: "active",
    started_at: "2024-03-20T14:23:00Z",
    ended_at: null,
    is_active: true,
    tags: ["urgent", "order_issue"],
    handover_reason: "Customer requested human agent",
    metadata: {
      session_source: "bot_escalation",
      initial_intent: "order_help"
    }
  },
  {
    id: 2,
    customer_id: 2,
    channel_config_id: 2,
    agent_id: null,
    status: "bot_handled",
    started_at: "2024-03-20T14:18:00Z",
    ended_at: null,
    is_active: true,
    tags: ["info_request"],
    handover_reason: null,
    metadata: {
      session_source: "direct_message",
      initial_intent: "business_hours"
    }
  },
  {
    id: 3,
    customer_id: 3,
    channel_config_id: 4,
    agent_id: 2,
    status: "completed",
    started_at: "2024-03-20T14:05:00Z",
    ended_at: "2024-03-20T14:13:00Z",
    is_active: false,
    tags: ["satisfied", "product_help"],
    handover_reason: null,
    metadata: {
      session_source: "direct_contact",
      initial_intent: "product_inquiry"
    }
  },
  {
    id: 4,
    customer_id: 4,
    channel_config_id: 1,
    agent_id: 1,
    status: "completed",
    started_at: "2024-03-20T13:30:00Z",
    ended_at: "2024-03-20T13:45:00Z",
    is_active: false,
    tags: ["resolved"],
    handover_reason: null,
    metadata: {
      session_source: "website_widget",
      initial_intent: "general_inquiry"
    }
  },
  {
    id: 5,
    customer_id: 5,
    channel_config_id: 3,
    agent_id: 3,
    status: "active",
    started_at: "2024-03-20T14:10:00Z",
    ended_at: null,
    is_active: true,
    tags: ["refund", "urgent"],
    handover_reason: "Complex refund request",
    metadata: {
      session_source: "bot_escalation",
      initial_intent: "refund_request"
    }
  }
];

export const sessionsMessagesData = [
  // Session 1 messages
  {
    id: 1,
    session_id: 1,
    sender_type: "customer",
    sender_id: 1,
    message_type: "text",
    content: "Hi, I need help with my recent order",
    media_url: null,
    quick_replies: null,
    created_at: "2024-03-20T14:23:15Z"
  },
  {
    id: 2,
    session_id: 1,
    sender_type: "bot",
    sender_id: null,
    message_type: "text",
    content: "Hello! I'd be happy to help you with your order. Could you please provide your order number?",
    media_url: null,
    quick_replies: ["Check Order Status", "Track Package", "Cancel Order"],
    created_at: "2024-03-20T14:23:20Z"
  },
  {
    id: 3,
    session_id: 1,
    sender_type: "customer",
    sender_id: 1,
    message_type: "text",
    content: "It's order #12345",
    media_url: null,
    quick_replies: null,
    created_at: "2024-03-20T14:24:00Z"
  },
  {
    id: 4,
    session_id: 1,
    sender_type: "bot",
    sender_id: null,
    message_type: "text",
    content: "Thank you! I can see your order #12345 was placed on March 15th. Let me transfer you to an agent who can assist you better.",
    media_url: null,
    quick_replies: null,
    created_at: "2024-03-20T14:24:10Z"
  },
  {
    id: 5,
    session_id: 1,
    sender_type: "agent",
    sender_id: 1,
    message_type: "text",
    content: "Hi John! This is Sarah from customer support. I can see you have an issue with order #12345. How can I help you today?",
    media_url: null,
    quick_replies: null,
    created_at: "2024-03-20T14:25:00Z"
  },
  {
    id: 6,
    session_id: 1,
    sender_type: "customer",
    sender_id: 1,
    message_type: "text",
    content: "The product arrived damaged. I need a replacement.",
    media_url: null,
    quick_replies: null,
    created_at: "2024-03-20T14:26:00Z"
  },
  {
    id: 7,
    session_id: 1,
    sender_type: "customer",
    sender_id: 1,
    message_type: "image",
    content: "Here's the photo of the damaged product",
    media_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
    quick_replies: null,
    created_at: "2024-03-20T14:26:30Z"
  },
  {
    id: 8,
    session_id: 1,
    sender_type: "agent",
    sender_id: 1,
    message_type: "text",
    content: "I'm sorry to hear that! I can see the damage in the photo. I'll immediately process a replacement for you. You should receive it within 2-3 business days.",
    media_url: null,
    quick_replies: null,
    created_at: "2024-03-20T14:27:00Z"
  },
  // Session 2 messages
  {
    id: 9,
    session_id: 2,
    sender_type: "customer",
    sender_id: 2,
    message_type: "text",
    content: "What are your business hours?",
    media_url: null,
    quick_replies: null,
    created_at: "2024-03-20T14:18:15Z"
  },
  {
    id: 10,
    session_id: 2,
    sender_type: "bot",
    sender_id: null,
    message_type: "text",
    content: "Our business hours are Monday-Friday 9AM-6PM WIB, and Saturday 9AM-3PM WIB. We're closed on Sundays and public holidays.",
    media_url: null,
    quick_replies: ["Contact Support", "Visit Store", "More Info"],
    created_at: "2024-03-20T14:18:20Z"
  },
  // Session 3 messages
  {
    id: 11,
    session_id: 3,
    sender_type: "customer",
    sender_id: 3,
    message_type: "text",
    content: "Hi, I'm looking for information about your latest products",
    media_url: null,
    quick_replies: null,
    created_at: "2024-03-20T14:05:15Z"
  },
  {
    id: 12,
    session_id: 3,
    sender_type: "agent",
    sender_id: 2,
    message_type: "text",
    content: "Hello! I'd be happy to help you with product information. What specific products are you interested in?",
    media_url: null,
    quick_replies: null,
    created_at: "2024-03-20T14:06:00Z"
  },
  {
    id: 13,
    session_id: 3,
    sender_type: "agent",
    sender_id: 2,
    message_type: "document",
    content: "Here's our latest product catalog",
    media_url: "https://example.com/catalog.pdf",
    quick_replies: null,
    created_at: "2024-03-20T14:07:00Z"
  },
  {
    id: 14,
    session_id: 3,
    sender_type: "customer",
    sender_id: 3,
    message_type: "text",
    content: "Thank you for your help! This is exactly what I needed.",
    media_url: null,
    quick_replies: null,
    created_at: "2024-03-20T14:12:00Z"
  }
];

export const channelPerformanceData = [
  { channel: 'WhatsApp', sessions: 450, satisfaction: 4.8, avgDuration: '5m 23s', fill: "hsl(var(--chart-1))" },
  { channel: 'WebChat', sessions: 380, satisfaction: 4.6, avgDuration: '4m 15s', fill: "hsl(var(--chart-2))" },
  { channel: 'Facebook', sessions: 290, satisfaction: 4.5, avgDuration: '6m 45s', fill: "hsl(var(--chart-3))" },
  { channel: 'Telegram', sessions: 180, satisfaction: 4.7, avgDuration: '3m 50s', fill: "hsl(var(--chart-4))" },
  { channel: 'Email', sessions: 120, satisfaction: 4.4, avgDuration: '15m 30s', fill: "hsl(var(--chart-5))" }
];

export const sessionsData = [
  { hour: '00:00', bot: 45, agent: 12 },
  { hour: '04:00', bot: 32, agent: 8 },
  { hour: '08:00', bot: 89, agent: 34 },
  { hour: '12:00', bot: 120, agent: 56 },
  { hour: '16:00', bot: 98, agent: 45 },
  { hour: '20:00', bot: 67, agent: 23 }
];

export const intentsData = [
  { name: "Customer Service", count: 289, percentage: 24, trending: "stable" },
  { name: "Technical Support", count: 198, percentage: 16, trending: "down" },
];

export const workflowsData = [
  { id: 1, name: "Order Status Check", webhook: "https://n8n.company.com/webhook/order-status", status: "active", triggers: ["order_status", "track_order"], executions: 234 },
  { id: 2, name: "Refund Processing", webhook: "https://n8n.company.com/webhook/refund", status: "active", triggers: ["refund_request", "return"], executions: 89 },
  { id: 3, name: "Customer Escalation", webhook: "https://n8n.company.com/webhook/escalate", status: "inactive", triggers: ["escalate", "complaint"], executions: 45 },
  { id: 4, name: "Appointment Booking", webhook: "https://n8n.company.com/webhook/appointment", status: "active", triggers: ["book_appointment", "schedule"], executions: 167 }
];

export const auditLogsData = [
  { id: 1, timestamp: "2024-03-20 14:32:15", user: "admin@company.com", action: "UPDATE", resource: "bot_personality", details: "Changed greeting message", ip: "192.168.1.100" },
  { id: 2, timestamp: "2024-03-20 13:45:22", user: "sarah@company.com", action: "CREATE", resource: "knowledge_article", details: "Created article: Refund Policy", ip: "192.168.1.101" },
  { id: 3, timestamp: "2024-03-20 12:18:30", user: "system", action: "DELETE", resource: "api_key", details: "Expired API key removed", ip: "system" },
  { id: 4, timestamp: "2024-03-20 11:22:45", user: "john@company.com", action: "LOGIN", resource: "auth", details: "Successful login", ip: "192.168.1.102" }
];
