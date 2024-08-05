import { removeFromFavorite, type RemoveFromFavoriteData } from '@pms/rest';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useClient } from '../use-client';

export const useRemoveFromFavorite = () => {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: RemoveFromFavoriteData) => {
      const { data, error } = await removeFromFavorite({
        client,
        path: params.path,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GetPrompts'] });
    },
  });
};
