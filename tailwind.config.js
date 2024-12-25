/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/script.js'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient' : 'linear-gradient(to right, #5F0F40, #310E68)',
      }
    },
  },
  plugins: [],
}

