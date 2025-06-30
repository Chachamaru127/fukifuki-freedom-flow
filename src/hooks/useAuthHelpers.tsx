
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const authHelpers = {
  async fetchUserRole(userId: string) {
    try {
      console.log('Fetching user role for:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }

      console.log('User role fetched:', data?.role);
      return data?.role || 'user';
    } catch (err) {
      console.error('Error in fetchUserRole:', err);
      return 'user';
    }
  },

  async handleLoginSuccess(data: any, navigate: any) {
    if (!data.user) return;

    console.log('Login successful, user:', data.user.id);
    
    try {
      const role = await this.fetchUserRole(data.user.id);
      console.log('User role:', role);

      // Use setTimeout to ensure state updates are processed before navigation
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
      console.error('Profile error:', profileErr);
      // Fallback to user page if role fetch fails
      setTimeout(() => {
        toast.success("ログインしました");
        navigate("/mypage", { replace: true });
      }, 100);
    }
  }
};
