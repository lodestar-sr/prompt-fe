import { createPrompt, type CreateUpdatePromptDto } from '@pms/rest';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useClient } from '../use-client';

export const useCreatePrompt = () => {
  const client = useClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: CreateUpdatePromptDto) => {
      const { data, error } = await createPrompt({
        client,
        body,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GetPrompts'] });
    },
  });
};
