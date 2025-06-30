
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profilesService } from '@/lib/database-utils';
import { ProfileUpdate } from '@/lib/database.types';
import { toast } from 'sonner';

// Hook for fetching current user profile
export function useCurrentUserProfile() {
  return useQuery({
    queryKey: ['profile', 'current'],
    queryFn: async () => {
      const result = await profilesService.getCurrentUserProfile();
      if (result.error) {
        throw new Error(result.error.message);
      }
      return result.data;
    },
  });
}

// Hook for updating current user profile
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: ProfileUpdate) => {
      const result = await profilesService.updateCurrentUserProfile(updates);
      if (result.error) {
        throw new Error(result.error.message);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'current'] });
      toast.success('プロフィールが更新されました');
    },
    onError: (error: Error) => {
      toast.error(`プロフィールの更新に失敗しました: ${error.message}`);
    },
  });
}

// Hook for fetching all profiles (admin only)
export function useAllProfiles() {
  return useQuery({
    queryKey: ['profiles', 'all'],
    queryFn: async () => {
      const result = await profilesService.getAll();
      if (result.error) {
        throw new Error(result.error.message);
      }
      return result.data || [];
    },
  });
}
