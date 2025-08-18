import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Badge,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../ui';
import { 
  MessageSquare,
  Star,
  Clock,
  TrendingUp,
  Trophy,
  Target,
  BarChart3,
  Users,
  Zap,
  Award,
  Timer,
  CheckCircle
} from 'lucide-react';

const AgentDashboard = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('7days');

  // Sample data untuk Agent Performance
  const [agentMetrics] = useState({
    currentActiveChats: 3,
    csat: 4.7,
    aht: '2m 34s',
    totalChatsToday: 12,
    totalChatsThisWeek: 67,
    resolvedChats: 89,
    avgFirstResponseTime: '45s'
  });

  // Sample data untuk Historical Performance
  const [performanceData] = useState({
    '7days': {
      csat: [4.2, 4.5, 4.3, 4.6, 4.8, 4.7, 4.7],
      aht: [180, 165, 150, 145, 160, 154, 150], // in seconds
      chatsHandled: [8, 12, 15, 11, 14, 16, 12],
      labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
    },
    '30days': {
      csat: [4.1, 4.3, 4.2, 4.4, 4.6, 4.5, 4.7],
      aht: [200, 185, 170, 165, 160, 155, 150],
      chatsHandled: [45, 52, 48, 55, 62, 58, 67],
      labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Minggu 5', 'Minggu 6', 'Minggu 7']
    }
  });

  // Sample data untuk Leaderboard
  const [leaderboard] = useState([
    { id: 1, name: 'Sari Dewi', csat: 4.9, chatsHandled: 89, avatar: 'sari.dewi@company.com', isCurrentUser: true },
    { id: 2, name: 'Rina Sari', csat: 4.8, chatsHandled: 82, avatar: 'rina.sari@company.com' },
    { id: 3, name: 'Budi Santoso', csat: 4.6, chatsHandled: 76, avatar: 'budi.santoso@company.com' },
    { id: 4, name: 'Maya Putri', csat: 4.5, chatsHandled: 71, avatar: 'maya.putri@company.com' },
    { id: 5, name: 'Andi Pratama', csat: 4.4, chatsHandled: 68, avatar: 'andi.pratama@company.com' }
  ]);

  const getPerformanceIcon = (metric) => {
    switch (metric) {
      case 'csat':
        return <Star className="w-4 h-4 text-yellow-500" />;
      case 'aht':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'chats':
        return <MessageSquare className="w-4 h-4 text-green-500" />;
      default:
        return <BarChart3 className="w-4 h-4 text-purple-500" />;
    }
  };

  const getCurrentUserRank = () => {
    const currentUserIndex = leaderboard.findIndex(agent => agent.isCurrentUser);
    return currentUserIndex + 1;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
        <p className="text-muted-foreground">
          Hai {user?.name}! Berikut adalah performa kerja dan metrik personal Anda.
        </p>
      </div>

      {/* Key Metrics - Real-time */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Chats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Obrolan Aktif</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agentMetrics.currentActiveChats}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">2 menunggu respon</span>
            </p>
          </CardContent>
        </Card>

        {/* CSAT Score */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skor CSAT Saya</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agentMetrics.csat}/5.0</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.2</span> dari minggu lalu
            </p>
          </CardContent>
        </Card>

        {/* Average Handling Time */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Waktu (AHT)</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agentMetrics.aht}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-15s</span> dari target
            </p>
          </CardContent>
        </Card>

        {/* Chats Today */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chat Hari Ini</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agentMetrics.totalChatsToday}</div>
            <p className="text-xs text-muted-foreground">
              Target: <span className="text-blue-600">15 chat</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Graphs */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Grafik Performa Historis
                </CardTitle>
                <CardDescription>Tren metrik CSAT dan AHT Anda</CardDescription>
              </div>
              <Tabs value={timeRange} onValueChange={setTimeRange}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="7days">7 Hari</TabsTrigger>
                  <TabsTrigger value="30days">30 Hari</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* CSAT Trend */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">CSAT Score</span>
                </div>
                <div className="h-16 flex items-end justify-between gap-1">
                  {performanceData[timeRange].csat.map((score, index) => (
                    <div
                      key={index}
                      className="bg-yellow-200 rounded-t flex-1"
                      style={{ height: `${(score / 5) * 100}%` }}
                      title={`${performanceData[timeRange].labels[index]}: ${score}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  {performanceData[timeRange].labels.map((label, index) => (
                    <span key={index}>{label}</span>
                  ))}
                </div>
              </div>

              {/* AHT Trend */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Average Handling Time</span>
                </div>
                <div className="h-16 flex items-end justify-between gap-1">
                  {performanceData[timeRange].aht.map((time, index) => {
                    const maxTime = Math.max(...performanceData[timeRange].aht);
                    return (
                      <div
                        key={index}
                        className="bg-blue-200 rounded-t flex-1"
                        style={{ height: `${(time / maxTime) * 100}%` }}
                        title={`${performanceData[timeRange].labels[index]}: ${formatTime(time)}`}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  {performanceData[timeRange].labels.map((label, index) => (
                    <span key={index}>{label}</span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Leaderboard Tim
            </CardTitle>
            <CardDescription>Peringkat berdasarkan CSAT Score minggu ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((agent, index) => (
                <div
                  key={agent.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    agent.isCurrentUser 
                      ? 'bg-gradient-to-r from-green-50 to-blue-50 border border-green-200' 
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                    index === 1 ? 'bg-gray-100 text-gray-700' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${agent.isCurrentUser ? 'text-green-700' : ''}`}>
                        {agent.name}
                      </span>
                      {agent.isCurrentUser && (
                        <Badge variant="outline" className="text-xs">You</Badge>
                      )}
                      {index < 3 && (
                        <Award className={`w-4 h-4 ${
                          index === 0 ? 'text-yellow-500' :
                          index === 1 ? 'text-gray-500' :
                          'text-orange-500'
                        }`} />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {agent.chatsHandled} chats • CSAT {agent.csat}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">{agent.csat}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {getCurrentUserRank() > 5 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    Peringkat Anda: #{getCurrentUserRank()}
                  </span>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  Tingkatkan CSAT untuk naik peringkat!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Produktivitas Minggu Ini</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Chat</span>
              <span className="font-medium">{agentMetrics.totalChatsThisWeek}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Chat Selesai</span>
              <span className="font-medium">{agentMetrics.resolvedChats}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">First Response</span>
              <span className="font-medium">{agentMetrics.avgFirstResponseTime}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Target & Achievement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Chat Harian</span>
                <span className="text-sm">{agentMetrics.totalChatsToday}/15</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{width: `${(agentMetrics.totalChatsToday / 15) * 100}%`}}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">CSAT Target</span>
                <span className="text-sm">{agentMetrics.csat}/4.5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{width: `${(agentMetrics.csat / 4.5) * 100}%`}}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              Buka Inbox
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              Update Profile
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <BarChart3 className="w-4 h-4 mr-2" />
              Performance Detail
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentDashboard;
