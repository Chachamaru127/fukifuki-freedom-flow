
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Filter, Phone, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { toast } from "sonner";

const mockCases = [
  {
    id: '1',
    company: '株式会社サンプル',
    status: 'completed',
    createdAt: '2024-01-15',
    lastUpdate: '2024-01-20',
    notes: '円満退職完了',
  },
  {
    id: '2', 
    company: 'テスト商事株式会社',
    status: 'in_progress',
    createdAt: '2024-01-18',
    lastUpdate: '2024-01-22',
    notes: '書類待ち',
  },
  {
    id: '3',
    company: '例示会社Ltd.',
    status: 'draft',
    createdAt: '2024-01-20',
    lastUpdate: '2024-01-20',
    notes: '相談段階',
  },
  {
    id: '4',
    company: 'サンプル株式会社',
    status: 'submitted',
    createdAt: '2024-01-21',
    lastUpdate: '2024-01-23',
    notes: '申請済み',
  },
];

export default function Cases() {
  const [cases, setCases] = useState(mockCases);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const [newCase, setNewCase] = useState({
    company: "",
    notes: "",
    status: "draft",
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">完了</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">進行中</Badge>;
      case 'submitted':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">申請済み</Badge>;
      case 'draft':
        return <Badge variant="secondary">下書き</Badge>;
      default:
        return <Badge variant="outline">不明</Badge>;
    }
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateCase = () => {
    if (!newCase.company.trim()) {
      toast.error("会社名を入力してください");
      return;
    }

    const caseData = {
      id: String(cases.length + 1),
      company: newCase.company,
      status: newCase.status,
      notes: newCase.notes,
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
    };

    setCases(prev => [caseData, ...prev]);
    setNewCase({ company: "", notes: "", status: "draft" });
    setIsCreateModalOpen(false);
    toast.success("案件を作成しました");
  };

  const handleDeleteCase = (id: string) => {
    setCases(prev => prev.filter(case_ => case_.id !== id));
    toast.success("案件を削除しました");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold font-heading">案件管理</h1>
              <p className="text-muted-foreground">退職代行の案件を管理できます</p>
            </div>
            
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  新規案件作成
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>新規案件作成</DialogTitle>
                  <DialogDescription>
                    新しい退職代行案件を作成します
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">会社名</Label>
                    <Input
                      id="company"
                      placeholder="例: 株式会社サンプル"
                      value={newCase.company}
                      onChange={(e) => setNewCase(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">ステータス</Label>
                    <Select 
                      value={newCase.status} 
                      onValueChange={(value) => setNewCase(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">下書き</SelectItem>
                        <SelectItem value="submitted">申請済み</SelectItem>
                        <SelectItem value="in_progress">進行中</SelectItem>
                        <SelectItem value="completed">完了</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">メモ</Label>
                    <Textarea
                      id="notes"
                      placeholder="案件に関するメモを入力してください"
                      value={newCase.notes}
                      onChange={(e) => setNewCase(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    キャンセル
                  </Button>
                  <Button onClick={handleCreateCase}>
                    案件を作成
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">フィルター</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="会社名やメモで検索..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべてのステータス</SelectItem>
                      <SelectItem value="draft">下書き</SelectItem>
                      <SelectItem value="submitted">申請済み</SelectItem>
                      <SelectItem value="in_progress">進行中</SelectItem>
                      <SelectItem value="completed">完了</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cases Table */}
          <Card>
            <CardHeader>
              <CardTitle>案件一覧</CardTitle>
              <CardDescription>
                {filteredCases.length}件の案件が見つかりました
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>会社名</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead>作成日</TableHead>
                      <TableHead>最終更新</TableHead>
                      <TableHead>メモ</TableHead>
                      <TableHead className="text-right">アクション</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCases.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          案件が見つかりませんでした
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCases.map((case_) => (
                        <TableRow key={case_.id}>
                          <TableCell className="font-medium">{case_.company}</TableCell>
                          <TableCell>{getStatusBadge(case_.status)}</TableCell>
                          <TableCell>{case_.createdAt}</TableCell>
                          <TableCell>{case_.lastUpdate}</TableCell>
                          <TableCell className="max-w-48 truncate">{case_.notes}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-1">
                              <Link to={`/call/${case_.id}`}>
                                <Button variant="ghost" size="sm">
                                  <Phone className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeleteCase(case_.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
}
