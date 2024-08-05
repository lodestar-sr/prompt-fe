import { signUp, type SignUpDto } from '@pms/rest';
import { useMutation } from '@tanstack/react-query';

import { useClient } from '../use-client';

export const useSignUp = () => {
  const client = useClient();
  return useMutation({
    mutationFn: async (body: SignUpDto) => {
      const { data, error } = await signUp({ client, body });
      if (error) throw error;
      return data;
    },
  });
};
