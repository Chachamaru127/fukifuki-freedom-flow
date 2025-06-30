
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Calendar, 
  Building2, 
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { CaseStatusBadge } from "./CaseStatusBadge";
import type { Case } from "@/lib/database.types";

interface CasesListProps {
  cases: Case[];
}

export function CasesList({ cases }: CasesListProps) {
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

  if (cases.length === 0) {
    return (
      <Card className="bg-white rounded-lg border-gray-200">
        <CardHeader>
          <CardTitle className="text-user-text">相談履歴</CardTitle>
          <CardDescription className="text-user-text-secondary">
            あなたの退職代行相談の一覧です
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-lg border-gray-200">
      <CardHeader>
        <CardTitle className="text-user-text">相談履歴</CardTitle>
        <CardDescription className="text-user-text-secondary">
          あなたの退職代行相談の一覧です
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="border rounded-lg p-4 hover:bg-user-background-alt/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-user-text-secondary" />
                    <h3 className="font-medium text-user-text">{caseItem.company_name}</h3>
                    <CaseStatusBadge status={caseItem.status || 'draft'} />
                  </div>
                  <p className="text-sm text-user-text-secondary">
                    {getStatusText(caseItem.status || 'draft')}
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
                  <span className="text-user-text">{getProgressValue(caseItem.status || 'draft')}%</span>
                </div>
                <Progress value={getProgressValue(caseItem.status || 'draft')} className="h-2" />
              </div>
              
              <div className="flex justify-between text-sm text-user-text-secondary mt-3 pt-3 border-t">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>作成: {new Date(caseItem.created_at || '').toLocaleDateString('ja-JP')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>更新: {new Date(caseItem.updated_at || '').toLocaleDateString('ja-JP')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
