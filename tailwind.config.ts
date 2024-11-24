import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero": "url('/static/imgs/hero.png')",
        "schematic-1": "url('/static/imgs/proby.png')",
        "schematic-2": "url('/static/imgs/proby1.png')",
        "fermomap-1": "url('/static/imgs/fermomap.png')",
        "fermomap-2": "url('/static/imgs/fermomap2.png')",
        "team": "url('/static/imgs/teamPhoto.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
