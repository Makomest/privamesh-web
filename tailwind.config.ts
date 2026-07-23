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
          base: '#000000',
          surface: '#0D0D0D',
          elevated: '#171717',
        },
        border: {
          DEFAULT: '#232323',
          hover: '#383838',
          accent: '#FFFFFF38',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#C4C4C4',
          muted: '#8C8C8C',
          faint: '#5A5A5A',
        },
        accent: {
          DEFAULT: '#FFFFFF',
          hover: '#E2E2E2',
          glow: '#FFFFFF14',
          secondary: '#C4C4C4',
        },
        success: '#FFFFFF',
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
          'radial-gradient(120% 120% at 50% 40%, #FFFFFF1A 0%, #FFFFFF0A 45%, transparent 70%)',
        'accent-gradient': 'linear-gradient(90deg, #FFFFFF 0%, #C4C4C4 100%)',
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
