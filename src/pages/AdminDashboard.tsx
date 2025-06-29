
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { 
  Users, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Phone,
  Calendar,
  DollarSign,
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";
import { AdminNavigation } from "@/components/AdminNavigation";

// Mock data - in real app, fetch from Supabase
const monthlyData = [
  { month: "1月", cases: 45, completed: 42, revenue: 1260000 },
  { month: "2月", cases: 52, completed: 48, revenue: 1440000 },
  { month: "3月", cases: 38, completed: 35, revenue: 1050000 },
  { month: "4月", cases: 61, completed: 58, revenue: 1740000 },
  { month: "5月", cases: 49, completed: 46, revenue: 1380000 },
  { month: "6月", cases: 55, completed: 52, revenue: 1560000 },
];

const statusData = [
  { name: "完了", value: 78, color: "#10B981" },
  { name: "進行中", value: 15, color: "#6366F1" },
  { name: "保留中", value: 7, color: "#F59E0B" },
];

export default function AdminDashboard() {
  const totalCases = 156;
  const completedCases = 142;
  const completionRate = Math.round((completedCases / totalCases) * 100);
  const monthlyRevenue = 1560000;

  return (
    <div className="min-h-screen bg-admin-background font-body">
      <AdminNavigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-admin-text">ダッシュボード</h1>
          <p className="text-admin-text-secondary">FUKIFUKI 管理システム - 運営状況の概要</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">総案件数</CardTitle>
              <Users className="h-4 w-4 text-admin-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">{totalCases}</div>
              <p className="text-xs text-admin-text-secondary">
                <span className="text-green-600">+12%</span> 前月比
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">完了率</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">{completionRate}%</div>
              <Progress value={completionRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">月間売上</CardTitle>
              <DollarSign className="h-4 w-4 text-admin-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">¥{monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-admin-text-secondary">
                <span className="text-green-600">+8%</span> 前月比
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">平均対応時間</CardTitle>
              <Clock className="h-4 w-4 text-admin-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">2.3日</div>
              <p className="text-xs text-admin-text-secondary">
                <span className="text-red-600">+0.2日</span> 前月比
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Cases Chart */}
          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-admin-text">月次案件数推移</CardTitle>
              <CardDescription className="text-admin-text-secondary">
                過去6ヶ月の案件受付・完了状況
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Bar dataKey="cases" fill="#6366F1" name="受付" />
                  <Bar dataKey="completed" fill="#10B981" name="完了" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-admin-text">案件ステータス分布</CardTitle>
              <CardDescription className="text-admin-text-secondary">
                現在の案件状況の内訳
              </CardDescription>
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
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-admin-text flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                緊急対応案件
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-admin-text-secondary mb-4">
                対応が必要な緊急案件が3件あります
              </p>
              <Link to="/admin/cases?filter=urgent">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg">
                  緊急案件を確認
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-admin-text flex items-center">
                <Phone className="mr-2 h-4 w-4 text-admin-primary" />
                本日の通話予約
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-admin-text-secondary mb-4">
                本日予定されている通話が5件あります
              </p>
              <Button className="w-full bg-admin-primary hover:bg-admin-primary/90 text-white rounded-lg">
                通話予約を確認
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-admin-text flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-admin-secondary" />
                レポート生成
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-admin-text-secondary mb-4">
                月次レポートを生成・ダウンロード
              </p>
              <Link to="/admin/analytics">
                <Button className="w-full bg-admin-secondary hover:bg-admin-secondary/90 text-white rounded-lg">
                  詳細分析を見る
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
