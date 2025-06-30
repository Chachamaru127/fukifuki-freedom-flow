
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log('Attempting login with:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        setError("ログインに失敗しました。メールアドレスとパスワードをご確認ください");
        return;
      }

      if (data.user) {
        console.log('Login successful, user:', data.user.id);
        
        try {
          // Get user role
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();

          if (profileError) {
            console.error('Profile fetch error:', profileError);
            setError("ユーザー情報の取得に失敗しました");
            return;
          }

          console.log('User role:', profile?.role);

          // Use setTimeout to ensure state updates are processed before navigation
          setTimeout(() => {
            // Redirect based on role
            if (profile?.role === 'admin') {
              toast.success("管理者としてログインしました");
              navigate("/admin/dashboard", { replace: true });
            } else {
              toast.success("ログインしました");
              navigate("/mypage", { replace: true });
            }
          }, 100);
          
        } catch (profileErr) {
          console.error('Profile error:', profileErr);
          setError("プロフィール取得中にエラーが発生しました");
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError("ログイン中にエラーが発生しました");
    } finally {
      // Ensure loading is always set to false
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log('Attempting signup with:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/mypage`,
          data: {
            name: name,
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        if (error.message.includes('already registered')) {
          setError("このメールアドレスは既に登録されています");
        } else {
          setError("アカウント作成に失敗しました。入力内容をご確認ください");
        }
        return;
      }

      if (data.user) {
        console.log('Signup successful, user:', data.user.id);
        toast.success("アカウントが作成されました。確認メールをご確認ください");
        navigate("/mypage", { replace: true });
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError("アカウント作成中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = isSignUp ? handleSignUp : handleSignIn;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-neutral-50 flex items-center justify-center p-4 font-body">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl font-heading">F</span>
            </div>
            <h1 className="text-2xl font-heading font-bold text-neutral-900">FUKIFUKI</h1>
            <p className="text-neutral-600 text-sm">退職代行サービス</p>
          </Link>
        </div>

        <Card className="shadow-lg border-0 bg-white rounded-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-heading text-neutral-900">
              {isSignUp ? "アカウント作成" : "ログイン"}
            </CardTitle>
            <CardDescription className="text-neutral-600">
              {isSignUp 
                ? "新しいアカウントを作成してください" 
                : "メールアドレスとパスワードでログインしてください"
              }
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
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-neutral-900">お名前</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="山田太郎"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-neutral-300 focus:border-primary focus:ring-primary"
                    required={isSignUp}
                    disabled={loading}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-neutral-900">メールアドレス</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-neutral-300 focus:border-primary focus:ring-primary"
                    required
                    disabled={loading}
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-neutral-900">パスワード</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-neutral-300 focus:border-primary focus:ring-primary"
                    required
                    disabled={loading}
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-neutral-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-neutral-500" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg"
                disabled={loading}
              >
                {loading ? "処理中..." : (isSignUp ? "アカウント作成" : "ログイン")}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-neutral-600">または</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-accent-light border-accent text-accent hover:bg-accent-light/80 rounded-lg"
              onClick={() => setIsSignUp(!isSignUp)}
              disabled={loading}
            >
              {isSignUp ? "既存アカウントでログイン" : "新規アカウント作成"}
            </Button>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-neutral-600">
          <Link to="/" className="hover:text-primary transition-colors">
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
