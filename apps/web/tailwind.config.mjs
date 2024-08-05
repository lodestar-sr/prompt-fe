import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      height: {
        screen: '100dvh',
      },
      minHeight: {
        screen: '100dvh',
      },
      colors: {
        primary: '#40c057',
      },
    },
  },
  plugins: [animate],
  corePlugins: {
    fontFamily: false,
  },
};
