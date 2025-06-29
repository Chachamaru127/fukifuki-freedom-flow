
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building2, 
  Calendar, 
  User, 
  MessageCircle, 
  Phone,
  CheckCircle,
  Clock,
  FileText,
  Send
} from "lucide-react";
import { UserNavigation } from "@/components/UserNavigation";

const mockConsultation = {
  id: '1',
  company: '株式会社サンプル',
  status: 'negotiating',
  progress: 60,
  createdAt: '2024-01-20',
  expectedDate: '2024-02-15',
  steps: [
    { id: 1, title: '申込受付', status: 'completed', date: '2024-01-20' },
    { id: 2, title: 'ヒアリング', status: 'completed', date: '2024-01-22' },
    { id: 3, title: '交渉中', status: 'current', date: '2024-01-25' },
    { id: 4, title: '完了', status: 'pending', date: null },
  ],
  messages: [
    {
      id: 1,
      sender: 'staff',
      message: 'お申込みありがとうございます。担当の田中です。',
      timestamp: '2024-01-20 10:00',
    },
    {
      id: 2,
      sender: 'user',
      message: 'よろしくお願いします。',
      timestamp: '2024-01-20 10:05',
    },
    {
      id: 3,
      sender: 'staff', 
      message: '企業との交渉を開始いたします。進捗は随時ご報告させていただきます。',
      timestamp: '2024-01-25 14:30',
    },
  ]
};

export default function ConsultationDetail() {
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState("");

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-user-secondary" />;
      case 'current':
        return <Clock className="h-5 w-5 text-user-primary" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-user-secondary';
      case 'current':
        return 'text-user-primary';
      default:
        return 'text-gray-400';
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, send message via Supabase
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-user-background-alt font-body">
      <UserNavigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-heading text-user-text">相談詳細</h1>
            <p className="text-user-text-secondary">ID: {id}</p>
          </div>
          
          <div className="flex space-x-3">
            <Button className="bg-user-secondary hover:bg-user-secondary/90 text-white rounded-lg">
              <Phone className="mr-2 h-4 w-4" />
              AI相談予約
            </Button>
            <Button variant="outline" className="border-user-primary text-user-primary hover:bg-user-primary/5 rounded-lg">
              <FileText className="mr-2 h-4 w-4" />
              資料ダウンロード
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <Card className="bg-white rounded-lg border-gray-200">
              <CardHeader>
                <CardTitle className="text-user-text">進捗状況</CardTitle>
                <CardDescription className="text-user-text-secondary">
                  現在の手続き状況をご確認いただけます
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-user-text-secondary">完了率</span>
                    <span className="text-user-text font-medium">{mockConsultation.progress}%</span>
                  </div>
                  <Progress value={mockConsultation.progress} className="mb-6" />
                  
                  <div className="space-y-4">
                    {mockConsultation.steps.map((step, index) => (
                      <div key={step.id} className="flex items-center space-x-4">
                        {getStepIcon(step.status)}
                        <div className="flex-1">
                          <div className={`font-medium ${getStepColor(step.status)}`}>
                            {step.title}
                          </div>
                          {step.date && (
                            <div className="text-sm text-user-text-secondary">
                              {step.date}
                            </div>
                          )}
                        </div>
                        {step.status === 'current' && (
                          <Badge className="bg-user-primary/20 text-user-primary rounded-lg">
                            進行中
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chat History */}
            <Card className="bg-white rounded-lg border-gray-200">
              <CardHeader>
                <CardTitle className="text-user-text flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>メッセージ履歴</span>
                </CardTitle>
                <CardDescription className="text-user-text-secondary">
                  担当スタッフとのやり取り
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4">
                  {mockConsultation.messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-user-primary text-white' 
                          : 'bg-gray-100 text-user-text'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-white/70' : 'text-user-text-secondary'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Textarea
                    placeholder="メッセージを入力..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border-gray-300 focus:border-user-primary focus:ring-user-primary"
                    rows={2}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-user-primary hover:bg-user-primary/90 text-white rounded-lg"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Case Info */}
            <Card className="bg-white rounded-lg border-gray-200">
              <CardHeader>
                <CardTitle className="text-user-text">案件情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-user-text-secondary" />
                  <span className="text-user-text">{mockConsultation.company}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-user-text-secondary" />
                  <div className="text-sm">
                    <div className="text-user-text">申込日: {mockConsultation.createdAt}</div>
                    <div className="text-user-text-secondary">予定日: {mockConsultation.expectedDate}</div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <Badge className="bg-user-primary/20 text-user-primary rounded-lg">
                    交渉中
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white rounded-lg border-gray-200">
              <CardHeader>
                <CardTitle className="text-user-text">クイックアクション</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full border-user-primary text-user-primary hover:bg-user-primary/5 rounded-lg">
                  <Phone className="mr-2 h-4 w-4" />
                  緊急連絡
                </Button>
                <Button variant="outline" className="w-full border-gray-300 text-user-text hover:bg-gray-50 rounded-lg">
                  <FileText className="mr-2 h-4 w-4" />
                  資料請求
                </Button>
                <Button variant="outline" className="w-full border-gray-300 text-user-text hover:bg-gray-50 rounded-lg">
                  <Calendar className="mr-2 h-4 w-4" />
                  面談予約
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
