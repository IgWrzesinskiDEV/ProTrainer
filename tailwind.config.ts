// import type { Config } from "tailwindcss";

// export default {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./node_modules/tailwind-datepicker-react/dist/**/*.js",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         backgroundLite: "var(--backgroundLite)",
//         foreground: "var(--foreground)",
//         primary: "var(--primary)",
//       },
//       fontFamily: {
//         sans: ["var(--font-inter)"],
//         mono: ["var(--font-roboto-mono)"],
//       },
//       backgroundImage: {
//         foo: "repeating-linear-gradient(to top left, #78716ccc 0px, #78716ccc 10px, #78716c80 10px, #78716c80 20px) ",
//       },
//     },
//   },
//   plugins: [],
// } satisfies Config;

import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        backgroundLite: "var(--backgroundLite)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "hsl(var(--primary-foreground))",
          50: "#eef9ff",
          100: "#dcf3ff",
          200: "#b3e7ff",
          300: "#75d6ff",
          400: "#2cc0ff",
          500: "#06a7f0",
          600: "#0086cd",
          700: "#006ba6",
          800: "#005c8a",
          900: "#064c72",
          950: "#03304d",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "#f5f5f6",
          100: "#e5e7e9",
          200: "#cdd1d5",
          300: "#aab1b9",
          400: "#818a96",
          500: "#6b747f",
          600: "#5a616b",
          700: "#4a5058",
          800: "#41454b",
          900: "#292c30",
          950: "#17191c",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "Roboto Mono", "monospace"],
        display: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('/hero-pattern.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        foo: "repeating-linear-gradient(to top left, #78716ccc 0px, #78716ccc 10px, #78716c80 10px, #78716c80 20px)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config;
