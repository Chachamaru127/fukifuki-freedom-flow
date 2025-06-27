
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  Settings,
  ArrowLeft,
  Clock,
  User,
  Building2
} from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { toast } from "sonner";

const mockTranscript = [
  { timestamp: "14:30:15", speaker: "Agent", text: "こんにちは、FUKIFUKIです。本日は退職代行のご相談をいただき、ありがとうございます。" },
  { timestamp: "14:30:32", speaker: "User", text: "はい、よろしくお願いします。会社を辞めたいのですが、直接言うのが難しくて..." },
  { timestamp: "14:30:45", speaker: "Agent", text: "承知いたしました。まず、現在のお勤め先について詳しく教えていただけますでしょうか。" },
  { timestamp: "14:31:02", speaker: "User", text: "株式会社サンプルという会社で営業として働いています。入社して2年ほどになります。" },
  { timestamp: "14:31:20", speaker: "Agent", text: "ありがとうございます。退職をご希望される理由について、差し支えない範囲でお聞かせください。" },
  { timestamp: "14:31:38", speaker: "User", text: "上司との関係が悪化してしまい、毎日会社に行くのがとても辛いです。" },
  { timestamp: "14:31:55", speaker: "Agent", text: "大変お辛い状況ですね。弊社では、お客様に代わって適切に退職の意思をお伝えし、円滑な手続きを進めさせていただきます。" },
];

const mockCaseData = {
  id: '1',
  company: '株式会社サンプル',
  status: 'in_progress',
  createdAt: '2024-01-15',
  clientName: '山田太郎',
  clientPhone: '090-1234-5678',
  notes: '上司との関係悪化により退職希望。営業職、勤続2年。'
};

export default function Call() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [transcript, setTranscript] = useState(mockTranscript);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    setCallDuration(0);
    toast.success("通話を開始しました");
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    toast.success("通話を終了しました");
    // Simulate saving call results
    setTimeout(() => {
      navigate('/cases');
    }, 2000);
  };

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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/cases')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                案件一覧に戻る
              </Button>
              <div>
                <h1 className="text-3xl font-bold font-heading">通話 - 案件 #{id}</h1>
                <p className="text-muted-foreground">{mockCaseData.company}</p>
              </div>
            </div>
            {getStatusBadge(mockCaseData.status)}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Call Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Display */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg relative overflow-hidden">
                    {isCallActive ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto">
                            <User className="h-12 w-12 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">FUKIFUKIエージェント</h3>
                            <p className="text-muted-foreground">通話中...</p>
                          </div>
                          <div className="flex items-center justify-center space-x-2 text-lg font-mono">
                            <Clock className="h-4 w-4" />
                            <span>{formatDuration(callDuration)}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
                            <Phone className="h-12 w-12 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">通話待機中</h3>
                            <p className="text-muted-foreground">通話を開始してください</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Call Controls Overlay */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-full p-2">
                        <Button
                          variant={isMuted ? "destructive" : "secondary"}
                          size="sm"
                          onClick={() => setIsMuted(!isMuted)}
                          disabled={!isCallActive}
                        >
                          {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                        
                        <Button
                          variant={isCameraOff ? "destructive" : "secondary"}
                          size="sm"
                          onClick={() => setIsCameraOff(!isCameraOff)}
                          disabled={!isCallActive}
                        >
                          {isCameraOff ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
                        </Button>
                        
                        <Button variant="secondary" size="sm" disabled={!isCallActive}>
                          <Settings className="h-4 w-4" />
                        </Button>
                        
                        {isCallActive ? (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={handleEndCall}
                          >
                            <PhoneOff className="h-4 w-4" />
                            通話終了
                          </Button>
                        ) : (
                          <Button 
                            className="bg-green-600 hover:bg-green-700 text-white"
                            size="sm"
                            onClick={handleStartCall}
                          >
                            <Phone className="h-4 w-4" />
                            通話開始
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transcript */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>通話記録</span>
                    {isCallActive && (
                      <Badge variant="secondary" className="animate-pulse">
                        録音中
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    リアルタイムで通話内容が記録されます
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {transcript.map((entry, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant={entry.speaker === 'Agent' ? 'default' : 'secondary'}>
                              {entry.speaker === 'Agent' ? 'エージェント' : 'お客様'}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{entry.timestamp}</span>
                          </div>
                          <p className="text-sm leading-relaxed pl-4 border-l-2 border-muted">
                            {entry.text}
                          </p>
                          {index < transcript.length - 1 && <Separator className="my-2" />}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Case Details Sidebar */}
            <div className="space-y-6">
              {/* Case Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5" />
                    <span>案件情報</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">会社名</Label>
                    <p className="font-medium">{mockCaseData.company}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">お客様名</Label>
                    <p className="font-medium">{mockCaseData.clientName}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">電話番号</Label>
                    <p className="font-medium">{mockCaseData.clientPhone}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">ステータス</Label>
                    <div className="mt-1">
                      {getStatusBadge(mockCaseData.status)}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">作成日</Label>
                    <p className="font-medium">{mockCaseData.createdAt}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Case Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>案件メモ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{mockCaseData.notes}</p>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>クイックアクション</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    メモを追加
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    ステータス更新
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    書類アップロード
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

function Label({ className, children, ...props }: { className?: string; children: React.ReactNode; [key: string]: any }) {
  return (
    <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ''}`} {...props}>
      {children}
    </label>
  );
}
