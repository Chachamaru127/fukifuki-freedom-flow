
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Settings, 
  Key, 
  Users, 
  Bell, 
  Mail,
  Save,
  Plus,
  Edit,
  Trash2,
  Shield
} from "lucide-react";
import { AdminNavigation } from "@/components/AdminNavigation";

// Mock data
const staffMembers = [
  { id: 1, name: "管理者", email: "admin@fukifuki.com", role: "admin", status: "active" },
  { id: 2, name: "田中 太郎", email: "tanaka@fukifuki.com", role: "operator", status: "active" },
  { id: 3, name: "佐藤 花子", email: "sato@fukifuki.com", role: "operator", status: "inactive" },
];

export default function AdminSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    slack: true,
  });

  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    role: "operator",
  });

  const handleSaveSettings = () => {
    // In real app, save to Supabase
    console.log("Settings saved");
  };

  const handleAddStaff = () => {
    // In real app, create staff in Supabase
    console.log("Adding staff:", newStaff);
    setIsStaffModalOpen(false);
    setNewStaff({ name: "", email: "", role: "operator" });
  };

  return (
    <div className="min-h-screen bg-admin-background font-body">
      <AdminNavigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-admin-text">システム設定</h1>
          <p className="text-admin-text-secondary">アプリケーションの設定とスタッフ管理</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* API Settings */}
            <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="text-admin-text flex items-center">
                  <Key className="mr-2 h-5 w-5" />
                  API設定
                </CardTitle>
                <CardDescription className="text-admin-text-secondary">
                  外部サービス連携のためのAPIキー管理
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openai-key" className="text-admin-text">OpenAI APIキー</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="openai-key"
                      type="password"
                      placeholder="sk-..."
                      className="bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg"
                    />
                    <Button variant="outline" className="border-admin-primary text-admin-primary hover:bg-admin-primary/10 rounded-lg">
                      テスト
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stripe-key" className="text-admin-text">Stripe秘密キー</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="stripe-key"
                      type="password"
                      placeholder="sk_live_..."
                      className="bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg"
                    />
                    <Button variant="outline" className="border-admin-secondary text-admin-secondary hover:bg-admin-secondary/10 rounded-lg">
                      検証
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twilio-key" className="text-admin-text">Twilio SID</Label>
                  <Input
                    id="twilio-key"
                    placeholder="AC..."
                    className="bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Business Settings */}
            <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="text-admin-text flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  ビジネス設定
                </CardTitle>
                <CardDescription className="text-admin-text-secondary">
                  料金プランと営業時間の設定
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="base-price" className="text-admin-text">基本料金</Label>
                    <div className="relative">
                      <Input
                        id="base-price"
                        type="number"
                        defaultValue="29800"
                        className="bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg"
                      />
                      <span className="absolute right-3 top-3 text-admin-text-secondary">円</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="urgent-fee" className="text-admin-text">緊急対応費</Label>
                    <div className="relative">
                      <Input
                        id="urgent-fee"
                        type="number"
                        defaultValue="10000"
                        className="bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg"
                      />
                      <span className="absolute right-3 top-3 text-admin-text-secondary">円</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-hours" className="text-admin-text">営業時間</Label>
                  <Input
                    id="business-hours"
                    defaultValue="平日 9:00-18:00, 土日祝 10:00-16:00"
                    className="bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-info" className="text-admin-text">会社概要</Label>
                  <Textarea
                    id="company-info"
                    placeholder="会社の詳細情報..."
                    rows={4}
                    className="bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Notifications & Staff */}
          <div className="space-y-6">
            {/* Notification Settings */}
            <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="text-admin-text flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  通知設定
                </CardTitle>
                <CardDescription className="text-admin-text-secondary">
                  各種通知の有効/無効切り替え
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-admin-text">メール通知</Label>
                    <p className="text-sm text-admin-text-secondary">新規案件の通知</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-admin-text">SMS通知</Label>
                    <p className="text-sm text-admin-text-secondary">緊急案件の通知</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-admin-text">Slack通知</Label>
                    <p className="text-sm text-admin-text-secondary">チーム共有</p>
                  </div>
                  <Switch
                    checked={notifications.slack}
                    onCheckedChange={(checked) => setNotifications({...notifications, slack: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="text-admin-text">クイックアクション</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handleSaveSettings}
                  className="w-full bg-admin-primary hover:bg-admin-primary/90 text-white rounded-lg"
                >
                  <Save className="mr-2 h-4 w-4" />
                  設定を保存
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-admin-secondary text-admin-secondary hover:bg-admin-secondary/10 rounded-lg"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  テストメール送信
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Staff Management */}
        <Card className="bg-white border-neutral-200 rounded-lg shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-admin-text flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  スタッフ管理
                </CardTitle>
                <CardDescription className="text-admin-text-secondary">
                  システムアクセス権限を持つスタッフの管理
                </CardDescription>
              </div>
              
              <Dialog open={isStaffModalOpen} onOpenChange={setIsStaffModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-admin-secondary hover:bg-admin-secondary/90 text-white rounded-lg">
                    <Plus className="mr-2 h-4 w-4" />
                    スタッフ追加
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white border-neutral-200 rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-admin-text">新規スタッフ追加</DialogTitle>
                    <DialogDescription className="text-admin-text-secondary">
                      新しいスタッフアカウントを作成します
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="staff-name" className="text-admin-text">氏名</Label>
                      <Input
                        id="staff-name"
                        value={newStaff.name}
                        onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                        className="bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staff-email" className="text-admin-text">メールアドレス</Label>
                      <Input
                        id="staff-email"
                        type="email"
                        value={newStaff.email}
                        onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                        className="bg-white border-neutral-300 text-admin-text focus:border-admin-primary focus:ring-admin-primary rounded-lg"
                      />
                    </div>
                    <Button 
                      onClick={handleAddStaff} 
                      className="w-full bg-admin-secondary hover:bg-admin-secondary/90 text-white rounded-lg"
                    >
                      スタッフを追加
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-neutral-200">
                  <TableHead className="text-admin-text font-medium">名前</TableHead>
                  <TableHead className="text-admin-text font-medium">メール</TableHead>
                  <TableHead className="text-admin-text font-medium">権限</TableHead>
                  <TableHead className="text-admin-text font-medium">ステータス</TableHead>
                  <TableHead className="text-admin-text font-medium">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffMembers.map((staff) => (
                  <TableRow key={staff.id} className="border-neutral-200 hover:bg-neutral-50">
                    <TableCell className="font-medium text-admin-text">{staff.name}</TableCell>
                    <TableCell className="text-admin-text">{staff.email}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`rounded-lg ${
                          staff.role === 'admin' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {staff.role === 'admin' ? '管理者' : 'オペレーター'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={`rounded-lg ${
                          staff.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {staff.status === 'active' ? 'アクティブ' : '非アクティブ'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="border-admin-primary text-admin-primary hover:bg-admin-primary/10 rounded-lg">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {staff.role !== 'admin' && (
                          <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-50 rounded-lg">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
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
