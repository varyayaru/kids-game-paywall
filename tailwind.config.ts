import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        pw: {
          bg: '#fff6e8',
          'bg-spot': '#ffe3b8',
          ink: '#2c1a12',
          muted: '#7a5c4a',
          card: '#ffffff',
          line: '#f0d9bf',
          selected: '#2f9e6a',
          'selected-soft': '#e8f7ef',
          cta: '#ff7a45',
          'cta-ink': '#ffffff',
          badge: '#ffe08a',
          error: '#d64545',
          'error-soft': '#fdecec',
          success: '#2f9e6a',
          moon: '#fff1c9',
          skel: '#fff8ee',
          'radio-ring': '#c9a88c',
          'cta-edge': '#e25d2d',
          'skel-a': '#f3e2cd',
          'skel-b': '#fbeedc',
        },
      },
      borderRadius: {
        'pw-card': '20px',
        'pw-btn': '18px',
      },
      boxShadow: {
        pw: '0 10px 24px rgba(44, 26, 18, 0.08)',
        'pw-cta': '0 8px 0 #e25d2d',
        'pw-radio': 'inset 0 0 0 5px #2f9e6a',
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'pw-title': ['28px', { lineHeight: '34px', letterSpacing: '-0.03em' }],
        'pw-body': ['15px', { lineHeight: '22px' }],
      },
      spacing: {
        pad: '20px',
        'cta-h': '56px',
      },
      maxWidth: {
        sheet: '390px',
      },
      backgroundImage: {
        'pw-screen':
          'radial-gradient(120% 80% at 50% -10%, #ffe3b8, transparent 60%), #fff6e8',
        'pw-shine':
          'linear-gradient(90deg, #f3e2cd 25%, #fbeedc 50%, #f3e2cd 75%)',
      },
      keyframes: {
        shine: {
          to: { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        shine: 'shine 1.2s linear infinite',
        'spin-cta': 'spin 0.7s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
