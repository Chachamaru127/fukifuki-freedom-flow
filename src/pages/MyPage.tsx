import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Calendar, 
  Building2, 
  Clock,
  CheckCircle,
  ArrowRight,
  LogOut
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserNavigation } from "@/components/UserNavigation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface Case {
  id: string;
  company_name: string;
  employee_name: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function MyPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCases();
    }
  }, [user]);

  const fetchCases = async () => {
    try {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching cases:', error);
        toast.error("案件データの取得に失敗しました");
      } else {
        setCases(data || []);
      }
    } catch (err) {
      console.error('Fetch cases error:', err);
      toast.error("案件データの取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-user-secondary/20 text-user-secondary rounded-lg">完了</Badge>;
      case 'negotiating':
        return <Badge className="bg-user-primary/20 text-user-primary rounded-lg">交渉中</Badge>;
      case 'hearing':
        return <Badge className="bg-user-accent/20 text-user-accent rounded-lg">ヒアリング</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 rounded-lg">下書き</Badge>;
      case 'submitted':
        return <Badge className="bg-blue-100 text-blue-800 rounded-lg">申込済み</Badge>;
      default:
        return <Badge variant="outline" className="rounded-lg">不明</Badge>;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '退職手続きが完了しました';
      case 'negotiating':
        return '企業との交渉を進めています';
      case 'hearing':
        return '詳細ヒアリングを実施中です';
      case 'draft':
        return '下書きとして保存されています';
      case 'submitted':
        return '申込を受け付けました';
      default:
        return '状況を確認中です';
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'completed': return 100;
      case 'negotiating': return 70;
      case 'hearing': return 40;
      case 'submitted': return 20;
      case 'draft': return 10;
      default: return 0;
    }
  };

  const completedCases = cases.filter(c => c.status === 'completed').length;
  const activeCases = cases.filter(c => c.status !== 'completed' && c.status !== 'draft').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-user-background-alt font-body">
        <UserNavigation />
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-user-text">読み込み中...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-user-background-alt font-body">
      <UserNavigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-heading text-user-text">マイページ</h1>
            <p className="text-user-text-secondary">
              {user?.email && `${user.email} でログイン中`}
            </p>
          </div>
          <div className="flex space-x-2">
            <Link to="/consultation/new">
              <Button className="bg-user-primary hover:bg-user-primary/90 text-white rounded-lg">
                <Plus className="mr-2 h-4 w-4" />
                新規相談を始める
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-gray-300 hover:bg-gray-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              ログアウト
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white rounded-lg border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-user-text">相談件数</CardTitle>
              <Building2 className="h-4 w-4 text-user-text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-user-text">{cases.length}</div>
              <p className="text-xs text-user-text-secondary">
                進行中: {activeCases}件
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-lg border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-user-text">完了件数</CardTitle>
              <CheckCircle className="h-4 w-4 text-user-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-user-secondary">{completedCases}</div>
              <p className="text-xs text-user-text-secondary">
                これまでの実績
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-lg border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-user-text">平均期間</CardTitle>
              <Clock className="h-4 w-4 text-user-text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-user-text">14日</div>
              <p className="text-xs text-user-text-secondary">
                申込から完了まで
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cases List */}
        <Card className="bg-white rounded-lg border-gray-200">
          <CardHeader>
            <CardTitle className="text-user-text">相談履歴</CardTitle>
            <CardDescription className="text-user-text-secondary">
              あなたの退職代行相談の一覧です
            </CardDescription>
          </CardHeader>
          <CardContent>
            {cases.length === 0 ? (
              <div className="text-center py-8">
                <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-user-text mb-2">まだ相談がありません</h3>
                <p className="text-user-text-secondary mb-4">
                  新規相談を始めて、退職代行サービスをご利用ください
                </p>
                <Link to="/consultation/new">
                  <Button className="bg-user-primary hover:bg-user-primary/90 text-white rounded-lg">
                    <Plus className="mr-2 h-4 w-4" />
                    新規相談を始める
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cases.map((caseItem) => (
                  <div key={caseItem.id} className="border rounded-lg p-4 hover:bg-user-background-alt/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-user-text-secondary" />
                          <h3 className="font-medium text-user-text">{caseItem.company_name}</h3>
                          {getStatusBadge(caseItem.status)}
                        </div>
                        <p className="text-sm text-user-text-secondary">
                          {getStatusText(caseItem.status)}
                        </p>
                        {caseItem.employee_name && (
                          <p className="text-sm text-user-text-secondary">
                            担当者: {caseItem.employee_name}
                          </p>
                        )}
                      </div>
                      <Link to={`/consultation/${caseItem.id}`}>
                        <Button variant="outline" size="sm" className="border-user-primary text-user-primary hover:bg-user-primary/5 rounded-lg">
                          詳細 <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-user-text-secondary">進捗</span>
                        <span className="text-user-text">{getProgressValue(caseItem.status)}%</span>
                      </div>
                      <Progress value={getProgressValue(caseItem.status)} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between text-sm text-user-text-secondary mt-3 pt-3 border-t">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>作成: {new Date(caseItem.created_at).toLocaleDateString('ja-JP')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>更新: {new Date(caseItem.updated_at).toLocaleDateString('ja-JP')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
