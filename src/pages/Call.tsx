import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff,
  ArrowLeft,
  Clock,
  User,
  Building2,
  MessageCircle,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - in real app, fetch from Supabase
const mockCase = {
  id: '1',
  company_name: '株式会社サンプル',
  employee_name: '田中一郎',
  status: 'in_progress',
  created_at: '2024-01-15',
  last_contact: '2024-01-20',
};

const mockTranscript = [
  {
    id: 1,
    timestamp: '14:30:15',
    speaker: 'Agent',
    message: 'こんにちは。退職代行フキフキの担当者です。本日はお忙しい中、お時間をいただきありがとうございます。',
  },
  {
    id: 2,
    timestamp: '14:30:45',
    speaker: 'Company',
    message: 'こちらこそ。田中さんの件でご連絡いただいたということですが。',
  },
  {
    id: 3,
    timestamp: '14:31:10',
    speaker: 'Agent',
    message: 'はい。田中一郎様より退職の意思表示を承っており、本日は退職に関する手続きについてご相談させていただきたく。',
  },
  {
    id: 4,
    timestamp: '14:31:35',
    speaker: 'Company',
    message: '承知いたしました。必要な書類等について確認させていただきます。',
  },
];

export default function Call() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  // Timer effect
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
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-body">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link to="/cases">
              <Button variant="outline" size="sm" className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-lg">
                <ArrowLeft className="h-4 w-4 mr-2" />
                案件一覧に戻る
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold font-heading text-neutral-900">通話画面</h1>
              <p className="text-sm text-neutral-600">案件ID: {id}</p>
            </div>
          </div>
          
          {isCallActive && (
            <div className="flex items-center space-x-2 text-neutral-700">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatDuration(callDuration)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Call Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case Info */}
            <Card className="bg-white border-neutral-200 rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-neutral-900">
                  <span>案件情報</span>
                  <Badge className="bg-blue-100 text-blue-800 rounded-lg">進行中</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-neutral-500" />
                    <div>
                      <p className="text-sm text-neutral-600">会社名</p>
                      <p className="font-medium text-neutral-900">{mockCase.company_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-neutral-500" />
                    <div>
                      <p className="text-sm text-neutral-600">従業員名</p>
                      <p className="font-medium text-neutral-900">{mockCase.employee_name}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Area */}
            <Card className="bg-white border-neutral-200 rounded-lg">
              <CardContent className="p-0">
                <div className="relative bg-neutral-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {/* Avatar/Video Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isCallActive ? (
                      <div className="text-center text-white">
                        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <User className="h-12 w-12" />
                        </div>
                        <p className="text-lg font-medium">通話中...</p>
                        <p className="text-sm opacity-75">AI エージェント</p>
                      </div>
                    ) : (
                      <div className="text-center text-neutral-400">
                        <Video className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-lg">通話を開始してください</p>
                      </div>
                    )}
                  </div>

                  {/* Call Status Overlay */}
                  {isCallActive && (
                    <div className="absolute top-4 left-4">
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>通話中</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Call Controls */}
                <div className="p-6 bg-neutral-50 border-t border-neutral-200">
                  <div className="flex items-center justify-center space-x-4">
                    {!isCallActive ? (
                      <Button 
                        onClick={handleStartCall}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 rounded-lg"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        通話開始
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => setIsMuted(!isMuted)}
                          className={isMuted ? "bg-red-100 border-red-300 text-red-700 rounded-lg" : "border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-lg"}
                        >
                          {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                        
                        <Button
                          variant="outline"
                          onClick={() => setIsVideoOn(!isVideoOn)}
                          className={!isVideoOn ? "bg-red-100 border-red-300 text-red-700 rounded-lg" : "border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-lg"}
                        >
                          {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                        </Button>
                        
                        <Button 
                          onClick={handleEndCall}
                          className="bg-red-600 hover:bg-red-700 text-white px-8 rounded-lg"
                        >
                          <PhoneOff className="h-4 w-4 mr-2" />
                          通話終了
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transcript Panel */}
          <div className="space-y-6">
            <Card className="bg-white border-neutral-200 rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-neutral-900">
                  <span className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>通話記録</span>
                  </span>
                  <Button variant="outline" size="sm" className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-lg">
                    <Download className="h-4 w-4" />
                  </Button>
                </CardTitle>
                <CardDescription className="text-neutral-600">
                  リアルタイム音声認識
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-96 p-4">
                  <div className="space-y-4">
                    {mockTranscript.map((entry) => (
                      <div key={entry.id} className="border-l-2 border-neutral-200 pl-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge 
                            variant={entry.speaker === 'Agent' ? 'default' : 'secondary'}
                            className={entry.speaker === 'Agent' ? 'bg-primary text-white rounded-lg' : 'rounded-lg'}
                          >
                            {entry.speaker === 'Agent' ? 'エージェント' : '会社'}
                          </Badge>
                          <span className="text-xs text-neutral-500">{entry.timestamp}</span>
                        </div>
                        <p className="text-sm text-neutral-700">{entry.message}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border-neutral-200 rounded-lg">
              <CardHeader>
                <CardTitle className="text-neutral-900">クイックアクション</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-neutral-300 text-neutral-700 hover:bg-blue-50 rounded-lg">
                  退職日の確認
                </Button>
                <Button variant="outline" className="w-full justify-start border-neutral-300 text-neutral-700 hover:bg-blue-50 rounded-lg">
                  書類の送付依頼
                </Button>
                <Button variant="outline" className="w-full justify-start border-neutral-300 text-neutral-700 hover:bg-blue-50 rounded-lg">
                  有給消化の相談
                </Button>
                <Button variant="outline" className="w-full justify-start border-neutral-300 text-neutral-700 hover:bg-blue-50 rounded-lg">
                  引き継ぎの確認
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
