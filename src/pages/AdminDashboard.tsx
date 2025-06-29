
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell 
} from "recharts";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Phone, 
  MessageCircle 
} from "lucide-react";
import { Link } from "react-router-dom";
import { AdminNavigation } from "@/components/AdminNavigation";

const monthlyData = [
  { month: '1月', cases: 12, completed: 11 },
  { month: '2月', cases: 15, completed: 14 },
  { month: '3月', cases: 18, completed: 17 },
  { month: '4月', cases: 22, completed: 20 },
  { month: '5月', cases: 25, completed: 24 },
  { month: '6月', cases: 20, completed: 19 },
];

const statusData = [
  { name: '完了', value: 85, color: '#10B981' },
  { name: '進行中', value: 12, color: '#6366F1' },
  { name: '下書き', value: 3, color: '#8B5CF6' },
];

const recentCases = [
  {
    id: '1',
    company: '株式会社サンプル',
    status: 'completed',
    createdAt: '2024-01-15',
    lastUpdate: '2024-01-20',
  },
  {
    id: '2', 
    company: 'テスト商事株式会社',
    status: 'in_progress',
    createdAt: '2024-01-18',
    lastUpdate: '2024-01-22',
  },
  {
    id: '3',
    company: '例示会社Ltd.',
    status: 'draft',
    createdAt: '2024-01-20',
    lastUpdate: '2024-01-20',
  },
];

export default function AdminDashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-900 text-green-200 rounded-lg">完了</Badge>;
      case 'in_progress':
        return <Badge className="bg-admin-primary/20 text-admin-primary rounded-lg">進行中</Badge>;
      case 'draft':
        return <Badge className="bg-admin-secondary/20 text-admin-secondary rounded-lg">下書き</Badge>;
      default:
        return <Badge variant="outline" className="rounded-lg border-admin-surface text-admin-text-secondary">不明</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-admin-background font-body">
      <AdminNavigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-heading text-admin-text">管理ダッシュボード</h1>
            <p className="text-admin-text-secondary">案件の進捗と次のアクションを確認できます</p>
          </div>
          <Link to="/admin/cases">
            <Button className="bg-admin-primary hover:bg-admin-primary/90 text-white rounded-lg">
              <Plus className="mr-2 h-4 w-4" />
              新規案件作成
            </Button>
          </Link>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">総案件数</CardTitle>
              <FileText className="h-4 w-4 text-admin-text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">124</div>
              <p className="text-xs text-admin-text-secondary">
                <span className="text-green-400">+12%</span> 先月比
              </p>
            </CardContent>
          </Card>

          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">進行中</CardTitle>
              <Clock className="h-4 w-4 text-admin-text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">8</div>
              <p className="text-xs text-admin-text-secondary">
                平均処理期間: 3.2日
              </p>
            </CardContent>
          </Card>

          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">完了率</CardTitle>
              <CheckCircle className="h-4 w-4 text-admin-text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">98.4%</div>
              <Progress value={98.4} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">緊急案件</CardTitle>
              <AlertCircle className="h-4 w-4 text-admin-text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">2</div>
              <p className="text-xs text-admin-text-secondary">
                要対応アクション
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader>
              <CardTitle className="text-admin-text">月別案件推移</CardTitle>
              <CardDescription className="text-admin-text-secondary">過去6ヶ月の案件数と完了数</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
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
                  <Bar dataKey="cases" fill="#6366F1" name="総案件数" />
                  <Bar dataKey="completed" fill="#8B5CF6" name="完了数" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader>
              <CardTitle className="text-admin-text">案件ステータス分布</CardTitle>
              <CardDescription className="text-admin-text-secondary">現在の案件の状態別割合</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {statusData.map((entry, index) => (
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

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Cases */}
          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-admin-text">最近の案件</span>
                <Link to="/admin/cases">
                  <Button variant="outline" size="sm" className="border-admin-primary text-admin-primary hover:bg-admin-primary/10">
                    すべて見る
                  </Button>
                </Link>
              </CardTitle>
              <CardDescription className="text-admin-text-secondary">最新の案件状況</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCases.map((case_) => (
                  <div key={case_.id} className="flex items-center justify-between p-3 border border-admin-surface rounded-lg bg-admin-background">
                    <div className="space-y-1">
                      <p className="font-medium text-admin-text">{case_.company}</p>
                      <p className="text-sm text-admin-text-secondary">
                        作成: {case_.createdAt} | 更新: {case_.lastUpdate}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(case_.status)}
                      <Link to={`/call/${case_.id}`}>
                        <Button variant="ghost" size="sm" className="text-admin-text-secondary hover:text-admin-text">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader>
              <CardTitle className="text-admin-text">今日のサマリー</CardTitle>
              <CardDescription className="text-admin-text-secondary">本日の活動状況</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-admin-surface rounded-lg bg-admin-background">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4 text-admin-primary" />
                    <span className="text-admin-text">新規問い合わせ</span>
                  </div>
                  <span className="text-xl font-bold text-admin-primary">3</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-admin-surface rounded-lg bg-admin-background">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-admin-text">完了案件</span>
                  </div>
                  <span className="text-xl font-bold text-green-400">2</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-admin-surface rounded-lg bg-admin-background">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-admin-secondary" />
                    <span className="text-admin-text">対応待ち</span>
                  </div>
                  <span className="text-xl font-bold text-admin-secondary">1</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
