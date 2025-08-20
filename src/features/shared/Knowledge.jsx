import React, { useState, useEffect } from 'react';
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
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Alert,
  AlertDescription,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Progress,
  Separator
} from '@/components/ui';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  BookOpen, 
  Calendar,
  AlertCircle,
  Save,
  X,
  Crown,
  Info,
  MessageSquare,
  FileText,
  Tag,
  Globe,
  Hash,
  Send,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  Zap,
  Target,
  Brain,
  Sparkles,
  Shield,
  TrendingUp,
  Users,
  BarChart3,
  FileCheck,
  AlertTriangle,
  Package,
  Settings,
  HelpCircle
} from 'lucide-react';
import { knowledgeArticles } from '@/data/sampleData';

// Utility function to safely parse and format dates
const parseDate = (dateString) => {
  try {
    let date = new Date(dateString);
    
    // If invalid, try parsing "YYYY-MM-DD HH:mm:ss" format
    if (isNaN(date.getTime()) && typeof dateString === 'string') {
      // Convert "YYYY-MM-DD HH:mm:ss" to ISO format
      if (dateString.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
        date = new Date(dateString.replace(' ', 'T') + 'Z');
      }
    }
    
    return isNaN(date.getTime()) ? new Date() : date;
  } catch (error) {
    return new Date();
  }
};

const Knowledge = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState(knowledgeArticles.filter(article => article.status !== 'deleted'));
  const [isCreating, setIsCreating] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [activeTab, setActiveTab] = useState('qa');
  
  // Enhanced form data with professional fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'general',
    priority: 'medium',
    tags: [],
    language: 'id',
    isPublic: true,
    requiresApproval: false,
    qaItems: [
      {
        question: '',
        variations: '',
        answer: '',
        confidence: 'high',
        keywords: []
      }
    ]
  });
  
  const [charCount, setCharCount] = useState(0);
  const [testMessage, setTestMessage] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_CHARS = 7000;
  
  // Predefined categories and priorities
  const categories = [
    { value: 'general', label: 'Umum', icon: Info },
    { value: 'product', label: 'Produk', icon: Package },
    { value: 'service', label: 'Layanan', icon: Settings },
    { value: 'technical', label: 'Teknis', icon: Zap },
    { value: 'policy', label: 'Kebijakan', icon: Shield },
    { value: 'faq', label: 'FAQ', icon: HelpCircle }
  ];
  
  const priorities = [
    { value: 'low', label: 'Rendah', color: 'text-gray-500' },
    { value: 'medium', label: 'Sedang', color: 'text-blue-600' },
    { value: 'high', label: 'Tinggi', color: 'text-orange-600' },
    { value: 'critical', label: 'Kritis', color: 'text-red-600' }
  ];
  
  const languages = [
    { value: 'id', label: 'Bahasa Indonesia' },
    { value: 'en', label: 'English' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'zh', label: '中文' }
  ];
  
  const confidenceLevels = [
    { value: 'low', label: 'Rendah', color: 'text-red-500' },
    { value: 'medium', label: 'Sedang', color: 'text-yellow-500' },
    { value: 'high', label: 'Tinggi', color: 'text-green-500' }
  ];

  // Get active article count
  const activeArticleCount = articles.filter(article => article.status === 'active').length;
  const activeArticle = articles.find(article => article.status === 'active');

  // Filter articles berdasarkan search term
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi untuk toggle status active/inactive (hanya 1 yang bisa aktif)
  const toggleStatus = (id) => {
    const targetArticle = articles.find(article => article.id === id);
    const currentActiveArticle = articles.find(article => article.status === 'active');
    
    if (targetArticle.status === 'active') {
      // Jika knowledge sedang aktif, nonaktifkan
      setArticles(prevArticles =>
        prevArticles.map(article =>
          article.id === id
            ? { ...article, status: 'inactive' }
            : article
        )
      );
    } else {
      // Jika knowledge inactive, konfirmasi jika ada knowledge aktif lain
      if (currentActiveArticle && currentActiveArticle.id !== id) {
        const confirmed = window.confirm(
          `Mengaktifkan "${targetArticle.title}" akan menonaktifkan "${currentActiveArticle.title}". Lanjutkan?`
        );
        if (!confirmed) return;
      }
      
      // Aktifkan knowledge target dan nonaktifkan yang lain
      setArticles(prevArticles =>
        prevArticles.map(article =>
          article.id === id
            ? { ...article, status: 'active' }
            : { ...article, status: 'inactive' }
        )
      );
    }
  };

  // Fungsi untuk soft delete
  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus knowledge ini?')) {
      setArticles(prevArticles =>
        prevArticles.map(article =>
          article.id === id
            ? { ...article, status: 'deleted' }
            : article
        ).filter(article => article.status !== 'deleted')
      );
    }
  };

  // Fungsi untuk menambah Q&A item baru
  const addQAItem = () => {
    setFormData(prev => ({
      ...prev,
      qaItems: [
        ...prev.qaItems,
        { question: '', variations: '', answer: '' }
      ]
    }));
  };

  // Fungsi untuk menghapus Q&A item
  const removeQAItem = (index) => {
    if (formData.qaItems.length > 1) {
      setFormData(prev => ({
        ...prev,
        qaItems: prev.qaItems.filter((_, i) => i !== index)
      }));
    }
  };

  // Fungsi untuk update Q&A item
  const updateQAItem = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      qaItems: prev.qaItems.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Fungsi untuk handle form input
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Update character count untuk content
    if (field === 'content') {
      setCharCount(value.length);
    }
  };

  // Enhanced form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Judul knowledge wajib diisi';
    } else if (formData.title.length < 10) {
      errors.title = 'Judul minimal 10 karakter';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Deskripsi knowledge wajib diisi';
    }
    
    if (activeTab === 'qa') {
      const hasValidQA = formData.qaItems.some(item => 
        item.question.trim() && item.answer.trim()
      );
      
      if (!hasValidQA) {
        errors.qa = 'Minimal satu Q&A harus diisi dengan lengkap';
      }
      
      // Validate individual QA items
      formData.qaItems.forEach((item, index) => {
        if (item.question.trim() && !item.answer.trim()) {
          errors[`qa-${index}-answer`] = 'Jawaban wajib diisi jika pertanyaan diisi';
        }
        if (!item.question.trim() && item.answer.trim()) {
          errors[`qa-${index}-question`] = 'Pertanyaan wajib diisi jika jawaban diisi';
        }
      });
    } else {
      if (!formData.content.trim()) {
        errors.content = 'Konten knowledge wajib diisi';
      } else if (formData.content.length < 100) {
        errors.content = 'Konten minimal 100 karakter';
      }
    }
    
    if (formData.tags.length === 0) {
      errors.tags = 'Minimal satu tag harus dipilih';
    }
    
    return errors;
  };

  // Enhanced form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Prepare enhanced data untuk disimpan
      const articleData = {
        id: editingArticle ? editingArticle.id : Date.now().toString(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        content: activeTab === 'qa' ? '' : formData.content.trim(),
        category: formData.category,
        priority: formData.priority,
        tags: formData.tags,
        language: formData.language,
        isPublic: formData.isPublic,
        requiresApproval: formData.requiresApproval,
        metadata: activeTab === 'qa' ? {
          type: 'qa',
          qaItems: formData.qaItems.filter(item => 
            item.question.trim() && item.answer.trim()
          ).map(item => ({
            ...item,
            keywords: item.keywords.length > 0 ? item.keywords : 
              item.question.toLowerCase().split(' ').filter(word => word.length > 3)
          }))
        } : {
          type: 'article',
          wordCount: formData.content.trim().split(/\s+/).length,
          readingTime: Math.ceil(formData.content.trim().split(/\s+/).length / 200) // 200 words per minute
        },
        status: 'inactive',
        created_at: editingArticle ? editingArticle.created_at : new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: editingArticle ? editingArticle.created_by : 'Current User',
        version: editingArticle ? (editingArticle.version || 1) + 1 : 1
      };

      if (editingArticle) {
        // Update existing article
        setArticles(prevArticles =>
          prevArticles.map(article =>
            article.id === editingArticle.id ? articleData : article
          )
        );
      } else {
        // Create new article
        setArticles(prevArticles => [...prevArticles, articleData]);
      }

      // Reset form dan close modal
      resetForm();
      setIsCreating(false);
      setEditingArticle(null);
      setFormErrors({});
      
      // Show success message (in real app, use toast notification)
      console.log('Knowledge saved successfully!');
      
    } catch (error) {
      console.error('Error saving knowledge:', error);
      setFormErrors({ submit: 'Terjadi kesalahan saat menyimpan. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced reset form function
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      category: 'general',
      priority: 'medium',
      tags: [],
      language: 'id',
      isPublic: true,
      requiresApproval: false,
      qaItems: [{ question: '', variations: '', answer: '', confidence: 'high', keywords: [] }]
    });
    setCharCount(0);
    setActiveTab('qa');
    setTestMessage('');
    setShowAdvanced(false);
    setFormErrors({});
  };

  // Tag management functions
  const addTag = (tag) => {
    if (tag.trim() && !formData.tags.includes(tag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Predefined tag suggestions
  const tagSuggestions = [
    'gadai', 'emas', 'cicilan', 'pembayaran', 'persetujuan', 'dokumen', 'syarat', 'proses',
    'bunga', 'jasa', 'admin', 'biaya', 'jaminan', 'pelunasan', 'perpanjangan', 'penarikan'
  ];

  // Reset form to default values
  const handleResetSettings = () => {
    if (editingArticle) {
      // Reset to original values when editing
      handleEdit(editingArticle);
    } else {
      // Reset to empty form when creating
      resetForm();
    }
  };

  // Enhanced edit article function
  const handleEdit = (article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title || '',
      description: article.description || '',
      content: article.content || '',
      category: article.category || 'general',
      priority: article.priority || 'medium',
      tags: article.tags || [],
      language: article.language || 'id',
      isPublic: article.isPublic !== undefined ? article.isPublic : true,
      requiresApproval: article.requiresApproval || false,
      qaItems: article.metadata?.type === 'qa' ? 
        article.metadata.qaItems.map(qa => ({
          ...qa,
          confidence: qa.confidence || 'high',
          keywords: qa.keywords || []
        })) : 
        [{ question: '', variations: '', answer: '', confidence: 'high', keywords: [] }]
    });
    setActiveTab(article.metadata?.type === 'qa' ? 'qa' : 'article');
    setCharCount(article.content ? article.content.length : 0);
    setFormErrors({});
    setIsCreating(true);
  };

  // Fungsi untuk handle test message
  const handleTestMessage = () => {
    if (testMessage.trim()) {
      // Simulate AI response based on content
      const response = generateAIResponse(testMessage, formData.content);
      // For now, just log the response - in real implementation this would call AI API
      console.log('Test message:', testMessage);
      console.log('AI Response:', response);
      setTestMessage('');
    }
  };

  // Fungsi untuk generate AI response (simulation)
  const generateAIResponse = (message, knowledgeContent) => {
    if (!knowledgeContent) return "Maaf, saya belum memiliki knowledge yang cukup untuk menjawab pertanyaan Anda.";
    
    // Simple simulation - in real app this would call AI API
    const responses = [
      "Berdasarkan knowledge yang tersedia, saya dapat membantu Anda dengan pertanyaan tersebut.",
      "Sesuai dengan informasi yang ada, berikut adalah jawabannya...",
      "Terima kasih atas pertanyaannya. Berdasarkan knowledge base kami...",
      "Saya menemukan informasi relevan untuk pertanyaan Anda."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Fungsi untuk close modal
  const closeModal = () => {
    setIsCreating(false);
    setEditingArticle(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-gray-600">Kelola pengetahuan dan FAQ untuk bot</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Pengetahuan Baru
        </Button>
      </div>

      {/* Active Knowledge Status */}
      {activeArticle && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Knowledge Aktif:</strong> {activeArticle.title}
            {activeArticle.metadata?.type === 'qa' && (
              <span className="ml-2 text-blue-600">
                ({activeArticle.metadata.qaItems.length} Q&A)
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Cari knowledge..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Articles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Knowledge</CardTitle>
          <CardDescription>
            {filteredArticles.length} knowledge tersedia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dibuat</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{article.title}</div>
                      <div className="text-sm text-gray-500">
                        {article.metadata?.type === 'qa' ? 
                          `${article.metadata.qaItems.length} Q&A` : 
                          `${article.metadata?.wordCount || 0} kata`
                        }
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={article.metadata?.type === 'qa' ? 'default' : 'secondary'}>
                      {article.metadata?.type === 'qa' ? 'Q&A' : 'Knowledge'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {article.tags?.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={article.status === 'active'}
                        onCheckedChange={() => toggleStatus(article.id)}
                      />
                      <Badge variant={article.status === 'active' ? 'default' : 'secondary'}>
                        {article.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-500">
                      {parseDate(article.created_at).toLocaleDateString('id-ID')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(article)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(article.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Modal */}
      {isCreating && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div 
            className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Enhanced Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingArticle ? 'Edit Knowledge' : 'Tambah Knowledge Baru'}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {editingArticle ? 'Perbarui informasi knowledge yang sudah ada' : 'Buat knowledge baru untuk meningkatkan kemampuan bot'}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={closeModal} className="hover:bg-gray-100 rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress Form</span>
                  <span className="text-sm text-gray-500">
                    {activeTab === 'qa' ? 'Step 1 of 2' : 'Step 2 of 2'}
                  </span>
                </div>
                <Progress value={activeTab === 'qa' ? 50 : 100} className="h-2" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="lg:col-span-2 space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      Judul Knowledge *
                    </Label>
                    <Input
                      id="title"
                      placeholder="Contoh: Pertanyaan Seputar Gadai Emas, Panduan Lengkap Pembayaran Cicilan"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={formErrors.title ? 'border-red-500' : ''}
                      required
                    />
                    {formErrors.title && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {formErrors.title}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-2 space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-600" />
                      Deskripsi Singkat *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Jelaskan secara singkat tentang knowledge ini (maksimal 200 karakter)"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      maxLength={200}
                      className={formErrors.description ? 'border-red-500' : ''}
                      required
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{formData.description.length}/200 karakter</span>
                      {formErrors.description && (
                        <span className="text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {formErrors.description}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category and Priority */}
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium flex items-center gap-2">
                      <Tag className="w-4 h-4 text-purple-600" />
                      Kategori *
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => {
                          const IconComponent = category.icon;
                          return (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center gap-2">
                                <IconComponent className="w-4 h-4" />
                                {category.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-sm font-medium flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                      Prioritas
                    </Label>
                    <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            <span className={priority.color}>{priority.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Language and Visibility */}
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-sm font-medium flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      Bahasa
                    </Label>
                    <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="visibility" className="text-sm font-medium flex items-center gap-2">
                      <Eye className="w-4 h-4 text-gray-600" />
                      Visibilitas
                    </Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Switch
                          id="isPublic"
                          checked={formData.isPublic}
                          onCheckedChange={(checked) => handleInputChange('isPublic', checked)}
                        />
                        <Label htmlFor="isPublic">Knowledge Publik</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Switch
                          id="requiresApproval"
                          checked={formData.requiresApproval}
                          onCheckedChange={(checked) => handleInputChange('requiresApproval', checked)}
                        />
                        <Label htmlFor="requiresApproval">Perlu Persetujuan</Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags Section */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Hash className="w-4 h-4 text-indigo-600" />
                    Tags *
                  </Label>
                  <div className="space-y-3">
                    {/* Current Tags */}
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1">
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-2 hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {/* Tag Input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ketik tag dan tekan Enter"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag(e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const input = document.querySelector('input[placeholder="Ketik tag dan tekan Enter"]');
                          if (input && input.value.trim()) {
                            addTag(input.value);
                            input.value = '';
                          }
                        }}
                      >
                        Tambah
                      </Button>
                    </div>
                    
                    {/* Tag Suggestions */}
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">Tag yang sering digunakan:</p>
                      <div className="flex flex-wrap gap-2">
                        {tagSuggestions.slice(0, 8).map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => addTag(tag)}
                            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
                          >
                            + {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {formErrors.tags && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {formErrors.tags}
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Tab Interface */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="qa" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Input Q&A
                    </TabsTrigger>
                    <TabsTrigger value="article" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Input Knowledge
                    </TabsTrigger>
                  </TabsList>

                  {/* Tab 1: Input Q&A */}
                  <TabsContent value="qa" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      {formData.qaItems.map((item, index) => (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <MessageSquare className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">Q&A #{index + 1}</CardTitle>
                                  <p className="text-sm text-gray-500">Pertanyaan dan jawaban untuk bot</p>
                                </div>
                              </div>
                              {formData.qaItems.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeQAItem(index)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {/* Question Section */}
                            <div className="space-y-3">
                              <Label htmlFor={`question-${index}`} className="text-sm font-medium flex items-center gap-2">
                                <Target className="w-4 h-4 text-blue-600" />
                                Pertanyaan Pengguna *
                              </Label>
                              <Input
                                id={`question-${index}`}
                                placeholder="Contoh: Berapa lama proses persetujuan gadai?"
                                value={item.question}
                                onChange={(e) => updateQAItem(index, 'question', e.target.value)}
                                className={formErrors[`qa-${index}-question`] ? 'border-red-500' : ''}
                                required
                              />
                              {formErrors[`qa-${index}-question`] && (
                                <p className="text-sm text-red-600 flex items-center gap-1">
                                  <AlertCircle className="w-4 h-4" />
                                  {formErrors[`qa-${index}-question`]}
                                </p>
                              )}
                            </div>

                            {/* Question Variations */}
                            <div className="space-y-3">
                              <Label htmlFor={`variations-${index}`} className="text-sm font-medium flex items-center gap-2">
                                <Hash className="w-4 h-4 text-purple-600" />
                                Variasi Pertanyaan
                              </Label>
                              <Textarea
                                id={`variations-${index}`}
                                placeholder="Contoh: proses gadai berapa hari?, kapan barang saya disetujui?, approval butuh berapa lama?"
                                value={item.variations}
                                onChange={(e) => updateQAItem(index, 'variations', e.target.value)}
                                rows={3}
                              />
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Info className="w-3 h-3" />
                                Pisahkan variasi pertanyaan dengan koma atau baris baru untuk meningkatkan akurasi bot
                              </p>
                            </div>

                            {/* Answer Section */}
                            <div className="space-y-3">
                              <Label htmlFor={`answer-${index}`} className="text-sm font-medium flex items-center gap-2">
                                <Brain className="w-4 h-4 text-green-600" />
                                Jawaban Bot *
                              </Label>
                              <Textarea
                                id={`answer-${index}`}
                                placeholder="Tulis jawaban yang singkat, jelas, dan langsung untuk pertanyaan tersebut"
                                value={item.answer}
                                onChange={(e) => updateQAItem(index, 'answer', e.target.value)}
                                rows={4}
                                className={formErrors[`qa-${index}-answer`] ? 'border-red-500' : ''}
                                required
                              />
                              {formErrors[`qa-${index}-answer`] && (
                                <p className="text-sm text-red-600 flex items-center gap-1">
                                  <AlertCircle className="w-4 h-4" />
                                  {formErrors[`qa-${index}-answer`]}
                                </p>
                              )}
                            </div>

                            {/* Confidence Level */}
                            <div className="space-y-3">
                              <Label className="text-sm font-medium flex items-center gap-2">
                                <Shield className="w-4 h-4 text-orange-600" />
                                Tingkat Kepercayaan Jawaban
                              </Label>
                              <div className="grid grid-cols-3 gap-2">
                                {confidenceLevels.map((level) => (
                                  <button
                                    key={level.value}
                                    type="button"
                                    onClick={() => updateQAItem(index, 'confidence', level.value)}
                                    className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                                      item.confidence === level.value
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                  >
                                    <div className={`${level.color} font-semibold`}>{level.label}</div>
                                  </button>
                                ))}
                              </div>
                              <p className="text-xs text-gray-500">
                                Pilih tingkat kepercayaan untuk membantu bot memberikan jawaban yang lebih akurat
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        onClick={addQAItem}
                        className="w-full h-12 border-dashed border-2 hover:border-blue-500 hover:bg-blue-50 transition-all"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        + Tambah Q&A Baru
                      </Button>
                    </div>

                    {formErrors.qa && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{formErrors.qa}</AlertDescription>
                      </Alert>
                    )}
                  </TabsContent>

                  {/* Tab 2: Input Knowledge */}
                  <TabsContent value="article" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Editor Teks Kaya */}
                      <div className="lg:col-span-2 space-y-4">
                        <Label htmlFor="content" className="text-sm font-medium">
                          Konten Knowledge *
                        </Label>
                        <Textarea
                          id="content"
                          placeholder="Tulis konten knowledge Anda di sini..."
                          value={formData.content}
                          onChange={(e) => handleInputChange('content', e.target.value)}
                          rows={20}
                          className="font-mono"
                          required
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{charCount} karakter</span>
                          <span>{MAX_CHARS - charCount} tersisa</span>
                        </div>
                      </div>

                      {/* Panel Metadata Samping */}
                      <div className="space-y-4">
                        {/* Chat Testing Interface */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Test Chatbot Response
                          </Label>
                          <div className="border rounded-lg p-3 bg-gray-50">
                            {/* Chat Preview */}
                            <div className="space-y-2 mb-3">
                              {/* User Message */}
                              <div className="flex justify-end">
                                <div className="bg-blue-500 text-white px-2 py-1 rounded-lg max-w-[80%] text-xs">
                                  <p>hallo</p>
                                </div>
                              </div>
                              
                              {/* Bot Response */}
                              <div className="flex justify-start">
                                <div className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg max-w-[80%] text-xs">
                                  <p>Halo! Selamat datang di platform kami. Saya asisten AI yang akan membantu menjawab pertanyaan Anda. Ada yang bisa saya bantu hari ini? 😊</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Test Input */}
                            <div className="space-y-2">
                              <div className="flex gap-1">
                                <Input
                                  placeholder="Ketik pesan test..."
                                  className="flex-1 text-xs h-8"
                                  value={testMessage}
                                  onChange={(e) => setTestMessage(e.target.value)}
                                  onKeyPress={(e) => e.key === 'Enter' && handleTestMessage()}
                                />
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={handleTestMessage}
                                  className="h-8 px-2"
                                >
                                  <Send className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            
                            {/* AI Credits Info */}
                            <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
                              AI credits used: 1
                            </div>
                          </div>
                        </div>

                        {/* Quick Test Messages */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Quick Test Messages
                          </Label>
                          <div className="space-y-2">
                            {['Bagaimana cara menggunakan fitur ini?', 'Apa saja yang tersedia?', 'Bisa tolong jelaskan lebih detail?'].map((msg, index) => (
                              <Button
                                key={index}
                                type="button"
                                variant="outline"
                                size="sm"
                                className="w-full text-xs h-8 justify-start"
                                onClick={() => setTestMessage(msg)}
                              >
                                {msg}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Response Preview */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Response Preview
                          </Label>
                          <div className="border rounded-lg p-3 bg-blue-50">
                            <div className="text-xs text-gray-600 mb-2">
                              <strong>AI Response:</strong>
                            </div>
                            <div className="bg-white p-2 rounded text-xs border">
                              {testMessage ? 
                                generateAIResponse(testMessage, formData.content) : 
                                "Ketik pesan test untuk melihat preview response AI..."
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-8 border-t mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeModal}
                    className="flex-1 h-12"
                    disabled={isSubmitting}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Batal
                  </Button>
                  
                  <div className="flex gap-3 flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleResetSettings}
                      className="h-12"
                      disabled={isSubmitting}
                    >
                      Reset
                    </Button>
                    
                    <Button 
                      type="submit" 
                      className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          {editingArticle ? 'Update Knowledge' : 'Simpan Knowledge'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Submit Error */}
                {formErrors.submit && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{formErrors.submit}</AlertDescription>
                  </Alert>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Knowledge;