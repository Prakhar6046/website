import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './lexical/features/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
    'max-w-[1000px]',
    'max-w-[900px]',
    'max-w-[800px]',
    'max-w-[700px]',
    'max-w-[600px]',
    'max-w-[500px]',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      fontSize: {
        sm: '0.875rem',
        base: '1.125rem',
        lg: '1.438rem',
        xl: '1.75rem',
        '2xl': '2.188rem',
        '3xl': '2.75rem',
        '4xl': '3.438rem',
        '5xl': '4.313rem',
      },
      boxShadow: {
        innerHeroSection: '0 -36px 37.3px 0px hsl(var(--background)) inset',
      },
      colors: {
        green: {
          DEFAULT: 'hsl(var(--green))',
          accent: 'hsl(var(--accent-green))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        foregroundSecondary: 'hsl(var(--foreground-secondary))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      borderRadius: {
        lg: '16px',
        md: '12px',
        sm: '8px',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
        poppins: ['var(--font-poppins)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              hr: {
                marginTop: 12,
                marginBottom: 12,
                borderColor: 'hsl(var(--border))',
              },
              a: {
                textDecorationColor: 'hsl(var(--border))',
                textUnderlineOffset: '2px',
                fontWeight: 'normal',
              },
              h1: {
                fontFamily: 'var(--font-poppins)',
                fontWeight: '600',
                fontSize: '2.75rem',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              h2: {
                fontFamily: 'var(--font-poppins)',
                fontSize: '1.75rem',
                fontWeight: '500',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              h3: {
                fontFamily: 'var(--font-poppins)',
                fontSize: '1.438rem',
                fontWeight: '600',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              h4: {
                fontSize: '1.438rem',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              h5: {
                fontSize: '1.438rem',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              h6: {
                fontSize: '1.125rem',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              p: {
                fontSize: '0.875rem',
                marginTop: '0',
                marginBottom: '0',
              },
              ul: {
                fontSize: '0.875rem',
              },
              ol: {
                fontSize: '0.875rem',
              },
            },
          ],
        },

        md: {
          css: [
            {
              hr: {
                marginTop: 24,
                marginBottom: 24,
              },
              h1: {
                fontSize: '3.438rem',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              h2: {
                fontSize: '2.75rem',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              h3: {
                fontSize: '2.188rem',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              h4: {
                fontSize: '1.75rem',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              h5: {
                fontSize: '1.438rem',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              h6: {
                fontSize: '1.438rem',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              p: {
                fontSize: '1.125rem',
                marginTop: '0',
                marginBottom: '0',
              },
              ul: {
                fontSize: '1.125rem',
              },
              ol: {
                fontSize: '1.125rem',
              },
            },
          ],
        },
        lg: {
          css: [
            {
              hr: {
                marginTop: 24,
                marginBottom: 24,
              },
              h1: {
                marginBottom: '0.25em',
                fontSize: '4.313rem',
                lineHeight: '1.25',
              },
              h2: {
                fontWeight: 'medium',
                fontSize: '3.438rem',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              h3: {
                fontSize: '2.75rem',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              h4: {
                fontSize: '2.188rem',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              h5: {
                fontSize: '1.75rem',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              h6: {
                fontSize: '1.438rem',
                marginBottom: '0.25em',
                marginTop: '0.025em',
              },
              p: {
                // fontSize: '1.125rem',
                marginTop: '0',
                marginBottom: '0',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
