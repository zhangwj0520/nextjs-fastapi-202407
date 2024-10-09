/* eslint-disable ts/no-require-imports */
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

import { addDynamicIconSelectors } from '@iconify/tailwind'

// Import icons from directory 'svg'
import customSet from './addDynamicIconSelectors'
// const customSet = importDirectorySync('icons')

// // Clean up all icons
// customSet.forEachSync((name, type) => {
//   if (type !== 'icon') {
//     return
//   }

//   // Get SVG object for icon
//   const svg = customSet.toSVG(name)
//   if (!svg) {
//     // Invalid icon
//     customSet.remove(name)
//     return
//   }

//   try {
//     // Clean up icon
//     cleanupSVG(svg)

//     // This is a monotone icon, change color to `currentColor`, add it if missing
//     // Skip this step if icons have palette
//     parseColors(svg, {
//       defaultColor: 'currentColor',
//       callback: (attr, colorStr, color) => {
//         console.log('====attr', attr)
//         return !color || isEmptyColor(color)
//           ? colorStr
//           : 'currentColor'
//       },
//     })

//     // Optimise icon
//     runSVGO(svg)
//   } catch (err) {
//     // Something went wrong when parsing icon: remove it
//     console.error(`Error parsing ${name}:`, err)
//     customSet.remove(name)
//     return
//   }

//   // Update icon in icon set from SVG object
//   customSet.fromSVG(name, svg)
// })

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    listStyleType: {
      square: 'square',
      roman: 'upper-roman',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        navbar: 'url("/images/navbar.png")',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger))',
          foreground: 'hsl(var(--danger-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
        text: {
          DEFAULT: 'hsl(var(--text))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    addDynamicIconSelectors({
      iconSets: {
        custom: customSet,
      },
      customise: (content) => {
        // console.log('content', content)
        return content
      },

    }),
  ],
} satisfies Config

export default config
