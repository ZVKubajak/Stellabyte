/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)',
      },
    },
  },
  plugins: [],
};
