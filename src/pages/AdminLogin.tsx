
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Simulate admin auth - in real app, use Supabase with role check
    if (email && password) {
      navigate("/admin/dashboard");
    } else {
      setError("管理者ログインに失敗しました。認証情報をご確認ください");
    }
  };

  return (
    <div className="min-h-screen bg-admin-background flex items-center justify-center p-4 font-body">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-admin-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="text-white h-6 w-6" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-admin-text">FUKIFUKI Admin</h1>
          <p className="text-admin-text-secondary text-sm">管理者専用ログイン</p>
        </div>

        <Card className="shadow-lg border-0 bg-admin-background-alt rounded-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-heading text-admin-text">
              管理者ログイン
            </CardTitle>
            <CardDescription className="text-admin-text-secondary">
              管理者アカウントでログインしてください
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2 text-red-700">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-admin-text">メールアドレス</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@fukifuki.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-neutral-300 focus:border-admin-secondary focus:ring-admin-secondary bg-white"
                    required
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-admin-text-secondary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-admin-text">パスワード</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-neutral-300 focus:border-admin-secondary focus:ring-admin-secondary bg-white"
                    required
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-admin-text-secondary" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-admin-text-secondary" />
                    ) : (
                      <Eye className="h-4 w-4 text-admin-text-secondary" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-admin-secondary hover:bg-admin-secondary/90 text-white rounded-lg"
              >
                ログイン
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-admin-text-secondary">
          <Link to="/" className="hover:text-admin-secondary transition-colors">
            ← ユーザーサイトに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
