import { updatePrompt, type UpdatePromptData } from '@pms/rest';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useClient } from '../use-client';

export const useUpdatePrompt = () => {
  const client = useClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: UpdatePromptData) => {
      const { data, error } = await updatePrompt({
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
