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
  { id: 1, name: "Sarah Wilson", email: "sarah@company.com", status: "online", activeChats: 3, satisfaction: 4.8, avgHandlingTime: "4m 32s", totalHandled: 152, specialization: "Technical Support" },
  { id: 2, name: "John Davis", email: "john@company.com", status: "busy", activeChats: 5, satisfaction: 4.6, avgHandlingTime: "5m 12s", totalHandled: 98, specialization: "Billing" },
  { id: 3, name: "Mike Chen", email: "mike@company.com", status: "offline", activeChats: 0, satisfaction: 4.9, avgHandlingTime: "3m 45s", totalHandled: 203, specialization: "General Support" },
  { id: 4, name: "Emily Rodriguez", email: "emily@company.com", status: "online", activeChats: 2, satisfaction: 4.7, avgHandlingTime: "4m 10s", totalHandled: 176, specialization: "Product Expert" }
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
  { name: "Order Status", count: 342, percentage: 28, trending: "up" },
  { name: "Product Information", count: 289, percentage: 24, trending: "stable" },
  { name: "Technical Support", count: 198, percentage: 16, trending: "down" },
  { name: "Billing Issues", count: 156, percentage: 13, trending: "up" },
  { name: "Account Management", count: 134, percentage: 11, trending: "stable" },
  { name: "General Inquiry", count: 98, percentage: 8, trending: "down" }
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
