'use client';

import { createTheme } from '@mantine/core';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

export const fontSans = GeistSans;
export const fontMono = GeistMono;

export const theme = createTheme({
  fontFamily: fontSans.style.fontFamily,
  fontFamilyMonospace: fontMono.style.fontFamily,
  primaryColor: 'green',
  autoContrast: true,
});
