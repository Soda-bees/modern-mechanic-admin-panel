/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'custom': '1100px' // Custom name and size
      },
    },
  },
  plugins: [],
};
