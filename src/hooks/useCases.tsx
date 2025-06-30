
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { casesService } from '@/lib/database-utils';
import { Case, CaseInsert, CaseUpdate } from '@/lib/database.types';
import { toast } from 'sonner';

// Hook for fetching all cases
export function useCases() {
  return useQuery({
    queryKey: ['cases'],
    queryFn: async () => {
      const result = await casesService.getAll();
      if (result.error) {
        throw new Error(result.error.message);
      }
      return result.data || [];
    },
  });
}

// Hook for fetching a single case
export function useCase(id: string) {
  return useQuery({
    queryKey: ['cases', id],
    queryFn: async () => {
      const result = await casesService.getById(id);
      if (result.error) {
        throw new Error(result.error.message);
      }
      return result.data;
    },
    enabled: !!id,
  });
}

// Hook for creating a case
export function useCreateCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (caseData: CaseInsert) => {
      const result = await casesService.create(caseData);
      if (result.error) {
        throw new Error(result.error.message);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      toast.success('案件が作成されました');
    },
    onError: (error: Error) => {
      toast.error(`案件の作成に失敗しました: ${error.message}`);
    },
  });
}

// Hook for updating a case
export function useUpdateCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: CaseUpdate }) => {
      const result = await casesService.update(id, updates);
      if (result.error) {
        throw new Error(result.error.message);
      }
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      queryClient.invalidateQueries({ queryKey: ['cases', data?.id] });
      toast.success('案件が更新されました');
    },
    onError: (error: Error) => {
      toast.error(`案件の更新に失敗しました: ${error.message}`);
    },
  });
}

// Hook for deleting a case
export function useDeleteCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await casesService.delete(id);
      if (result.error) {
        throw new Error(result.error.message);
      }
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      toast.success('案件が削除されました');
    },
    onError: (error: Error) => {
      toast.error(`案件の削除に失敗しました: ${error.message}`);
    },
  });
}
