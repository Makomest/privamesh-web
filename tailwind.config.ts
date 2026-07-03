import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,md,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#FFFFFF',
          surface: '#F5F8F6',
          elevated: '#EDF2EF',
        },
        border: {
          DEFAULT: '#E4E9E6',
          hover: '#CFD8D3',
          accent: '#00A8964D',
        },
        text: {
          primary: '#0C1A14',
          secondary: '#33413B',
          muted: '#5C6B64',
          faint: '#94A29B',
        },
        accent: {
          DEFAULT: '#00A896',
          hover: '#008C7E',
          glow: '#00A8961F',
          secondary: '#00C0A8',
        },
        success: '#00A896',
        warning: '#C9820A',
        negative: '#E5484D',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'h1-d': ['4.25rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1-m': ['2.375rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      maxWidth: {
        prose: '65ch',
        content: '72rem',
      },
      borderRadius: {
        card: '14px',
        btn: '9px',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(120% 120% at 50% 40%, #00A8961F 0%, #00C0A814 45%, transparent 70%)',
        'accent-gradient': 'linear-gradient(90deg, #00A896 0%, #00C0A8 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
