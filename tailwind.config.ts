import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        heading: ['Bungee', 'cursive'], // Updated font for headings
        afro: ['Montserrat', 'sans-serif'], // fallback for subheadings/body
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        background: '#FEF7CD',         // Soft yellow
        foreground: '#222',
        primary: {
          DEFAULT: '#008751',          // Nigerian flag green
          foreground: '#fff'
        },
        secondary: {
          DEFAULT: '#F97316',          // Orange
          foreground: '#fff'
        },
        accent: {
          DEFAULT: '#FFD600',          // Bold yellow
          foreground: '#222'
        },
        afro: {
          teal: '#008751',            // Updated to Nigerian flag green
          orange: '#F97316',
          yellow: '#FFD600',
          black: '#111',
        },
        card: {
          DEFAULT: '#fff',
          foreground: '#222'
        },
        afrobg: {
          DEFAULT: '#FEF7CD'
        }
      },
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
