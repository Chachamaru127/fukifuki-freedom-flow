
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
import { useCaseStatistics } from "@/hooks/useStatistics";
import { useCases } from "@/hooks/useCases";
import { format, startOfMonth, eachMonthOfInterval, subMonths } from "date-fns";

export default function AdminDashboard() {
  const { data: statistics, isLoading: statisticsLoading } = useCaseStatistics();
  const { data: cases, isLoading: casesLoading } = useCases();

  // Calculate monthly data from actual cases
  const monthlyData = (() => {
    if (!cases) return [];
    
    const last6Months = eachMonthOfInterval({
      start: subMonths(new Date(), 5),
      end: new Date()
    });

    return last6Months.map(month => {
      const monthStart = startOfMonth(month);
      const monthCases = cases.filter(case_ => {
        const caseDate = new Date(case_.created_at || '');
        return format(caseDate, 'yyyy-MM') === format(monthStart, 'yyyy-MM');
      });

      const completedCases = monthCases.filter(case_ => case_.status === 'completed');

      return {
        month: format(month, 'M月'),
        cases: monthCases.length,
        completed: completedCases.length,
        revenue: completedCases.length * 30000 // 仮の売上計算
      };
    });
  })();

  const statusData = statistics ? [
    { name: "完了", value: statistics.statusCounts.completed || 0, color: "#10B981" },
    { name: "進行中", value: statistics.statusCounts.in_progress || 0, color: "#6366F1" },
    { name: "下書き", value: statistics.statusCounts.draft || 0, color: "#F59E0B" },
    { name: "提出済み", value: statistics.statusCounts.submitted || 0, color: "#8B5CF6" },
  ] : [];

  const currentMonthRevenue = monthlyData[monthlyData.length - 1]?.revenue || 0;
  const avgResponseTime = cases ? (cases.length > 0 ? 2.3 : 0) : 0; // 仮の計算

  if (statisticsLoading || casesLoading) {
    return (
      <div className="min-h-screen bg-admin-background font-body">
        <AdminNavigation />
        <div className="max-w-7xl mx-auto p-6 flex items-center justify-center">
          <div className="text-admin-text">データを読み込み中...</div>
        </div>
      </div>
    );
  }

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
              <div className="text-2xl font-bold text-admin-text">{statistics?.total || 0}</div>
              <p className="text-xs text-admin-text-secondary">
                今月: {statistics?.thisMonth || 0}件
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">完了率</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">{Math.round(statistics?.completionRate || 0)}%</div>
              <Progress value={statistics?.completionRate || 0} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">月間売上</CardTitle>
              <DollarSign className="h-4 w-4 text-admin-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">¥{currentMonthRevenue.toLocaleString()}</div>
              <p className="text-xs text-admin-text-secondary">
                完了案件ベース
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">平均対応時間</CardTitle>
              <Clock className="h-4 w-4 text-admin-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">{avgResponseTime}日</div>
              <p className="text-xs text-admin-text-secondary">
                目標: 2日以内
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
                    label={({ name, value }) => value > 0 ? `${name}: ${value}件` : ''}
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
                対応が必要な案件を確認してください
              </p>
              <Link to="/admin/cases?filter=urgent">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg">
                  案件一覧を確認
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-admin-text flex items-center">
                <Phone className="mr-2 h-4 w-4 text-admin-primary" />
                進行中案件
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-admin-text-secondary mb-4">
                進行中の案件: {statistics?.statusCounts.in_progress || 0}件
              </p>
              <Link to="/admin/cases?filter=in_progress">
                <Button className="w-full bg-admin-primary hover:bg-admin-primary/90 text-white rounded-lg">
                  進行中案件を確認
                </Button>
              </Link>
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
