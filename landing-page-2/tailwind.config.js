/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          primary: '#FAF7F2',     // warm beach sand linen / sunlit sand
          secondary: '#F5EBE1',   // soft sandy peach / warm dune background
          tertiary: '#FFE8D6',    // secondary color: warm beach sand cream / peach shell
          white: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#262820',     // warm driftwood charcoal / deep coastal stone
          secondary: '#66635B',   // warm weathered beach pebble / coastal taupe
          muted: '#9C988D',       // soft dune grass grey / warm beach sand grey
        },
        brand: {
          primary: '#6B7056',     // Primary color: herbaceous coastal olive / beach dune stone
          deep: '#474B37',        // deep rich coastal olive driftwood for high-contrast CTAs & headings
          light: '#8F9675',       // sun-warmed dune sage / beach coastal accent
          soft: '#E8EBD9',        // soft wash of coastal olive
        },
        sand: {
          DEFAULT: '#FFE8D6',     // Secondary color: warm beach sand / seashell peach
          light: '#FFF5ED',       // sunlit beach pearl
          warm: '#F5DAC4',        // golden sand shore
          deep: '#DDBEA9',        // warm beach dune terracotta
        },
        accent: {
          warm: '#CB997E',        // warm seashell terracotta / coastal sunset accent
          sand: '#FFE8D6',        // secondary beach sand
          light: '#DDBEA9',       // sun-baked coastal clay
        },
        border: {
          subtle: '#EAE1D5',      // warm sandy linen border
          DEFAULT: '#DFCFC0',     // soft beach dune border
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'eyebrow': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.14em', fontWeight: '500' }],
      },
      borderRadius: {
        'xl2': '18px',
        'hero': '24px',
        'editorial': '28px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '38': '9.5rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(1.04)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'rise': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scale-in 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'rise': 'rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
};
