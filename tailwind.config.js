import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(270deg, rgba(35,37,38,1) 0%, rgba(10,10,10,1) 100%)',
        'custom-gradient-purple':
          'linear-gradient(270deg, rgba(118,58,245,1) 0%, rgba(166,4,242,1) 100%)',
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            default: {
              DEFAULT: '#7e22ce',
              foreground: '#7e22ce4d',
            },
          },
        },
      },
    }),
  ],
};
