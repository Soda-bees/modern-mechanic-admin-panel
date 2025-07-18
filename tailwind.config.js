// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors:{
//         grey:{
//           default:'#F96D37'
//         },
//         red:'#F96D37'
//       }
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#F96D37', // <-- this makes `bg-red` work
        },
        grey: {
          DEFAULT: '#A0A0A0', // optional fix
        },
      },
    },
  },
  plugins: [],
};
