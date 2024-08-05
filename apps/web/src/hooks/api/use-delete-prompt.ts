import { deletePrompt, type RemoveFromFavoriteData } from '@pms/rest';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useClient } from '../use-client';

export const useDeletePrompt = () => {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: RemoveFromFavoriteData) => {
      const { data, error } = await deletePrompt({
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
