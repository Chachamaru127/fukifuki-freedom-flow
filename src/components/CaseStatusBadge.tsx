
import { Badge } from "@/components/ui/badge";

interface CaseStatusBadgeProps {
  status: string;
}

export function CaseStatusBadge({ status }: CaseStatusBadgeProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-user-secondary/20 text-user-secondary rounded-lg">完了</Badge>;
      case 'negotiating':
        return <Badge className="bg-user-primary/20 text-user-primary rounded-lg">交渉中</Badge>;
      case 'hearing':
        return <Badge className="bg-user-accent/20 text-user-accent rounded-lg">ヒアリング</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 rounded-lg">下書き</Badge>;
      case 'submitted':
        return <Badge className="bg-blue-100 text-blue-800 rounded-lg">申込済み</Badge>;
      default:
        return <Badge variant="outline" className="rounded-lg">不明</Badge>;
    }
  };

  return getStatusBadge(status);
}
