import { createClient } from '@hey-api/client-axios';

export const initClient = (accessToken?: string) => {
  return createClient({
    baseURL: process.env.NEXT_PUBLIC_REMOTE_ENDPOINT_URL,
    headers: {
      ...(accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {}),
    },
  });
};
