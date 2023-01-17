/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}","./**/*.{html,js}"],
    theme: {
      extend: {
        colors:{
            main:'#6C00FF',
            second:'#3C79F5',
        }
      },
    },
    plugins: [],
  }