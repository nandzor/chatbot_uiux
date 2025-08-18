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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../ui';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Eye, 
  BookOpen, 
  Tag, 
  Calendar,
  ThumbsUp,
  MessageSquare,
  FileText,
  FolderTree
} from 'lucide-react';
import { knowledgeArticles } from '../../data/sampleData';

const Knowledge = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  const categories = ['all', 'Basics', 'Operations', 'Policies', 'Account', 'Support'];
  const tags = ['onboarding', 'setup', 'refund', 'payment', 'shipping', 'delivery', 'profile', 'settings', 'troubleshoot', 'issues'];

  const filteredArticles = knowledgeArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'published': return 'default';
      case 'draft': return 'secondary';
      case 'archived': return 'outline';
      default: return 'secondary';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Basics': return <BookOpen className="w-4 h-4" />;
      case 'Operations': return <FileText className="w-4 h-4" />;
      case 'Policies': return <FolderTree className="w-4 h-4" />;
      case 'Account': return <Tag className="w-4 h-4" />;
      case 'Support': return <MessageSquare className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Knowledge Base</h2>
          <p className="text-muted-foreground">Manage and organize your help articles</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Article
        </Button>
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search articles..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Articles Table */}
          <Card>
            <CardHeader>
              <CardTitle>Articles ({filteredArticles.length})</CardTitle>
              <CardDescription>Manage your knowledge base articles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Helpful</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArticles.map(article => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(article.category)}
                          <span>{article.category}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {article.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{article.views.toLocaleString()}</TableCell>
                      <TableCell>{article.helpful.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(article.status)}>
                          {article.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingArticle(article)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Organize articles by categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.filter(cat => cat !== 'all').map(category => (
                  <Card key={category} className="p-4">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(category)}
                      <div className="flex-1">
                        <h4 className="font-medium">{category}</h4>
                        <p className="text-sm text-muted-foreground">
                          {knowledgeArticles.filter(article => article.category === category).length} articles
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
                <Card className="p-4 border-dashed border-2 border-muted-foreground/20 hover:border-muted-foreground/40 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Plus className="w-4 h-4" />
                    <span>Add Category</span>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tags" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>Manage article tags for better organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">
                    {tag}
                    <span className="ml-2 text-xs bg-background px-1.5 py-0.5 rounded-full">
                      {knowledgeArticles.filter(article => article.tags.includes(tag)).length}
                    </span>
                  </Badge>
                ))}
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tag
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create/Edit Article Modal */}
      {(isCreating || editingArticle) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {isCreating ? 'Create New Article' : 'Edit Article'}
              </CardTitle>
              <CardDescription>
                {isCreating ? 'Add a new article to your knowledge base' : 'Update article information'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  placeholder="Article title"
                  defaultValue={editingArticle?.title}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={editingArticle?.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== 'all').map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Article content..."
                  rows={8}
                  defaultValue={editingArticle?.content}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input 
                  id="tags" 
                  placeholder="Enter tags separated by commas"
                  defaultValue={editingArticle?.tags?.join(', ')}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsCreating(false);
                    setEditingArticle(null);
                  }}
                >
                  Cancel
                </Button>
                <Button>
                  {isCreating ? 'Create Article' : 'Update Article'}
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
