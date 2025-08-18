import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UserAvatar from '../common/UserAvatar';
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
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator
} from '../ui';
import { 
  User,
  Bell,
  MessageSquare,
  Edit,
  Save,
  Upload,
  Plus,
  Trash2,
  Copy,
  Volume2,
  Monitor,
  Smartphone,
  Eye,
  EyeOff
} from 'lucide-react';

const AgentProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState('online');

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '+62 812-3456-7890',
    specialization: user?.specialization || 'Customer Support',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification preferences state
  const [notificationPrefs, setNotificationPrefs] = useState({
    soundNotifications: true,
    desktopNotifications: true,
    emailNotifications: false,
    newMessageSound: true,
    escalationSound: true,
    offlineMessageEmail: true,
    dailySummaryEmail: false,
    weeklyReportEmail: true
  });

  // Canned responses state
  const [cannedResponses, setCannedResponses] = useState([
    {
      id: 1,
      title: 'Greeting Pagi',
      content: 'Selamat pagi! Terima kasih telah menghubungi customer service kami. Ada yang bisa saya bantu?',
      shortcut: '/pagi',
      category: 'Greeting'
    },
    {
      id: 2,
      title: 'Cek Status Pesanan',
      content: 'Saya akan bantu cek status pesanan Anda. Mohon berikan nomor pesanan untuk verifikasi.',
      shortcut: '/status',
      category: 'Orders'
    },
    {
      id: 3,
      title: 'Escalation ke Supervisor',
      content: 'Saya akan eskalasi kasus Anda ke supervisor. Mohon tunggu sebentar, Anda akan dihubungi dalam 5-10 menit.',
      shortcut: '/escalate',
      category: 'Support'
    }
  ]);

  const [newResponse, setNewResponse] = useState({
    title: '',
    content: '',
    shortcut: '',
    category: 'General'
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Logic to update profile
    console.log('Updating profile:', profileForm);
  };

  const handlePasswordChange = () => {
    if (profileForm.newPassword !== profileForm.confirmPassword) {
      alert('Password baru dan konfirmasi tidak cocok');
      return;
    }
    // Logic to change password
    console.log('Changing password');
  };

  const handleNotificationChange = (key, value) => {
    setNotificationPrefs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAddCannedResponse = () => {
    if (!newResponse.title || !newResponse.content) {
      alert('Judul dan konten wajib diisi');
      return;
    }

    const response = {
      ...newResponse,
      id: Date.now(),
      shortcut: newResponse.shortcut || `/${newResponse.title.toLowerCase().replace(/\s+/g, '')}`
    };

    setCannedResponses(prev => [...prev, response]);
    setNewResponse({ title: '', content: '', shortcut: '', category: 'General' });
  };

  const handleDeleteCannedResponse = (id) => {
    setCannedResponses(prev => prev.filter(r => r.id !== id));
  };

  const handleCopyCannedResponse = (content) => {
    navigator.clipboard.writeText(content);
    // Show toast notification
    console.log('Copied to clipboard:', content);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'text-green-600 bg-green-100';
      case 'busy':
        return 'text-yellow-600 bg-yellow-100';
      case 'offline':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Profile & Settings</h1>
          <p className="text-muted-foreground">Kelola akun, preferensi, dan status kerja Anda</p>
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="availability">Status:</Label>
          <Select value={availabilityStatus} onValueChange={setAvailabilityStatus}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Online
                </div>
              </SelectItem>
              <SelectItem value="busy">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  Busy
                </div>
              </SelectItem>
              <SelectItem value="offline">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-500" />
                  Offline
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
          <TabsTrigger value="templates">Canned Responses</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <UserAvatar user={user} size="xl" />
                <div>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Profile Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profileForm.fullName}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, fullName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Select 
                        value={profileForm.specialization}
                        onValueChange={(value) => setProfileForm(prev => ({ ...prev, specialization: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Customer Support">Customer Support</SelectItem>
                          <SelectItem value="Technical Support">Technical Support</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Billing">Billing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button type="submit">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Password Change */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={profileForm.currentPassword}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={profileForm.newPassword}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={profileForm.confirmPassword}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>
              </div>
              <Button onClick={handlePasswordChange} className="mt-4">
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sound Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  Sound Notifications
                </CardTitle>
                <CardDescription>Configure audio alerts for different events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="soundNotifications">Enable Sound Notifications</Label>
                    <p className="text-sm text-muted-foreground">General sound alerts</p>
                  </div>
                  <Switch
                    id="soundNotifications"
                    checked={notificationPrefs.soundNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('soundNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newMessageSound">New Message Sound</Label>
                    <p className="text-sm text-muted-foreground">Play sound for new messages</p>
                  </div>
                  <Switch
                    id="newMessageSound"
                    checked={notificationPrefs.newMessageSound}
                    onCheckedChange={(checked) => handleNotificationChange('newMessageSound', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="escalationSound">Escalation Alert</Label>
                    <p className="text-sm text-muted-foreground">Alert for urgent escalations</p>
                  </div>
                  <Switch
                    id="escalationSound"
                    checked={notificationPrefs.escalationSound}
                    onCheckedChange={(checked) => handleNotificationChange('escalationSound', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Desktop Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Desktop Notifications
                </CardTitle>
                <CardDescription>Configure browser and system notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="desktopNotifications">Enable Desktop Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show browser notifications</p>
                  </div>
                  <Switch
                    id="desktopNotifications"
                    checked={notificationPrefs.desktopNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('desktopNotifications', checked)}
                  />
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <Bell className="w-4 h-4 inline mr-1" />
                    Browser permission required for desktop notifications. 
                    <Button variant="link" className="text-blue-700 p-0 h-auto">
                      Enable now
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Email Notifications */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Email Notifications
                </CardTitle>
                <CardDescription>Configure email alerts and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">General Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive email for important events</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={notificationPrefs.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="offlineMessageEmail">Offline Messages</Label>
                        <p className="text-sm text-muted-foreground">Email when you receive messages while offline</p>
                      </div>
                      <Switch
                        id="offlineMessageEmail"
                        checked={notificationPrefs.offlineMessageEmail}
                        onCheckedChange={(checked) => handleNotificationChange('offlineMessageEmail', checked)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dailySummaryEmail">Daily Summary</Label>
                        <p className="text-sm text-muted-foreground">Daily performance summary</p>
                      </div>
                      <Switch
                        id="dailySummaryEmail"
                        checked={notificationPrefs.dailySummaryEmail}
                        onCheckedChange={(checked) => handleNotificationChange('dailySummaryEmail', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="weeklyReportEmail">Weekly Report</Label>
                        <p className="text-sm text-muted-foreground">Weekly performance report</p>
                      </div>
                      <Switch
                        id="weeklyReportEmail"
                        checked={notificationPrefs.weeklyReportEmail}
                        onCheckedChange={(checked) => handleNotificationChange('weeklyReportEmail', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Canned Responses Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add New Response */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Template
                </CardTitle>
                <CardDescription>Create reusable response templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Template Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Morning Greeting"
                    value={newResponse.title}
                    onChange={(e) => setNewResponse(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter your response template..."
                    value={newResponse.content}
                    onChange={(e) => setNewResponse(prev => ({ ...prev, content: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shortcut">Shortcut</Label>
                    <Input
                      id="shortcut"
                      placeholder="/greeting"
                      value={newResponse.shortcut}
                      onChange={(e) => setNewResponse(prev => ({ ...prev, shortcut: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newResponse.category}
                      onValueChange={(value) => setNewResponse(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Greeting">Greeting</SelectItem>
                        <SelectItem value="Orders">Orders</SelectItem>
                        <SelectItem value="Support">Support</SelectItem>
                        <SelectItem value="Billing">Billing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleAddCannedResponse} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Template
                </Button>
              </CardContent>
            </Card>

            {/* Templates List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  My Templates
                </CardTitle>
                <CardDescription>Manage your canned responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {cannedResponses.map((response) => (
                    <div key={response.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-sm">{response.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{response.category}</Badge>
                            <code className="text-xs bg-muted px-1 rounded">{response.shortcut}</code>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyCannedResponse(response.content)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCannedResponse(response.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {response.content}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentProfile;
