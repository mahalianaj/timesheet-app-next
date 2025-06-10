import { useQuery } from '@tanstack/react-query';

export const useOffDays = () =>
  useQuery({
    queryKey: ['offDays'],
    queryFn: async () => {
      const response = await fetch('/api/off_days');
      if (!response.ok) {
        throw new Error('Failed to fetch off dayas');
      }
      const data = await response.json();
      return data.list; 
    },
    refetchOnWindowFocus: false,
  });
