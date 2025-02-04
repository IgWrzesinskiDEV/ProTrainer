import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        backgroundLite: "var(--backgroundLite)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-roboto-mono)"],
      },
      backgroundImage: {
        foo: "repeating-linear-gradient(to top left, #78716ccc 0px, #78716ccc 10px, #78716c80 10px, #78716c80 20px) ",
      },
    },
  },
  plugins: [],
} satisfies Config;
