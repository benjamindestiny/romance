/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': 'var(--color-dark-bg)',
        'card-bg': 'var(--color-card-bg)',
        'primary-purple': 'var(--color-primary-purple)',
        'pink-accent': 'var(--color-pink-accent)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'gray-border': 'var(--color-gray-border)',
        'progress-bg': 'var(--color-progress-bg)',
      }
    },
  },
  plugins: [],
}