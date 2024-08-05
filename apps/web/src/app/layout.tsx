import '@/assets/styles/global.css';
import '@mantine/core/styles.css';

import { ColorSchemeScript } from '@mantine/core';
import type { Metadata, Viewport } from 'next';
import { getServerSession } from 'next-auth/next';
import { type PropsWithChildren } from 'react';

import { Providers } from '@/components/providers';
import { siteConfig } from '@/config/site';
import { authOptions } from '@/lib/auth';
import { cn } from '@/utils/cn';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteConfig.name,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={cn('min-h-screen bg-background antialiased')}>
        <div className="relative flex min-h-screen flex-col">
          <Providers session={session}>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
