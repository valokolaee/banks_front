// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/styles/tw-animate.css" 
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1beaa5',
        gold: '#f5c59f',
        bronze: '#ad937c',
        'primary-dark': '#1a1a2e',
        'secondary-dark': '#16213e',
        'accent-color': '#0f3460',
        'highlight-color': '#e94560',        
        'dark': '#080a0e',
        'dark-gray': '#2a2c31',
        'white-inverse': '#f5f5f5',
      },
      fontFamily: {
        'alcxTitles': ['"Neue Kabel"', 'sans-serif'],
        'sans': ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'tokens-scroll': 'tokensScroll 15s linear infinite',
        'tokens-scroll-reverse': 'tokensScrollReverse 15s linear infinite',
        'button-glow': 'buttonMovingGradientBg var(--speed, 2s) infinite linear',
      },
      keyframes: {
        tokensScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        tokensScrollReverse: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(50%)' },
        },
        buttonMovingGradientBg: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 0%' },
        },
      },
    },
  },
  plugins: [],
}