import { useQuery } from '@tanstack/react-query';
import { Entry } from '../type';

export const useEntries = () =>
  useQuery<Entry[]>({
    queryKey: ['entries'],
    queryFn: async () => {
      const response = await fetch('/api/entries');
      if (!response.ok) {
        throw new Error('Failed to fetch entries');
      }
      const data = await response.json();
      return data.list; 
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
