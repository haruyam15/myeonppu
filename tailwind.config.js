import { mauve, violet, indigo } from '@radix-ui/colors';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx}'],
  theme: {
    extend: {
      colors: {
        ...mauve,
        ...violet,
        ...indigo,
      },
    },
  },
  plugins: [typography],
};
