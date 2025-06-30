
import { useQuery } from '@tanstack/react-query';
import { statisticsService } from '@/lib/database-utils';

// Hook for fetching case statistics
export function useCaseStatistics() {
  return useQuery({
    queryKey: ['statistics', 'cases'],
    queryFn: async () => {
      const result = await statisticsService.getCaseStatistics();
      if (result.error) {
        throw new Error(result.error.message);
      }
      return result.data;
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}
