
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { 
  TrendingUp, 
  Download, 
  Calendar,
  DollarSign,
  Users,
  Clock,
  Target,
  Award
} from "lucide-react";
import { useState } from "react";
import { AdminNavigation } from "@/components/AdminNavigation";

// Mock data
const monthlyRevenue = [
  { month: "1月", revenue: 1260000, cases: 45, avgCase: 28000 },
  { month: "2月", revenue: 1440000, cases: 52, avgCase: 27700 },
  { month: "3月", revenue: 1050000, cases: 38, avgCase: 27600 },
  { month: "4月", revenue: 1740000, cases: 61, avgCase: 28500 },
  { month: "5月", revenue: 1380000, cases: 49, avgCase: 28200 },
  { month: "6月", revenue: 1560000, cases: 55, avgCase: 28400 },
];

const customerSatisfaction = [
  { rating: "5点", count: 127, percentage: 78 },
  { rating: "4点", count: 28, percentage: 17 },
  { rating: "3点", count: 6, percentage: 4 },
  { rating: "2点", count: 2, percentage: 1 },
  { rating: "1点", count: 0, percentage: 0 },
];

const industryData = [
  { industry: "IT・通信", cases: 45, color: "#6366F1" },
  { industry: "製造業", cases: 32, color: "#8B5CF6" },
  { industry: "サービス業", cases: 28, color: "#10B981" },
  { industry: "金融", cases: 18, color: "#F59E0B" },
  { industry: "その他", cases: 33, color: "#6B7280" },
];

export default function AdminAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");

  const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0);
  const totalCases = monthlyRevenue.reduce((sum, month) => sum + month.cases, 0);
  const avgCaseValue = Math.round(totalRevenue / totalCases);
  const successRate = 96.2;

  return (
    <div className="min-h-screen bg-admin-background font-body">
      <AdminNavigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-heading text-admin-text">分析レポート</h1>
            <p className="text-admin-text-secondary">ビジネス指標と詳細分析</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48 bg-white border-neutral-300 text-admin-text rounded-lg">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-neutral-200 rounded-lg">
                <SelectItem value="1month">過去1ヶ月</SelectItem>
                <SelectItem value="3months">過去3ヶ月</SelectItem>
                <SelectItem value="6months">過去6ヶ月</SelectItem>
                <SelectItem value="1year">過去1年</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="bg-admin-secondary hover:bg-admin-secondary/90 text-white rounded-lg">
              <Download className="mr-2 h-4 w-4" />
              レポート出力
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">総売上</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">¥{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-admin-text-secondary">
                <span className="text-green-600">+15.2%</span> 前期比
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">案件単価</CardTitle>
              <Target className="h-4 w-4 text-admin-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">¥{avgCaseValue.toLocaleString()}</div>
              <p className="text-xs text-admin-text-secondary">
                <span className="text-green-600">+2.8%</span> 前期比
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">成功率</CardTitle>
              <Award className="h-4 w-4 text-admin-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">{successRate}%</div>
              <p className="text-xs text-admin-text-secondary">
                <span className="text-green-600">+0.5%</span> 前期比
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-text">平均対応時間</CardTitle>
              <Clock className="h-4 w-4 text-admin-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-text">2.3日</div>
              <p className="text-xs text-admin-text-secondary">
                <span className="text-red-600">+0.2日</span> 前期比
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue and Cases Chart */}
        <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-admin-text">売上・案件数推移</CardTitle>
            <CardDescription className="text-admin-text-secondary">
              月次売上と案件数の推移
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis yAxisId="left" stroke="#6B7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6B7280" />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366F1" 
                  fill="url(#revenueGradient)" 
                  strokeWidth={2}
                />
                <Bar yAxisId="right" dataKey="cases" fill="#8B5CF6" opacity={0.7} />
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Industry Distribution */}
          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-admin-text">業界別案件分布</CardTitle>
              <CardDescription className="text-admin-text-secondary">
                クライアント企業の業界別内訳
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industryData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-admin-text">{item.industry}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-admin-text">{item.cases}件</span>
                      <Badge variant="outline" className="rounded-lg">
                        {Math.round((item.cases / totalCases) * 100)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Satisfaction */}
          <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-admin-text">顧客満足度</CardTitle>
              <CardDescription className="text-admin-text-secondary">
                サービス完了後のアンケート結果
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerSatisfaction.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-admin-text">{item.rating}</span>
                      <span className="text-admin-text-secondary">{item.count}件 ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-admin-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">平均満足度: 4.7/5.0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
