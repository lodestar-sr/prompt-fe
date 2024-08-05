import { getPrompts } from '@pms/rest';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useClient } from '../use-client';

export const useGetPrompts = () => {
  const client = useClient();
  return useInfiniteQuery({
    queryKey: ['GetPrompts'],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const { data, error } = await getPrompts({
        client,
        query: { page: pageParam, limit: 50 },
      });
      if (error) throw error;
      return data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.pageCount ? lastPage.page + 1 : undefined;
    },
  });
};
