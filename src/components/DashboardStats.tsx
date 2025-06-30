
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  CheckCircle, 
  Clock,
  Building2
} from "lucide-react";
import type { Case } from "@/lib/database.types";

interface DashboardStatsProps {
  cases: Case[];
  user: any;
}

export function DashboardStats({ cases, user }: DashboardStatsProps) {
  const completedCases = cases.filter(c => c.status === 'completed').length;
  const activeCases = cases.filter(c => c.status !== 'completed' && c.status !== 'draft').length;

  return (
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
  );
}
