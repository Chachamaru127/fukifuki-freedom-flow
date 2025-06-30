
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Mail, User, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserNavigation } from "@/components/UserNavigation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      if (!formData.agreeToTerms) {
        setError("利用規約に同意してください");
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError("パスワードが一致しません");
        return;
      }

      if (formData.password.length < 6) {
        setError("パスワードは6文字以上で入力してください");
        return;
      }
      
      if (!formData.email || !formData.password || !formData.name || !formData.phone) {
        setError("すべての必須項目を入力してください");
        return;
      }

      // Supabaseでユーザーを作成
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: formData.name,
          }
        }
      });

      if (signUpError) {
        if (signUpError.message.includes('User already registered')) {
          setError("このメールアドレスは既に登録されています");
        } else {
          setError(signUpError.message);
        }
        return;
      }

      if (data.user) {
        // プロフィール情報を更新
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            phone: formData.phone,
          })
          .eq('id', data.user.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
          // プロフィール更新エラーは致命的ではないため、続行
        }

        toast.success("アカウントが作成されました！");
        navigate("/mypage");
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError("アカウント作成中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-user-primary/5 to-user-background-alt font-body">
      <UserNavigation />
      
      <div className="flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-0 bg-white rounded-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-heading text-user-text">
                新規アカウント作成
              </CardTitle>
              <CardDescription className="text-user-text-secondary">
                FUKIFUKIのサービスをご利用いただくため、アカウントを作成してください
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
                  <Label htmlFor="name" className="text-user-text">お名前 *</Label>
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      placeholder="山田太郎"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="pl-10 border-gray-300 focus:border-user-primary focus:ring-user-primary"
                      required
                      disabled={loading}
                    />
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-user-text">メールアドレス *</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-10 border-gray-300 focus:border-user-primary focus:ring-user-primary"
                      required
                      disabled={loading}
                    />
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-user-text">電話番号 *</Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="090-1234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="pl-10 border-gray-300 focus:border-user-primary focus:ring-user-primary"
                      required
                      disabled={loading}
                    />
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-user-text">パスワード *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="border-gray-300 focus:border-user-primary focus:ring-user-primary"
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-user-text">パスワード確認 *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="border-gray-300 focus:border-user-primary focus:ring-user-primary"
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: checked as boolean})}
                    disabled={loading}
                  />
                  <Label htmlFor="terms" className="text-sm text-user-text-secondary">
                    <Link to="/terms" className="text-user-primary hover:underline">利用規約</Link>と
                    <Link to="/privacy" className="text-user-primary hover:underline">プライバシーポリシー</Link>に同意します
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-user-primary hover:bg-user-primary/90 text-white rounded-lg"
                  disabled={loading}
                >
                  {loading ? "作成中..." : "アカウントを作成"}
                </Button>
              </form>

              <div className="text-center text-sm text-user-text-secondary">
                すでにアカウントをお持ちですか？{" "}
                <Link to="/login" className="text-user-primary hover:underline">
                  ログインはこちら
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
