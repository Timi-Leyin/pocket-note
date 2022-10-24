/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:['class','[data-mode="dark"]'],
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:"#249361"
      }
    },
  },
  plugins: [],
}
