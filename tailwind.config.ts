/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    fontSize: {
      'heading1-bold': [
        '56px',
        {
          lineHeight: '150%',
          fontWeight: '700',
        },
      ],
      'heading1-semibold': [
        '56px',
        {
          lineHeight: '150%',
          fontWeight: '600',
        },
      ],
      'heading2-bold': [
        '48px',
        {
          lineHeight: '150%',
          fontWeight: '700',
        },
      ],
      'heading2-semibold': [
        '48px',
        {
          lineHeight: '150%',
          fontWeight: '600',
        },
      ],
      'heading3-bold': [
        '40px',
        {
          lineHeight: '150%',
          fontWeight: '700',
        },
      ],
      'heading4-bold': [
        '32px',
        {
          lineHeight: '150%',
          fontWeight: '700',
        },
      ],
      'large-bold': [
        '20px',
        {
          lineHeight: '150%',
          fontWeight: '700',
        },
      ],
      'large-semibold': [
        '20px',
        {
          lineHeight: '150%',
          fontWeight: '600',
        },
      ],
      'large-medium': [
        '20px',
        {
          lineHeight: '150%',
          fontWeight: '500',
        },
      ],
      'large-normal': [
        '20px',
        {
          lineHeight: '150%',
          fontWeight: '400',
        },
      ],
      'body-bold': [
        '18px',
        {
          lineHeight: '150%',
          fontWeight: '700',
        },
      ],
      'body-semibold': [
        '18px',
        {
          lineHeight: '150%',
          fontWeight: '600',
        },
      ],
      'body-medium': [
        '18px',
        {
          lineHeight: '150%',
          fontWeight: '500',
        },
      ],
      'body-normal': [
        '18px',
        {
          lineHeight: '150%',
          fontWeight: '400',
        },
      ],
      'base-regular': [
        '16px',
        {
          lineHeight: '150%',
          fontWeight: '400',
        },
      ],
      'base-medium': [
        '16px',
        {
          lineHeight: '150%',
          fontWeight: '500',
        },
      ],
      'base-semibold': [
        '16px',
        {
          lineHeight: '150%',
          fontWeight: '600',
        },
      ],
      'small-regular': [
        '14px',
        {
          lineHeight: '150%',
          fontWeight: '400',
        },
      ],
      'small-medium': [
        '14px',
        {
          lineHeight: '150%',
          fontWeight: '500',
        },
      ],
      'small-semibold': [
        '14px',
        {
          lineHeight: '150%',
          fontWeight: '600',
        },
      ],
      'tiny-medium': [
        '12px',
        {
          lineHeight: '150%',
          fontWeight: '500',
        },
      ],
      'tiny-semibold': [
        '12px',
        {
          lineHeight: '150%',
          fontWeight: '600',
        },
      ],
      'tiny-bold': [
        '12px',
        {
          lineHeight: '150%',
          fontWeight: '700',
        },
      ],
    },

    extend: {
      colors: {
        glassmorphism:
          'rgba(16, 16, 18, 0.60)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground:
            'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground:
            'var(--secondary-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground:
            'var(--card-foreground)',
        },
        hover: {
          DEFAULT: 'var(--hover)',
          foreground:
            'var(--hover-foreground)',
        },
        brightGreen:
          'var(--bright-green)',
        lightGray: 'var(--light-gray)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'count-badge':
          '0px 0px 6px 2px rgba(0, 0, 0, 0.25)',
        sidebar:
          '0px 0px 6px 2px rgba(0, 0, 0, 0.25)',
      },
      screens: {
        xs: '400px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: {
            height:
              'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height:
              'var(--radix-accordion-content-height)',
          },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down':
          'accordion-down 0.2s ease-out',
        'accordion-up':
          'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
