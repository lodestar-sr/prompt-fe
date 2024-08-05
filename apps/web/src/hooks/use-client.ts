import { get } from 'lodash';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import { initClient } from '@/lib/api';

export const useClient = () => {
  const { data: session } = useSession();

  const accessToken = get(session, 'accessToken');

  const restClient = useMemo(() => {
    return initClient(accessToken);
  }, [accessToken]);

  return restClient;
};
