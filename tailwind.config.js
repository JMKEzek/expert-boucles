module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        noir: 'var(--color-noir)',
        blanc: 'var(--color-blanc)',
      },
    },
  },
  plugins: [],
};
