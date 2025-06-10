import { useQuery } from '@tanstack/react-query';

export const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      return data.list; 
    },
    refetchOnWindowFocus: false,
  });
