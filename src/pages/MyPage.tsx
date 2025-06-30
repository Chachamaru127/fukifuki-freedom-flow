
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  LogOut
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserNavigation } from "@/components/UserNavigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useCases } from "@/hooks/useCases";
import { DashboardStats } from "@/components/DashboardStats";
import { CasesList } from "@/components/CasesList";

export default function MyPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: cases = [], isLoading, error } = useCases();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (error) {
    toast.error("案件データの取得に失敗しました");
  }

  if (isLoading) {
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

        <DashboardStats cases={cases} user={user} />
        <CasesList cases={cases} />
      </div>
    </div>
  );
}
