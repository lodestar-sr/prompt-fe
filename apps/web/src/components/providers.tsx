'use client';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications, notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { useMemo } from 'react';

import { theme } from '@/config/theme';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
          mutations: {
            onError: (error: any) => {
              const message =
                error.body?.error?.validationErrors?.[0]?.message ||
                error.body?.error?.message ||
                error.message ||
                'Something went wrong! Please try again';

              notifications.clean();
              notifications.show({
                closeButtonProps: { size: 'md' },
                color: 'red',
                title: 'Error',
                message,
              });
            },
          },
        },
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  return (
    <MantineProvider theme={theme}>
      <Notifications
        position="bottom-center"
        containerWidth="fit-content"
        limit={1}
        zIndex={1600}
      />
      <QueryProvider>
        <SessionProvider session={session}>
          <ModalsProvider>{children}</ModalsProvider>
        </SessionProvider>
      </QueryProvider>
    </MantineProvider>
  );
}
