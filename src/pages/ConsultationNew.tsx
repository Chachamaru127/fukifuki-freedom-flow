
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Building2, Calendar as CalendarIcon, User } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { UserNavigation } from "@/components/UserNavigation";

export default function ConsultationNew() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    employeeId: "",
    department: "",
    position: "",
    employmentType: "",
    startDate: "",
    desiredExitDate: null as Date | null,
    reason: "",
    specialNotes: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!formData.companyName || !formData.desiredExitDate) {
      setError("必須項目を入力してください");
      return;
    }
    
    // Simulate form submission - in real app, use Supabase
    console.log("Creating consultation:", formData);
    navigate("/mypage");
  };

  return (
    <div className="min-h-screen bg-user-background-alt font-body">
      <UserNavigation />
      
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-heading text-user-text">新規相談申込</h1>
          <p className="text-user-text-secondary">退職代行サービスのお申込みフォームです</p>
        </div>

        <Card className="bg-white rounded-lg border-gray-200">
          <CardHeader>
            <CardTitle className="text-user-text">退職先企業情報</CardTitle>
            <CardDescription className="text-user-text-secondary">
              退職を希望される企業の情報を入力してください
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2 text-red-700">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-user-text flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>企業情報</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-user-text">会社名 *</Label>
                    <Input
                      id="companyName"
                      placeholder="株式会社○○"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className="border-gray-300 focus:border-user-primary focus:ring-user-primary"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyAddress" className="text-user-text">所在地</Label>
                    <Input
                      id="companyAddress"
                      placeholder="東京都○○区○○"
                      value={formData.companyAddress}
                      onChange={(e) => setFormData({...formData, companyAddress: e.target.value})}
                      className="border-gray-300 focus:border-user-primary focus:ring-user-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Employment Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-user-text flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>雇用情報</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId" className="text-user-text">社員番号</Label>
                    <Input
                      id="employeeId"
                      placeholder="例: A12345"
                      value={formData.employeeId}
                      onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                      className="border-gray-300 focus:border-user-primary focus:ring-user-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-user-text">部署</Label>
                    <Input
                      id="department"
                      placeholder="営業部"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="border-gray-300 focus:border-user-primary focus:ring-user-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-user-text">役職</Label>
                    <Input
                      id="position"
                      placeholder="主任"
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      className="border-gray-300 focus:border-user-primary focus:ring-user-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employmentType" className="text-user-text">雇用形態</Label>
                    <Select value={formData.employmentType} onValueChange={(value) => setFormData({...formData, employmentType: value})}>
                      <SelectTrigger className="border-gray-300 focus:border-user-primary focus:ring-user-primary">
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">正社員</SelectItem>
                        <SelectItem value="contract">契約社員</SelectItem>
                        <SelectItem value="parttime">パート・アルバイト</SelectItem>
                        <SelectItem value="temporary">派遣社員</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-user-text">入社日</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="border-gray-300 focus:border-user-primary focus:ring-user-primary"
                  />
                </div>
              </div>

              {/* Exit Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-user-text flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>退職希望情報</span>
                </h3>
                
                <div className="space-y-2">
                  <Label className="text-user-text">希望退職日 *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left border-gray-300 hover:border-user-primary"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.desiredExitDate ? (
                          format(formData.desiredExitDate, "PPP", { locale: ja })
                        ) : (
                          <span>日付を選択してください</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.desiredExitDate}
                        onSelect={(date) => setFormData({...formData, desiredExitDate: date})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason" className="text-user-text">退職理由</Label>
                  <Textarea
                    id="reason"
                    placeholder="退職を希望される理由をお聞かせください"
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    className="border-gray-300 focus:border-user-primary focus:ring-user-primary"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialNotes" className="text-user-text">特記事項</Label>
                  <Textarea
                    id="specialNotes"
                    placeholder="その他、ご相談したいことがあればお書きください"
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({...formData, specialNotes: e.target.value})}
                    className="border-gray-300 focus:border-user-primary focus:ring-user-primary"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-user-primary hover:bg-user-primary/90 text-white rounded-lg"
                >
                  相談を申し込む
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/mypage")}
                  className="flex-1 border-gray-300 text-user-text hover:bg-gray-50 rounded-lg"
                >
                  キャンセル
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
