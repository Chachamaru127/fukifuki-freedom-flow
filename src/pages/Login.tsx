
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Simulate auth - in real app, use Supabase
    if (email && password) {
      navigate("/dashboard");
    } else {
      setError("ログインに失敗しました。メールアドレスとパスワードをご確認ください");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <h1 className="text-2xl font-heading font-bold text-neutral-900">FUKIFUKI</h1>
            <p className="text-neutral-600 text-sm">退職代行サービス</p>
          </Link>
        </div>

        <Card className="shadow-lg border-0">
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
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
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
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                {isSignUp ? "アカウント作成" : "ログイン"}
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
              className="w-full border-neutral-300 text-neutral-900 hover:bg-neutral-50"
              onClick={() => setIsSignUp(!isSignUp)}
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
