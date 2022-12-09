/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./stores/*.ts",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'base': {
          DEFAULT: '#434F5E',
          '50': '#9EABBA',
          '100': '#93A1B1',
          '200': '#7B8CA0',
          '300': '#65788D',
          '400': '#546375',
          '500': '#434F5E',
          '600': '#323B46',
          '700': '#21272E',
          '800': '#0A0B0D',
          '900': '#000000'
        },
      }
    },
  },
  plugins: [],
}
