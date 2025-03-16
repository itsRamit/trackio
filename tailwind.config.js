/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/script.js'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient' : 'linear-gradient(to right, #5F0F40, #310E68)',
        'neon-gradient': 'linear-gradient(to right, #00FF88, #00E5FF)'
      },
      colors: {
        customTeal: '#00C8B5',
      },
      
    },
  },
  plugins: [],
}

