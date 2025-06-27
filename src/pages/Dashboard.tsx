
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
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

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
  { name: '進行中', value: 12, color: '#F59E0B' },
  { name: '下書き', value: 3, color: '#6B7280' },
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

const nextActions = [
  {
    id: '1',
    title: '書類確認の連絡',
    company: 'テスト商事株式会社',
    dueDate: '今日',
    priority: 'high',
  },
  {
    id: '2',
    title: '退職日の最終確認',
    company: '株式会社サンプル',
    dueDate: '明日',
    priority: 'medium',
  },
  {
    id: '3',
    title: '離職票の受領確認',
    company: '例示会社Ltd.',
    dueDate: '3日後',
    priority: 'low',
  },
];

export default function Dashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">完了</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">進行中</Badge>;
      case 'draft':
        return <Badge variant="secondary">下書き</Badge>;
      default:
        return <Badge variant="outline">不明</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold font-heading">ダッシュボード</h1>
              <p className="text-muted-foreground">案件の進捗と次のアクションを確認できます</p>
            </div>
            <Link to="/cases">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新規案件作成
              </Button>
            </Link>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総案件数</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> 先月比
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">進行中</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  平均処理期間: 3.2日
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">完了率</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.4%</div>
                <Progress value={98.4} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">緊急案件</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  要対応アクション
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>月別案件推移</CardTitle>
                <CardDescription>過去6ヶ月の案件数と完了数</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cases" fill="#0066CC" name="総案件数" />
                    <Bar dataKey="completed" fill="#10B981" name="完了数" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>案件ステータス分布</CardTitle>
                <CardDescription>現在の案件の状態別割合</CardDescription>
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
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Cases */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  最近の案件
                  <Link to="/cases">
                    <Button variant="outline" size="sm">
                      すべて見る
                    </Button>
                  </Link>
                </CardTitle>
                <CardDescription>最新の案件状況</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCases.map((case_) => (
                    <div key={case_.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{case_.company}</p>
                        <p className="text-sm text-muted-foreground">
                          作成: {case_.createdAt} | 更新: {case_.lastUpdate}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(case_.status)}
                        <Link to={`/call/${case_.id}`}>
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Actions */}
            <Card>
              <CardHeader>
                <CardTitle>次のアクション</CardTitle>
                <CardDescription>対応が必要な案件</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nextActions.map((action) => (
                    <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{action.title}</p>
                        <p className="text-sm text-muted-foreground">{action.company}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${getPriorityColor(action.priority)}`}>
                          {action.dueDate}
                        </span>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
