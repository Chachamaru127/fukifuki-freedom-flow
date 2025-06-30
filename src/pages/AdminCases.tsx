
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Filter, 
  Phone, 
  Edit, 
  Trash2,
  Building2,
  Calendar,
  User,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";
import { AdminNavigation } from "@/components/AdminNavigation";
import { useCases, useCreateCase, useUpdateCase, useDeleteCase } from "@/hooks/useCases";
import { CaseInsert, CaseUpdate } from "@/lib/database.types";
import { format } from "date-fns";

export default function AdminCases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [newCase, setNewCase] = useState<Partial<CaseInsert>>({
    company_name: "",
    employee_name: "",
    reason: "",
    status: "draft"
  });

  const { data: cases, isLoading } = useCases();
  const createCaseMutation = useCreateCase();
  const updateCaseMutation = useUpdateCase();
  const deleteCaseMutation = useDeleteCase();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 rounded-lg">完了</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800 rounded-lg">進行中</Badge>;
      case 'submitted':
        return <Badge className="bg-purple-100 text-purple-800 rounded-lg">提出済み</Badge>;
      case 'hearing':
        return <Badge className="bg-orange-100 text-orange-800 rounded-lg">ヒアリング中</Badge>;
      case 'negotiating':
        return <Badge className="bg-yellow-100 text-yellow-800 rounded-lg">交渉中</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 rounded-lg">キャンセル</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 rounded-lg">下書き</Badge>;
      default:
        return <Badge variant="outline" className="rounded-lg">不明</Badge>;
    }
  };

  const filteredCases = cases?.filter(case_ => {
    const matchesSearch = case_.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (case_.employee_name?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const handleCreateCase = async () => {
    if (!newCase.company_name || !newCase.user_id) {
      console.error("Company name and user_id are required");
      return;
    }

    try {
      await createCaseMutation.mutateAsync(newCase as CaseInsert);
      setIsCreateModalOpen(false);
      setNewCase({
        company_name: "",
        employee_name: "",
        reason: "",
        status: "draft"
      });
    } catch (error) {
      console.error("Failed to create case:", error);
    }
  };

  const handleStatusUpdate = async (caseId: string, newStatus: string) => {
    try {
      await updateCaseMutation.mutateAsync({
        id: caseId,
        updates: { status: newStatus }
      });
    } catch (error) {
      console.error("Failed to update case status:", error);
    }
  };

  const handleDeleteCase = async (caseId: string) => {
    if (window.confirm("本当にこの案件を削除しますか？")) {
      try {
        await deleteCaseMutation.mutateAsync(caseId);
      } catch (error) {
        console.error("Failed to delete case:", error);
      }
    }
  };

  const openDetailModal = (case_: any) => {
    setSelectedCase(case_);
    setIsDetailModalOpen(true);
  };

  if (isLoading) {
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-heading text-admin-text">案件管理</h1>
            <p className="text-admin-text-secondary">退職代行案件の管理と進捗確認</p>
          </div>
          
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-admin-primary hover:bg-admin-primary/90 text-white rounded-lg">
                <Plus className="mr-2 h-4 w-4" />
                新規案件作成
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border-neutral-200 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-admin-text">新規案件作成</DialogTitle>
                <DialogDescription className="text-admin-text-secondary">
                  新しい退職代行案件を作成します
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-admin-text">会社名</Label>
                  <Input
                    id="company"
                    placeholder="株式会社○○"
                    value={newCase.company_name || ""}
                    onChange={(e) => setNewCase({...newCase, company_name: e.target.value})}
                    className="bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employee" className="text-admin-text">従業員名</Label>
                  <Input
                    id="employee"
                    placeholder="山田太郎"
                    value={newCase.employee_name || ""}
                    onChange={(e) => setNewCase({...newCase, employee_name: e.target.value})}
                    className="bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason" className="text-admin-text">退職理由</Label>
                  <Input
                    id="reason"
                    placeholder="理由を入力..."
                    value={newCase.reason || ""}
                    onChange={(e) => setNewCase({...newCase, reason: e.target.value})}
                    className="bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user_id" className="text-admin-text">ユーザーID</Label>
                  <Input
                    id="user_id"
                    placeholder="ユーザーIDを入力"
                    value={newCase.user_id || ""}
                    onChange={(e) => setNewCase({...newCase, user_id: e.target.value})}
                    className="bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg"
                  />
                </div>
                <Button 
                  onClick={handleCreateCase}
                  disabled={createCaseMutation.isPending}
                  className="w-full bg-admin-primary hover:bg-admin-primary/90 text-white rounded-lg"
                >
                  {createCaseMutation.isPending ? "作成中..." : "案件を作成"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter Section - ENHANCED */}
        <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-admin-text">検索・フィルター</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-admin-text-secondary" />
                  <Input
                    placeholder="会社名または従業員名で検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg"
                  />
                </div>
              </div>
              <div className="w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-neutral-200 rounded-lg z-50">
                    <SelectItem value="all">すべてのステータス</SelectItem>
                    <SelectItem value="draft">下書き</SelectItem>
                    <SelectItem value="submitted">提出済み</SelectItem>
                    <SelectItem value="hearing">ヒアリング中</SelectItem>
                    <SelectItem value="negotiating">交渉中</SelectItem>
                    <SelectItem value="in_progress">進行中</SelectItem>
                    <SelectItem value="completed">完了</SelectItem>
                    <SelectItem value="cancelled">キャンセル</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cases Table - ENHANCED WITH STATUS UPDATE */}
        <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-admin-text">案件一覧</CardTitle>
            <CardDescription className="text-admin-text-secondary">
              {filteredCases.length}件の案件が見つかりました
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-neutral-200">
                  <TableHead className="text-admin-text font-medium">会社名</TableHead>
                  <TableHead className="text-admin-text font-medium">従業員名</TableHead>
                  <TableHead className="text-admin-text font-medium">ステータス</TableHead>
                  <TableHead className="text-admin-text font-medium">作成日</TableHead>
                  <TableHead className="text-admin-text font-medium">更新日</TableHead>
                  <TableHead className="text-admin-text font-medium">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((case_) => (
                  <TableRow key={case_.id} className="border-neutral-200 hover:bg-neutral-50">
                    <TableCell className="font-medium text-admin-text">
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-admin-text-secondary" />
                        <span>{case_.company_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-admin-text">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-admin-text-secondary" />
                        <span>{case_.employee_name || "未設定"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={case_.status || "draft"}
                        onValueChange={(value) => handleStatusUpdate(case_.id, value)}
                        disabled={updateCaseMutation.isPending}
                      >
                        <SelectTrigger className="w-32 h-8 text-xs bg-white border-neutral-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-neutral-200 rounded-lg z-50">
                          <SelectItem value="draft">下書き</SelectItem>
                          <SelectItem value="submitted">提出済み</SelectItem>
                          <SelectItem value="hearing">ヒアリング中</SelectItem>
                          <SelectItem value="negotiating">交渉中</SelectItem>
                          <SelectItem value="in_progress">進行中</SelectItem>
                          <SelectItem value="completed">完了</SelectItem>
                          <SelectItem value="cancelled">キャンセル</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-admin-text">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-admin-text-secondary" />
                        <span>{case_.created_at ? format(new Date(case_.created_at), 'yyyy/MM/dd') : "-"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-admin-text">
                      {case_.updated_at ? format(new Date(case_.updated_at), 'yyyy/MM/dd') : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDetailModal(case_)}
                          className="border-admin-primary text-admin-primary hover:bg-admin-primary/10 rounded-lg"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Link to={`/call/${case_.id}`}>
                          <Button variant="outline" size="sm" className="border-admin-secondary text-admin-secondary hover:bg-admin-secondary/10 rounded-lg">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCase(case_.id)}
                          disabled={deleteCaseMutation.isPending}
                          className="border-red-500 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Case Detail Modal */}
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="bg-white border-neutral-200 rounded-lg max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-admin-text">案件詳細</DialogTitle>
              <DialogDescription className="text-admin-text-secondary">
                案件の詳細情報を確認できます
              </DialogDescription>
            </DialogHeader>
            {selectedCase && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-admin-text font-medium">会社名</Label>
                    <p className="text-admin-text">{selectedCase.company_name}</p>
                  </div>
                  <div>
                    <Label className="text-admin-text font-medium">従業員名</Label>
                    <p className="text-admin-text">{selectedCase.employee_name || "未設定"}</p>
                  </div>
                  <div>
                    <Label className="text-admin-text font-medium">ステータス</Label>
                    <div className="mt-1">
                      {getStatusBadge(selectedCase.status)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-admin-text font-medium">作成日</Label>
                    <p className="text-admin-text">
                      {selectedCase.created_at ? format(new Date(selectedCase.created_at), 'yyyy年MM月dd日') : "-"}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-admin-text font-medium">退職理由</Label>
                  <p className="text-admin-text mt-1">{selectedCase.reason || "未設定"}</p>
                </div>
                <div>
                  <Label className="text-admin-text font-medium">ユーザーID</Label>
                  <p className="text-admin-text font-mono text-sm">{selectedCase.user_id}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
