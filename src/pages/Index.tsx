import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, CheckCircle, Users, Shield, Clock, Star, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const testimonials = [
  {
    name: "田中様",
    company: "IT企業",
    text: "パワハラに悩んでいましたが、フキフキのおかげで円満に退職できました。対応も迅速で、とても助かりました。",
    rating: 5,
  },
  {
    name: "佐藤様", 
    company: "製造業",
    text: "上司との関係が悪化し、自分では退職を言い出せませんでした。プロにお任せして本当に良かったです。",
    rating: 5,
  },
  {
    name: "山田様",
    company: "サービス業", 
    text: "退職の意思を伝えるのが怖くて悩んでいましたが、フキフキが全て代行してくれて安心できました。",
    rating: 5,
  },
];

const faqs = [
  {
    question: "退職代行の費用はいくらですか？",
    answer: "一律29,800円（税込）で承っております。追加料金は一切発生しません。",
  },
  {
    question: "本当に退職できるのですか？",
    answer: "これまで100%の成功率を誇っております。法的根拠に基づいた適切な手続きで確実に退職いたします。",
  },
  {
    question: "即日対応は可能ですか？",
    answer: "はい、ご相談いただいた当日からの対応が可能です。緊急性の高いケースも柔軟に対応いたします。",
  },
  {
    question: "会社に連絡されることはありますか？",
    answer: "お客様に直接連絡が行くことは一切ありません。全ての連絡は弊社が代行いたします。",
  },
];

export default function Index() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-user-background font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-200 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-heading font-bold text-2xl text-user-primary">
            FUKIFUKI
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-user-text-secondary hover:text-user-primary transition-colors">
              サービス
            </a>
            <a href="#how-it-works" className="text-user-text-secondary hover:text-user-primary transition-colors">
              ご利用の流れ
            </a>
            <a href="#testimonials" className="text-user-text-secondary hover:text-user-primary transition-colors">
              お客様の声
            </a>
            <a href="#faq" className="text-user-text-secondary hover:text-user-primary transition-colors">
              よくある質問
            </a>
            <ThemeToggle />
            <Link to="/login">
              <Button variant="outline" className="border-user-primary text-user-primary hover:bg-user-primary hover:text-white rounded-lg">ログイン</Button>
            </Link>
          </nav>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-200">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <a href="#features" className="block text-user-text-secondary hover:text-user-primary transition-colors">
                サービス
              </a>
              <a href="#how-it-works" className="block text-user-text-secondary hover:text-user-primary transition-colors">
                ご利用の流れ
              </a>
              <a href="#testimonials" className="block text-user-text-secondary hover:text-user-primary transition-colors">
                お客様の声
              </a>
              <a href="#faq" className="block text-user-text-secondary hover:text-user-primary transition-colors">
                よくある質問
              </a>
              <Link to="/login" className="block">
                <Button variant="outline" className="w-full border-user-primary text-user-primary hover:bg-user-primary hover:text-white rounded-lg">ログイン</Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-neutral-50">
        
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-user-primary/10 text-user-primary border-user-primary/20 rounded-lg">
                  24時間365日対応
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-user-text font-heading">
                  退職の悩み、
                  <br />
                  <span className="text-user-primary">プロが解決</span>
                </h1>
                <p className="text-xl text-user-text-secondary leading-relaxed">
                  言いづらい退職の意思表示を、労働問題のプロが代行します。
                  <br />
                  確実・迅速・安心の退職代行サービス
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button 
                    size="lg" 
                    className="bg-user-accent text-user-text hover:bg-user-accent/90 text-lg px-8 py-4 h-auto rounded-lg shadow-lg"
                  >
                    無料で相談する
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-user-primary text-user-primary hover:bg-user-primary hover:text-white text-lg px-8 py-4 h-auto rounded-lg"
                >
                  サービス詳細
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-user-text-secondary">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-user-secondary" />
                  <span>成功率100%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-user-secondary" />
                  <span>即日対応可能</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-user-secondary" />
                  <span>追加料金なし</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-white/50 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/60 shadow-lg">
                <div className="text-8xl opacity-60">🤝</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-user-accent text-user-text px-4 py-2 rounded-lg font-semibold shadow-lg">
                相談料0円
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-user-background-alt">
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-user-text">
              フキフキが選ばれる理由
            </h2>
            <p className="text-user-text-secondary text-lg max-w-2xl mx-auto">
              多くのお客様に選ばれる、3つの安心ポイント
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow bg-user-background">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-user-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-user-primary" />
                </div>
                <CardTitle className="text-xl text-user-text">確実性</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-user-text-secondary leading-relaxed">
                  労働法の専門知識を持つプロが対応。これまで100%の成功率で、確実に退職手続きを完了させています。
                </p>
              </CardContent>
              <div className="absolute top-0 right-0 w-20 h-20 bg-user-primary/5 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow bg-user-background">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-user-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-user-accent" />
                </div>
                <CardTitle className="text-xl text-user-text">迅速対応</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-user-text-secondary leading-relaxed">
                  24時間365日受付対応。ご相談をいただいてから最短当日での対応が可能です。緊急性の高いケースも安心。
                </p>
              </CardContent>
              <div className="absolute top-0 right-0 w-20 h-20 bg-user-accent/5 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow bg-user-background">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-user-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-user-secondary" />
                </div>
                <CardTitle className="text-xl text-user-text">完全サポート</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-user-text-secondary leading-relaxed">
                  退職の意思表示から必要書類の受領まで、退職に関わる全ての手続きを代行。お客様が会社と直接やり取りする必要はありません。
                </p>
              </CardContent>
              <div className="absolute top-0 right-0 w-20 h-20 bg-user-secondary/5 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-user-background">
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-user-text">
              ご利用の流れ
            </h2>
            <p className="text-user-text-secondary text-lg max-w-2xl mx-auto">
              簡単3ステップで退職手続きが完了
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center relative">
              <div className="w-16 h-16 bg-user-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4 text-user-text">無料相談</h3>
              <p className="text-user-text-secondary leading-relaxed">
                LINEやお電話で現在の状況をお聞かせください。相談は完全無料です。
              </p>
              <div className="hidden md:block absolute top-8 -right-4 text-2xl text-user-primary">
                →
              </div>
            </div>

            <div className="text-center relative">
              <div className="w-16 h-16 bg-user-accent rounded-full flex items-center justify-center text-user-text font-bold text-xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4 text-user-text">お申し込み</h3>
              <p className="text-user-text-secondary leading-relaxed">
                サービス内容にご納得いただけましたら、正式にお申し込みください。
              </p>
              <div className="hidden md:block absolute top-8 -right-4 text-2xl text-user-accent">
                →
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-user-secondary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4 text-user-text">退職完了</h3>
              <p className="text-user-text-secondary leading-relaxed">
                弊社が会社との連絡を代行し、退職手続きを完了させます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-user-background-alt">
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-user-text">
              お客様の声
            </h2>
            <p className="text-user-text-secondary text-lg max-w-2xl mx-auto">
              実際にご利用いただいたお客様からの声
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="p-8 text-center bg-user-background">
              <CardContent className="space-y-6">
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-lg leading-relaxed italic text-user-text-secondary">
                  "{testimonials[currentTestimonial].text}"
                </p>
                
                <div className="pt-4 border-t">
                  <p className="font-semibold text-user-text">{testimonials[currentTestimonial].name}</p>
                  <p className="text-user-text-secondary text-sm">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-user-primary' : 'bg-neutral-300'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-user-background">
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-user-text">
              よくある質問
            </h2>
            <p className="text-user-text-secondary text-lg max-w-2xl mx-auto">
              お客様からよくいただくご質問
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6 bg-user-background">
                <CardHeader className="pb-3 px-0">
                  <CardTitle className="text-lg flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-user-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      Q
                    </span>
                    <span className="text-user-text">{faq.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-user-accent text-user-text rounded-full flex items-center justify-center text-sm font-bold">
                      A
                    </span>
                    <p className="text-user-text-secondary leading-relaxed">{faq.answer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-neutral-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-user-text font-heading">
              退職の悩み、一人で抱え込まないでください
            </h2>
            <p className="text-xl text-user-text-secondary leading-relaxed">
              プロのサポートで確実・安心な退職を実現します。
              <br />
              まずは無料相談からお気軽にどうぞ。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-user-accent text-user-text hover:bg-user-accent/90 text-lg px-8 py-4 h-auto rounded-lg shadow-lg"
                >
                  無料で相談する
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-user-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-user-primary">FUKIFUKI</h3>
              <p className="text-user-text-secondary leading-relaxed">
                確実・迅速・安心の退職代行サービス
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-user-text">サービス</h4>
              <div className="space-y-2 text-user-text-secondary">
                <p>退職代行</p>
                <p>労働相談</p>
                <p>アフターサポート</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-user-text">お問い合わせ</h4>
              <div className="space-y-2 text-user-text-secondary">
                <p>TEL: 0120-XXX-XXX</p>
                <p>EMAIL: info@fukifuki.app</p>
                <p>受付時間: 24時間365日</p>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-user-text-secondary">
            <p>&copy; 2024 FUKIFUKI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
