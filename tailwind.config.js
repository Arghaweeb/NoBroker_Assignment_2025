/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playful: ['var(--font-playful)', 'sans-serif'],
        geist: ['var(--font-geist-sans)', 'sans-serif'],
        'geist-mono': ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // NoBroker Brand Colors
        nobroker: {
          teal: '#009587', // Primary Brand Color
          red: '#FD3753',  // Accent/Action Color
          dark: '#464646', // Text Color
          light: '#F4F5F7', // Background Color
        }
      },
    },
  },
  plugins: [],
};/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playful: ['var(--font-playful)', 'sans-serif'],
        geist: ['var(--font-geist-sans)', 'sans-serif'],
        'geist-mono': ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // NoBroker Brand Colors
        nobroker: {
          teal: '#009587', // Primary Brand Color
          red: '#FD3753',  // Accent/Action Color
          dark: '#464646', // Text Color
          light: '#F4F5F7', // Background Color
        }
      },
    },
  },
  plugins: [],
};

