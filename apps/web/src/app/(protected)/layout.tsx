'use client';
import { Box, ScrollArea } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { type PropsWithChildren } from 'react';

import { Header } from './_components/Header';
import { Navbar } from './_components/Navbar';

export default function Layout({ children }: PropsWithChildren) {
  const displayNavbar = useMediaQuery('(min-width: 1024px)', true, {
    getInitialValueInEffect: true,
  });
  return (
    <div className="flex-1">
      <Header />
      <Box className="flex">
        {displayNavbar ? <Navbar /> : null}
        <ScrollArea
          h="calc(100dvh - 60px)"
          type="always"
          className="p-4 flex-1 lg:px-4 lg:py-4"
          classNames={{ viewport: '[&>div]:h-full' }}
        >
          {children}
        </ScrollArea>
      </Box>
    </div>
  );
}
