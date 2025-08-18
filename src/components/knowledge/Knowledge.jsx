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
  AlertDescription
} from '../ui';
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
  Info
} from 'lucide-react';
import { knowledgeArticles } from '../../data/sampleData';

const Knowledge = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState(knowledgeArticles.filter(article => article.status !== 'deleted'));
  const [isCreating, setIsCreating] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });
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
        // Jika artikel sedang aktif, nonaktifkan
        return prevArticles.map(article =>
          article.id === id
            ? { ...article, status: 'inactive' }
            : article
        );
      } else {
        // Jika artikel inactive, konfirmasi jika ada artikel aktif lain
        if (currentActiveArticle && currentActiveArticle.id !== id) {
          const confirmed = window.confirm(
            `Mengaktifkan "${targetArticle.title}" akan menonaktifkan "${currentActiveArticle.title}". Lanjutkan?`
          );
          if (!confirmed) return prevArticles;
        }
        
        // Aktifkan artikel target dan nonaktifkan yang lain
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
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      setArticles(prevArticles =>
        prevArticles.map(article =>
          article.id === id
            ? { ...article, status: 'deleted' }
            : article
        ).filter(article => article.status !== 'deleted')
      );
    }
  };

  // Fungsi untuk handle perubahan content dengan batasan karakter
  const handleContentChange = (e) => {
    const content = e.target.value;
    if (content.length <= MAX_CHARS) {
      setFormData(prev => ({ ...prev, content }));
      setCharCount(content.length);
    }
  };

  // Fungsi untuk membuka form create
  const handleCreate = () => {
    setFormData({ title: '', content: '' });
    setCharCount(0);
    setIsCreating(true);
    setEditingArticle(null);
  };

  // Fungsi untuk membuka form edit
  const handleEdit = (article) => {
    setFormData({ title: article.title, content: article.content });
    setCharCount(article.content.length);
    setEditingArticle(article);
    setIsCreating(false);
  };

  // Fungsi untuk save article (create atau update)
  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Judul dan konten tidak boleh kosong!');
      return;
    }

    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if (isCreating) {
      // Create new article
      const newArticle = {
        id: Date.now(),
        title: formData.title.trim(),
        content: formData.content.trim(),
        status: 'active',
        updated_at: currentDate
      };
      setArticles(prev => [...prev, newArticle]);
    } else {
      // Update existing article
      setArticles(prevArticles =>
        prevArticles.map(article =>
          article.id === editingArticle.id
            ? { 
                ...article, 
                title: formData.title.trim(), 
                content: formData.content.trim(),
                updated_at: currentDate
              }
            : article
        )
      );
    }

    // Reset form
    setFormData({ title: '', content: '' });
    setCharCount(0);
    setIsCreating(false);
    setEditingArticle(null);
  };

  // Fungsi untuk cancel form
  const handleCancel = () => {
    setFormData({ title: '', content: '' });
    setCharCount(0);
    setIsCreating(false);
    setEditingArticle(null);
  };

  // Fungsi untuk truncate content preview
  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  // Fungsi untuk format tanggal
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Knowledge Base Management</h2>
          <p className="text-muted-foreground">
            Kelola semua entri pengetahuan untuk chatbot Anda
            {activeArticle && (
              <span className="ml-2 text-primary font-medium">
                • Aktif: "{activeArticle.title}"
              </span>
            )}
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Pengetahuan Baru
        </Button>
      </div>

      {/* Info Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Kebijakan Aktivasi:</strong> Hanya 1 artikel yang dapat aktif dalam satu waktu. 
          Mengaktifkan artikel baru akan otomatis menonaktifkan artikel lain. 
          Artikel aktif akan digunakan oleh chatbot untuk menjawab pertanyaan pelanggan.
        </AlertDescription>
      </Alert>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Cari berdasarkan judul atau konten..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Main Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Daftar Knowledge Articles ({filteredArticles.length})
          </CardTitle>
          <CardDescription>
            Semua entri pengetahuan yang tersimpan dalam sistem. Gunakan toggle untuk mengaktifkan/nonaktifkan artikel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25%]">Judul</TableHead>
                <TableHead className="w-[35%]">Ringkasan Konten</TableHead>
                <TableHead className="w-[12%]">Status</TableHead>
                <TableHead className="w-[18%]">Terakhir Diperbarui</TableHead>
                <TableHead className="w-[10%]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    {searchTerm ? 'Tidak ada artikel yang cocok dengan pencarian.' : 'Belum ada artikel. Tambahkan artikel pertama Anda!'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredArticles.map(article => (
                  <TableRow 
                    key={article.id}
                    className={article.status === 'active' ? 'bg-primary/5 border-primary/20' : ''}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {article.status === 'active' && (
                          <Crown className="w-4 h-4 text-primary" />
                        )}
                        {article.title}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {truncateContent(article.content)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={article.status === 'active'}
                          onCheckedChange={() => toggleStatus(article.id)}
                        />
                        <Badge 
                          variant={article.status === 'active' ? 'default' : 'secondary'}
                          className={article.status === 'active' ? 'bg-primary text-primary-foreground' : ''}
                        >
                          {article.status === 'active' ? (
                            <div className="flex items-center gap-1">
                              <Crown className="w-3 h-3" />
                              Aktif
                            </div>
                          ) : (
                            'Nonaktif'
                          )}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(article.updated_at)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(article)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(article.id)}
                          disabled={article.status === 'active'}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Form Modal */}
      {(isCreating || editingArticle) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {isCreating ? 'Tambah Pengetahuan Baru' : 'Edit Artikel'}
                </span>
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                {isCreating 
                  ? 'Buat artikel baru untuk knowledge base chatbot' 
                  : 'Perbarui informasi artikel yang ada'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Alert untuk informasi batasan karakter */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Konten artikel dibatasi maksimal {MAX_CHARS.toLocaleString()} karakter untuk memastikan performa optimal chatbot.
                </AlertDescription>
              </Alert>

              {/* Field Judul */}
              <div className="space-y-2">
                <Label htmlFor="title">Judul Artikel</Label>
                <Input 
                  id="title"
                  placeholder="Masukkan judul artikel..."
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              {/* Rich Text Editor dengan Character Counter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content">Konten Artikel</Label>
                  <span className={`text-sm ${charCount > MAX_CHARS * 0.9 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} karakter
                  </span>
                </div>
                <Textarea 
                  id="content"
                  placeholder="Tulis konten artikel di sini..."
                  value={formData.content}
                  onChange={handleContentChange}
                  rows={15}
                  className="resize-none"
                />
                {/* Progress bar untuk character count */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      charCount > MAX_CHARS * 0.9 ? 'bg-destructive' : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min((charCount / MAX_CHARS) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={handleCancel}>
                  Batal
                </Button>
                <Button onClick={handleSave} disabled={!formData.title.trim() || !formData.content.trim()}>
                  <Save className="w-4 h-4 mr-2" />
                  {isCreating ? 'Simpan Artikel' : 'Update Artikel'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Knowledge;