import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Badge,
  Button,
  Progress,
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
  TrendingUp,
  TrendingDown,
  Target,
  Star,
  Users,
  BarChart3,
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Activity,
  Bell,
  Award,
  Zap,
  Timer,
  MessageCircle,
  ThumbsUp,
  Coffee
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const AgentDashboard = () => {
  const [timeFrame, setTimeFrame] = useState('7d');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data untuk agent performance
  const [agentMetrics, setAgentMetrics] = useState({
    realtime: {
      activeChats: 5,
      pendingChats: 2,
      avgResponseTime: '2.3 menit',
      currentCSAT: 4.7,
      todayResolved: 12,
      onlineTime: '6h 45m'
    },
    goals: {
      monthly: {
        targetCSAT: 4.5,
        currentCSAT: 4.7,
        targetResolutions: 100,
        currentResolutions: 78,
        targetAHT: '5 menit',
        currentAHT: '4.2 menit'
      }
    },
    followUps: [
      {
        id: 1,
        customer: 'PT Maju Jaya',
        issue: 'Masalah integrasi API',
        priority: 'high',
        dueDate: '2024-01-26T14:00:00Z',
        tags: ['technical', 'api']
      },
      {
        id: 2,
        customer: 'CV Digital Solution',
        issue: 'Follow-up training user',
        priority: 'medium',
        dueDate: '2024-01-27T10:00:00Z',
        tags: ['training', 'onboarding']
      },
      {
        id: 3,
        customer: 'StartupXYZ',
        issue: 'Konfirmasi upgrade plan',
        priority: 'low',
        dueDate: '2024-01-28T16:00:00Z',
        tags: ['sales', 'upgrade']
      }
    ]
  });

  // Mock data untuk trend performance
  const [performanceTrend, setPerformanceTrend] = useState([
    { date: '19 Jan', csat: 4.2, aht: 5.1, resolved: 8 },
    { date: '20 Jan', csat: 4.4, aht: 4.8, resolved: 12 },
    { date: '21 Jan', csat: 4.3, aht: 5.2, resolved: 9 },
    { date: '22 Jan', csat: 4.6, aht: 4.5, resolved: 15 },
    { date: '23 Jan', csat: 4.5, aht: 4.7, resolved: 11 },
    { date: '24 Jan', csat: 4.8, aht: 4.2, resolved: 14 },
    { date: '25 Jan', csat: 4.7, aht: 4.3, resolved: 12 }
  ]);

  // Mock data untuk achievements
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: 'Customer Hero',
      description: 'Mencapai CSAT 4.5+ selama 7 hari berturut-turut',
      icon: Award,
      unlocked: true,
      unlockedDate: '2024-01-20'
    },
    {
      id: 2,
      title: 'Speed Master',
      description: 'Average Handle Time di bawah 5 menit',
      icon: Zap,
      unlocked: true,
      unlockedDate: '2024-01-22'
    },
    {
      id: 3,
      title: 'Resolution Expert',
      description: 'Menyelesaikan 50+ chat dalam sebulan',
      icon: Target,
      unlocked: false,
      progress: 78
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getMetricTrend = (current, previous) => {
    if (current > previous) return { icon: TrendingUp, color: 'text-green-500', direction: 'up' };
    if (current < previous) return { icon: TrendingDown, color: 'text-red-500', direction: 'down' };
    return { icon: Minus, color: 'text-gray-500', direction: 'stable' };
  };

  const getPriorityBadge = (priority) => {
    const config = {
      high: { color: 'red', label: 'High' },
      medium: { color: 'yellow', label: 'Medium' },
      low: { color: 'green', label: 'Low' }
    };
    const priorityConfig = config[priority] || config.medium;
    return <Badge variant={priorityConfig.color}>{priorityConfig.label}</Badge>;
  };

  const formatTimeRemaining = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;
    
    if (diff < 0) return 'Overdue';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header dengan Real-time Status */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Online sejam {agentMetrics.realtime.onlineTime}</span>
            </div>
            <div className="text-sm text-gray-500">
              {currentTime.toLocaleTimeString('id-ID')} WIB
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            {timeFrame === '7d' ? '7 Hari' : '30 Hari'}
          </Button>
          <Button variant="outline" size="sm">
            <Coffee className="w-4 h-4 mr-2" />
            Break
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-6 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Obrolan Aktif</p>
                <p className="text-3xl font-bold text-blue-600">{agentMetrics.realtime.activeChats}</p>
                <p className="text-xs text-gray-500">+{agentMetrics.realtime.pendingChats} pending</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CSAT Saya</p>
                <div className="flex items-center space-x-1">
                  <p className="text-3xl font-bold text-yellow-600">{agentMetrics.realtime.currentCSAT}</p>
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </div>
                <p className="text-xs text-green-600">+0.2 dari kemarin</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <ThumbsUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Handle Time</p>
                <p className="text-3xl font-bold text-green-600">{agentMetrics.goals.monthly.currentAHT}</p>
                <p className="text-xs text-green-600">Target: {agentMetrics.goals.monthly.targetAHT}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Timer className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved Hari Ini</p>
                <p className="text-3xl font-bold text-purple-600">{agentMetrics.realtime.todayResolved}</p>
                <p className="text-xs text-purple-600">Target: 15/hari</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Response Time</p>
                <p className="text-3xl font-bold text-indigo-600">{agentMetrics.realtime.avgResponseTime}</p>
                <p className="text-xs text-indigo-600">Avg minggu ini</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Clock className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Follow-ups</p>
                <p className="text-3xl font-bold text-orange-600">{agentMetrics.followUps.length}</p>
                <p className="text-xs text-orange-600">Perlu ditindaklanjuti</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends & Goals */}
      <div className="grid grid-cols-2 gap-6">
        {/* Performance Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Trend Performa</span>
            </CardTitle>
            <CardDescription>CSAT dan AHT 7 hari terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" domain={[4, 5]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 8]} />
                  <Tooltip />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="csat" 
                    stroke="#fbbf24" 
                    strokeWidth={3}
                    name="CSAT"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="aht" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="AHT (min)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Target Bulanan</span>
            </CardTitle>
            <CardDescription>Progress pencapaian target Januari 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">CSAT Target</span>
                <span className="text-sm text-gray-600">
                  {agentMetrics.goals.monthly.currentCSAT}/{agentMetrics.goals.monthly.targetCSAT}
                </span>
              </div>
              <Progress 
                value={(agentMetrics.goals.monthly.currentCSAT / agentMetrics.goals.monthly.targetCSAT) * 100} 
                className="h-3"
              />
              <p className="text-xs text-green-600 mt-1">
                +{((agentMetrics.goals.monthly.currentCSAT / agentMetrics.goals.monthly.targetCSAT) * 100 - 100).toFixed(1)}% dari target
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Resolusi</span>
                <span className="text-sm text-gray-600">
                  {agentMetrics.goals.monthly.currentResolutions}/{agentMetrics.goals.monthly.targetResolutions}
                </span>
              </div>
              <Progress 
                value={(agentMetrics.goals.monthly.currentResolutions / agentMetrics.goals.monthly.targetResolutions) * 100} 
                className="h-3"
              />
              <p className="text-xs text-blue-600 mt-1">
                78% tercapai • 22 lagi untuk target
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Average Handle Time</span>
                <span className="text-sm text-green-600">
                  {agentMetrics.goals.monthly.currentAHT} (Target: {agentMetrics.goals.monthly.targetAHT})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">Target tercapai!</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Follow-ups & Achievements */}
      <div className="grid grid-cols-3 gap-6">
        {/* Follow-up Tasks */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>Daftar Follow-up</span>
              </div>
              <Badge variant="blue">{agentMetrics.followUps.length} aktif</Badge>
            </CardTitle>
            <CardDescription>Pelanggan yang perlu ditindaklanjuti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {agentMetrics.followUps.map((followUp) => (
                <div key={followUp.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900">{followUp.customer}</h4>
                      {getPriorityBadge(followUp.priority)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatTimeRemaining(followUp.dueDate)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{followUp.issue}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {followUp.tags.map((tag) => (
                        <Badge key={tag} variant="gray" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="outline">
                      Tindak Lanjut
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Pencapaian</span>
            </CardTitle>
            <CardDescription>Badge dan milestone Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={`p-3 border rounded-lg ${
                achievement.unlocked ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg ${
                    achievement.unlocked ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    <achievement.icon className={`w-4 h-4 ${
                      achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium text-sm ${
                      achievement.unlocked ? 'text-yellow-800' : 'text-gray-600'
                    }`}>
                      {achievement.title}
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                
                {achievement.unlocked ? (
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">
                      Unlocked {new Date(achievement.unlockedDate).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                ) : (
                  <div>
                    <Progress value={achievement.progress} className="h-2 mb-1" />
                    <span className="text-xs text-gray-500">{achievement.progress}% complete</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Aksi cepat untuk meningkatkan produktivitas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <MessageCircle className="w-6 h-6 mb-2" />
              <span className="text-sm">Buka Inbox</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="w-6 h-6 mb-2" />
              <span className="text-sm">Cari Customer</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Activity className="w-6 h-6 mb-2" />
              <span className="text-sm">Knowledge Base</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="w-6 h-6 mb-2" />
              <span className="text-sm">Jadwal Follow-up</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="w-6 h-6 mb-2" />
              <span className="text-sm">Lihat Laporan</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentDashboard;