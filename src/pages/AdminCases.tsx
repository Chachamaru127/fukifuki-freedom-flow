
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
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import { AdminNavigation } from "@/components/AdminNavigation";

// Mock data - in real app, fetch from Supabase
const mockCases = [
  {
    id: '1',
    company_name: '株式会社サンプル',
    employee_name: '田中一郎',
    status: 'completed',
    created_at: '2024-01-15',
    last_contact: '2024-01-20',
  },
  {
    id: '2',
    company_name: 'テスト商事株式会社',
    employee_name: '佐藤花子',
    status: 'in_progress',
    created_at: '2024-01-18',
    last_contact: '2024-01-22',
  },
  {
    id: '3',
    company_name: '例示会社Ltd.',
    employee_name: '鈴木太郎',
    status: 'draft',
    created_at: '2024-01-20',
    last_contact: '2024-01-20',
  },
  {
    id: '4',
    company_name: '株式会社デモ',
    employee_name: '高橋美咲',
    status: 'submitted',
    created_at: '2024-01-22',
    last_contact: '2024-01-23',
  },
];

export default function AdminCases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCase, setNewCase] = useState({
    company_name: "",
    employee_name: "",
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 rounded-lg">完了</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800 rounded-lg">進行中</Badge>;
      case 'submitted':
        return <Badge className="bg-purple-100 text-purple-800 rounded-lg">提出済み</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 rounded-lg">下書き</Badge>;
      default:
        return <Badge variant="outline" className="rounded-lg">不明</Badge>;
    }
  };

  const filteredCases = mockCases.filter(case_ => {
    const matchesSearch = case_.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.employee_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateCase = () => {
    // In real app, create case in Supabase
    console.log("Creating case:", newCase);
    setIsCreateModalOpen(false);
    setNewCase({ company_name: "", employee_name: "" });
  };

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
                    value={newCase.company_name}
                    onChange={(e) => setNewCase({...newCase, company_name: e.target.value})}
                    className="bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employee" className="text-admin-text">従業員名</Label>
                  <Input
                    id="employee"
                    placeholder="山田太郎"
                    value={newCase.employee_name}
                    onChange={(e) => setNewCase({...newCase, employee_name: e.target.value})}
                    className="bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg"
                  />
                </div>
                <Button 
                  onClick={handleCreateCase} 
                  className="w-full bg-admin-primary hover:bg-admin-primary/90 text-white rounded-lg"
                >
                  案件を作成
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
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
                  <SelectContent className="bg-white border-neutral-200 rounded-lg">
                    <SelectItem value="all">すべてのステータス</SelectItem>
                    <SelectItem value="draft">下書き</SelectItem>
                    <SelectItem value="submitted">提出済み</SelectItem>
                    <SelectItem value="in_progress">進行中</SelectItem>
                    <SelectItem value="completed">完了</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cases Table */}
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
                  <TableHead className="text-admin-text font-medium">最終連絡</TableHead>
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
                        <span>{case_.employee_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(case_.status)}
                    </TableCell>
                    <TableCell className="text-admin-text">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-admin-text-secondary" />
                        <span>{case_.created_at}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-admin-text">{case_.last_contact}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link to={`/call/${case_.id}`}>
                          <Button variant="outline" size="sm" className="border-admin-primary text-admin-primary hover:bg-admin-primary/10 rounded-lg">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="border-admin-secondary text-admin-secondary hover:bg-admin-secondary/10 rounded-lg">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-50 rounded-lg">
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
      </div>
    </div>
  );
}
