
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock,
  Target,
  Activity,
  Calendar,
  Award
} from "lucide-react";
import { AdminNavigation } from "@/components/AdminNavigation";

const monthlyStats = [
  { month: '1月', cases: 12, revenue: 360000, satisfaction: 4.8 },
  { month: '2月', cases: 15, revenue: 450000, satisfaction: 4.9 },
  { month: '3月', cases: 18, revenue: 540000, satisfaction: 4.7 },
  { month: '4月', cases: 22, revenue: 660000, satisfaction: 4.8 },
  { month: '5月', cases: 25, revenue: 750000, satisfaction: 4.9 },
  { month: '6月', cases: 20, revenue: 600000, satisfaction: 4.8 },
];

const successRateData = [
  { name: '成功', value: 95, color: '#10B981' },
  { name: '部分成功', value: 4, color: '#F59E0B' },
  { name: '失敗', value: 1, color: '#EF4444' },
];

const aiUsageData = [
  { day: '月', calls: 45, messages: 120 },
  { day: '火', calls: 52, messages: 134 },
  { day: '水', calls: 48, messages: 128 },
  { day: '木', calls: 61, messages: 145 },
  { day: '金', calls: 55, messages: 139 },
  { day: '土', calls: 38, messages: 89 },
  { day: '日', calls: 42, messages: 95 },
];

export default function AdminAnalytics() {
  return (
    <div className="min-h-screen bg-admin-background font-body">
      <AdminNavigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-heading text-admin-text">分析レポート</h1>
          <p className="text-admin-text-secondary">サービスの実績と分析データ</p>
        </div>

        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">月間売上</CardTitle>
              <DollarSign className="h-4 w-4 text-admin-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">¥600,000</div>
              <p className="text-xs text-admin-text-secondary">
                <span className="text-green-400">+8.2%</span> 前月比
              </p>
            </CardContent>
          </Card>

          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">成功率</CardTitle>
              <Target className="h-4 w-4 text-admin-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">95.2%</div>
              <p className="text-xs text-admin-text-secondary">
                業界トップクラス
              </p>
            </CardContent>
          </Card>

          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">平均処理時間</CardTitle>
              <Clock className="h-4 w-4 text-admin-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">3.2日</div>
              <p className="text-xs text-admin-text-secondary">
                <span className="text-green-400">-0.5日</span> 短縮
              </p>
            </CardContent>
          </Card>

          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">顧客満足度</CardTitle>
              <Award className="h-4 w-4 text-admin-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">4.8/5</div>
              <p className="text-xs text-admin-text-secondary">
                高評価維持中
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader>
              <CardTitle className="text-admin-text">月次業績推移</CardTitle>
              <CardDescription className="text-admin-text-secondary">案件数と売上の推移</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#D1D5DB" />
                  <YAxis stroke="#D1D5DB" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#374151', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cases" 
                    stroke="#6366F1" 
                    fill="#6366F1" 
                    fillOpacity={0.3}
                    name="案件数"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader>
              <CardTitle className="text-admin-text">成功率分析</CardTitle>
              <CardDescription className="text-admin-text-secondary">案件の結果別割合</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={successRateData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {successRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#374151', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader>
              <CardTitle className="text-admin-text">AIエージェント利用統計</CardTitle>
              <CardDescription className="text-admin-text-secondary">週間のAI利用状況</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={aiUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#D1D5DB" />
                  <YAxis stroke="#D1D5DB" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#374151', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Bar dataKey="calls" fill="#6366F1" name="AI通話" />
                  <Bar dataKey="messages" fill="#8B5CF6" name="AIメッセージ" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader>
              <CardTitle className="text-admin-text">顧客満足度推移</CardTitle>
              <CardDescription className="text-admin-text-secondary">月別の満足度スコア</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#D1D5DB" />
                  <YAxis domain={[4.5, 5]} stroke="#D1D5DB" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#374151', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                    formatter={(value) => [`${value}/5`, '満足度']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="satisfaction" 
                    stroke="#F59E0B" 
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader>
              <CardTitle className="text-admin-text flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-admin-primary" />
                <span>今月の実績</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-admin-text-secondary">処理案件</span>
                <span className="text-admin-text font-medium">20件</span>
              </div>
              <div className="flex justify-between">
                <span className="text-admin-text-secondary">平均処理日数</span>
                <span className="text-admin-text font-medium">3.2日</span>
              </div>
              <div className="flex justify-between">
                <span className="text-admin-text-secondary">成功率</span>
                <Badge className="bg-green-900 text-green-200">95%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader>
              <CardTitle className="text-admin-text flex items-center space-x-2">
                <Users className="h-5 w-5 text-admin-secondary" />
                <span>顧客分析</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-admin-text-secondary">新規顧客</span>
                <span className="text-admin-text font-medium">18人</span>
              </div>
              <div className="flex justify-between">
                <span className="text-admin-text-secondary">リピート率</span>
                <span className="text-admin-text font-medium">8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-admin-text-secondary">推奨度</span>
                <Badge className="bg-admin-primary/20 text-admin-primary">9.2/10</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader>
              <CardTitle className="text-admin-text flex items-center space-x-2">
                <Activity className="h-5 w-5 text-admin-accent" />
                <span>システム稼働</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-admin-text-secondary">稼働率</span>
                <Badge className="bg-green-900 text-green-200">99.9%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-admin-text-secondary">レスポンス時間</span>
                <span className="text-admin-text font-medium">0.3秒</span>
              </div>
              <div className="flex justify-between">
                <span className="text-admin-text-secondary">AI精度</span>
                <Badge className="bg-admin-primary/20 text-admin-primary">97.8%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
