// @type {import('tailwindcss').Config}
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      a: {
        underline: false,
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

