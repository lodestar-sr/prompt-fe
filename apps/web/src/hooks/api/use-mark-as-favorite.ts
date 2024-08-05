import { markAsFavorite, type MarkAsFavoriteData } from '@pms/rest';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useClient } from '../use-client';

export const useMarkAsFavorite = () => {
  const client = useClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: MarkAsFavoriteData) => {
      const { data, error } = await markAsFavorite({
        client,
        ...params,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GetPrompts'] });
    },
  });
};
