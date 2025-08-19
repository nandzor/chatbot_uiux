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
  TabsTrigger
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
  Hash
} from 'lucide-react';
import { knowledgeArticles } from '@/data/sampleData';

const Knowledge = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState(knowledgeArticles.filter(article => article.status !== 'deleted'));
  const [isCreating, setIsCreating] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [activeTab, setActiveTab] = useState('qa');
  
  // Form data untuk dual mode
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    tags: '',
    language: 'id',
    qaItems: [
      {
        question: '',
        variations: '',
        answer: ''
      }
    ]
  });
  
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 7000;

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
    setArticles(prevArticles => {
      const targetArticle = prevArticles.find(article => article.id === id);
      const currentActiveArticle = prevArticles.find(article => article.status === 'active');
      
      if (targetArticle.status === 'active') {
        // Jika knowledge sedang aktif, nonaktifkan
        return prevArticles.map(article =>
          article.id === id
            ? { ...article, status: 'inactive' }
            : article
        );
      } else {
        // Jika knowledge inactive, konfirmasi jika ada knowledge aktif lain
        if (currentActiveArticle && currentActiveArticle.id !== id) {
          const confirmed = window.confirm(
            `Mengaktifkan "${targetArticle.title}" akan menonaktifkan "${currentActiveArticle.title}". Lanjutkan?`
          );
          if (!confirmed) return prevArticles;
        }
        
        // Aktifkan knowledge target dan nonaktifkan yang lain
        return prevArticles.map(article =>
          article.id === id
            ? { ...article, status: 'active' }
            : { ...article, status: 'inactive' }
        );
      }
    });
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

  // Fungsi untuk handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Judul knowledge wajib diisi!');
      return;
    }

    if (activeTab === 'qa') {
      // Validasi Q&A mode
      const hasValidQA = formData.qaItems.some(item => 
        item.question.trim() && item.answer.trim()
      );
      
      if (!hasValidQA) {
        alert('Minimal satu Q&A harus diisi dengan lengkap!');
        return;
      }
    } else {
      // Validasi Article mode
      if (!formData.content.trim()) {
        alert('Konten knowledge wajib diisi!');
        return;
      }
    }

    // Prepare data untuk disimpan
    const articleData = {
      id: editingArticle ? editingArticle.id : Date.now().toString(),
      title: formData.title,
      content: activeTab === 'qa' ? '' : formData.content,
      summary: formData.summary,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      language: formData.language,
      metadata: activeTab === 'qa' ? {
        type: 'qa',
        qaItems: formData.qaItems.filter(item => 
          item.question.trim() && item.answer.trim()
        )
      } : {
        type: 'article',
        wordCount: formData.content.split(' ').length
      },
      status: 'inactive',
      created_at: editingArticle ? editingArticle.created_at : new Date().toISOString(),
      updated_at: new Date().toISOString()
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
  };

  // Fungsi untuk reset form
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      summary: '',
      tags: '',
      language: 'id',
      qaItems: [{ question: '', variations: '', answer: '' }]
    });
    setCharCount(0);
    setActiveTab('qa');
  };

  // Fungsi untuk edit article
  const handleEdit = (article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content || '',
      summary: article.summary || '',
      tags: article.tags ? article.tags.join(', ') : '',
      language: article.language || 'id',
      qaItems: article.metadata?.type === 'qa' ? 
        article.metadata.qaItems : 
        [{ question: '', variations: '', answer: '' }]
    });
    setActiveTab(article.metadata?.type === 'qa' ? 'qa' : 'article');
    setCharCount(article.content ? article.content.length : 0);
    setIsCreating(true);
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
                      {new Date(article.created_at).toLocaleDateString('id-ID')}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingArticle ? 'Edit Knowledge' : 'Tambah Knowledge Baru'}
                </h2>
                <Button variant="ghost" size="sm" onClick={closeModal}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Judul Knowledge */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Judul Knowledge *
                  </Label>
                  <Input
                    id="title"
                    placeholder="Contoh: Pertanyaan Seputar Gadai Emas, Panduan Lengkap Pembayaran Cicilan"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

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
                        <Card key={index}>
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-lg">Q&A #{index + 1}</CardTitle>
                              {formData.qaItems.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeQAItem(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Pertanyaan Pengguna */}
                            <div className="space-y-2">
                              <Label htmlFor={`question-${index}`} className="text-sm font-medium">
                                Pertanyaan Pengguna *
                              </Label>
                              <Input
                                id={`question-${index}`}
                                placeholder="Contoh: Berapa lama proses persetujuan gadai?"
                                value={item.question}
                                onChange={(e) => updateQAItem(index, 'question', e.target.value)}
                                required
                              />
                            </div>

                            {/* Variasi Pertanyaan */}
                            <div className="space-y-2">
                              <Label htmlFor={`variations-${index}`} className="text-sm font-medium">
                                Variasi Pertanyaan
                              </Label>
                              <Textarea
                                id={`variations-${index}`}
                                placeholder="Contoh: proses gadai berapa hari?, kapan barang saya disetujui?, approval butuh berapa lama?"
                                value={item.variations}
                                onChange={(e) => updateQAItem(index, 'variations', e.target.value)}
                                rows={3}
                              />
                              <p className="text-xs text-gray-500">
                                Pisahkan variasi pertanyaan dengan koma atau baris baru
                              </p>
                            </div>

                            {/* Jawaban Bot */}
                            <div className="space-y-2">
                              <Label htmlFor={`answer-${index}`} className="text-sm font-medium">
                                Jawaban Bot *
                              </Label>
                              <Textarea
                                id={`answer-${index}`}
                                placeholder="Tulis jawaban yang singkat dan langsung untuk pertanyaan tersebut"
                                value={item.answer}
                                onChange={(e) => updateQAItem(index, 'answer', e.target.value)}
                                rows={4}
                                required
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        onClick={addQAItem}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        + Tambah Q&A
                      </Button>
                    </div>
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
                        {/* Ringkasan */}
                        <div className="space-y-2">
                          <Label htmlFor="summary" className="text-sm font-medium">
                            Ringkasan
                          </Label>
                          <Textarea
                            id="summary"
                            placeholder="Ringkasan singkat knowledge..."
                            value={formData.summary}
                            onChange={(e) => handleInputChange('summary', e.target.value)}
                            rows={4}
                          />
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                          <Label htmlFor="tags" className="text-sm font-medium">
                            Tags
                          </Label>
                          <div className="relative">
                            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              id="tags"
                              placeholder="gadai, emas, cicilan, pembayaran"
                              value={formData.tags}
                              onChange={(e) => handleInputChange('tags', e.target.value)}
                              className="pl-10"
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            Pisahkan tags dengan koma
                          </p>
                        </div>

                        {/* Bahasa */}
                        <div className="space-y-2">
                          <Label htmlFor="language" className="text-sm font-medium">
                            Bahasa
                          </Label>
                          <select
                            id="language"
                            value={formData.language}
                            onChange={(e) => handleInputChange('language', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            <option value="id">Bahasa Indonesia</option>
                            <option value="en">English</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t">
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingArticle ? 'Update Knowledge' : 'Simpan Knowledge'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeModal}
                    className="flex-1"
                  >
                    Batal
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Knowledge;