
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const authHelpers = {
  async fetchUserRole(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        return null;
      }

      return data?.role || 'user';
    } catch (err) {
      return 'user';
    }
  },

  async handleLoginSuccess(data: any, navigate: any) {
    if (!data.user) return;
    
    try {
      const role = await this.fetchUserRole(data.user.id);

      setTimeout(() => {
        if (role === 'admin') {
          toast.success("管理者としてログインしました");
          navigate("/admin/dashboard", { replace: true });
        } else {
          toast.success("ログインしました");
          navigate("/mypage", { replace: true });
        }
      }, 100);
      
    } catch (profileErr) {
      setTimeout(() => {
        toast.success("ログインしました");
        navigate("/mypage", { replace: true });
      }, 100);
    }
  }
};
