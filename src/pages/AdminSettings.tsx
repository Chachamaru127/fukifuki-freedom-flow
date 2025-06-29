
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Key, 
  Users, 
  Bell, 
  Mail,
  Shield,
  Database,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import { AdminNavigation } from "@/components/AdminNavigation";

const staffMembers = [
  { id: 1, name: '田中一郎', email: 'tanaka@fukifuki.com', role: 'admin', status: 'active' },
  { id: 2, name: '佐藤花子', email: 'sato@fukifuki.com', role: 'staff', status: 'active' },
  { id: 3, name: '鈴木太郎', email: 'suzuki@fukifuki.com', role: 'staff', status: 'inactive' },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    autoResponse: true,
    maintenanceMode: false,
  });

  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'OpenAI API', key: 'sk-***...***', status: 'active' },
    { id: 2, name: 'Twilio API', key: 'AC***...***', status: 'active' },
    { id: 3, name: 'SendGrid API', key: 'SG***...***', status: 'inactive' },
  ]);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-admin-primary/20 text-admin-primary">管理者</Badge>;
      case 'staff':
        return <Badge className="bg-admin-secondary/20 text-admin-secondary">スタッフ</Badge>;
      default:
        return <Badge variant="outline" className="border-admin-surface text-admin-text-secondary">不明</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-900 text-green-200">有効</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-700 text-gray-300">無効</Badge>;
      default:
        return <Badge variant="outline" className="border-admin-surface text-admin-text-secondary">不明</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-admin-background font-body">
      <AdminNavigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-heading text-admin-text">システム設定</h1>
          <p className="text-admin-text-secondary">アプリケーションの設定を管理します</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* API Key Management */}
          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader>
              <CardTitle className="text-admin-text flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <span>APIキー管理</span>
              </CardTitle>
              <CardDescription className="text-admin-text-secondary">
                外部サービスとの接続設定
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((api) => (
                  <div key={api.id} className="flex items-center justify-between p-3 border border-admin-surface rounded-lg bg-admin-background">
                    <div className="space-y-1">
                      <p className="font-medium text-admin-text">{api.name}</p>
                      <p className="text-sm text-admin-text-secondary font-mono">{api.key}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(api.status)}
                      <Button variant="ghost" size="sm" className="text-admin-text-secondary hover:text-admin-text">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full bg-admin-primary hover:bg-admin-primary/90 text-white rounded-lg">
                  <Plus className="mr-2 h-4 w-4" />
                  新しいAPIキーを追加
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader>
              <CardTitle className="text-admin-text flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>通知設定</span>
              </CardTitle>
              <CardDescription className="text-admin-text-secondary">
                システム通知の設定
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-admin-text">メール通知</Label>
                  <p className="text-sm text-admin-text-secondary">新規案件や重要な更新をメールで通知</p>
                </div>
                <Switch 
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-admin-text">SMS通知</Label>
                  <p className="text-sm text-admin-text-secondary">緊急案件をSMSで通知</p>
                </div>
                <Switch 
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-admin-text">自動応答</Label>
                  <p className="text-sm text-admin-text-secondary">営業時間外の自動応答を有効化</p>
                </div>
                <Switch 
                  checked={settings.autoResponse}
                  onCheckedChange={(checked) => setSettings({...settings, autoResponse: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-admin-text">メンテナンスモード</Label>
                  <p className="text-sm text-admin-text-secondary">システムメンテナンス中表示</p>
                </div>
                <Switch 
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Management */}
        <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
          <CardHeader>
            <CardTitle className="text-admin-text flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>スタッフアカウント管理</span>
              </div>
              <Button className="bg-admin-primary hover:bg-admin-primary/90 text-white rounded-lg">
                <Plus className="mr-2 h-4 w-4" />
                新規スタッフ追加
              </Button>
            </CardTitle>
            <CardDescription className="text-admin-text-secondary">
              システムにアクセスできるスタッフアカウントの管理
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffMembers.map((staff) => (
                <div key={staff.id} className="flex items-center justify-between p-4 border border-admin-surface rounded-lg bg-admin-background">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-admin-text">{staff.name}</p>
                      {getRoleBadge(staff.role)}
                    </div>
                    <p className="text-sm text-admin-text-secondary">{staff.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(staff.status)}
                    <Button variant="ghost" size="sm" className="text-admin-text-secondary hover:text-admin-text">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader>
              <CardTitle className="text-admin-text flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>システム設定</span>
              </CardTitle>
              <CardDescription className="text-admin-text-secondary">
                基本的なシステム設定
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-admin-text">サイト名</Label>
                <Input 
                  defaultValue="FUKIFUKI - 退職代行サービス"
                  className="bg-admin-background border-admin-surface text-admin-text focus:border-admin-primary"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-admin-text">営業時間</Label>
                <Select defaultValue="9-18">
                  <SelectTrigger className="bg-admin-background border-admin-surface text-admin-text">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-admin-background-alt border-admin-surface">
                    <SelectItem value="9-18">9:00 - 18:00</SelectItem>
                    <SelectItem value="24h">24時間対応</SelectItem>
                    <SelectItem value="custom">カスタム設定</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-admin-text">メンテナンス通知</Label>
                <Textarea 
                  placeholder="メンテナンス中に表示するメッセージ..."
                  className="bg-admin-background border-admin-surface text-admin-text focus:border-admin-primary"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-admin-background-alt rounded-lg border-admin-surface">
            <CardHeader>
              <CardTitle className="text-admin-text flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>セキュリティ設定</span>
              </CardTitle>
              <CardDescription className="text-admin-text-secondary">
                システムのセキュリティ設定
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-admin-text">セッション時間（分）</Label>
                <Input 
                  type="number"
                  defaultValue="120"
                  className="bg-admin-background border-admin-surface text-admin-text focus:border-admin-primary"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-admin-text">パスワード有効期限（日）</Label>
                <Input 
                  type="number"
                  defaultValue="90"
                  className="bg-admin-background border-admin-surface text-admin-text focus:border-admin-primary"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-admin-text">ログイン試行回数</Label>
                <Select defaultValue="5">
                  <SelectTrigger className="bg-admin-background border-admin-surface text-admin-text">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-admin-background-alt border-admin-surface">
                    <SelectItem value="3">3回</SelectItem>
                    <SelectItem value="5">5回</SelectItem>
                    <SelectItem value="10">10回</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-admin-primary hover:bg-admin-primary/90 text-white rounded-lg px-8">
            設定を保存
          </Button>
        </div>
      </div>
    </div>
  );
}
