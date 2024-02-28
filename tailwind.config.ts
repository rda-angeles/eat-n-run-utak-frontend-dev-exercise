import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "c-primary": "#1E6F5C",
        "c-secondary": "#289672",
        "c-tertiary": "#29BB89",
        "c-quarternary": "#E6DD3B",
      },
    },
  },
  plugins: [],
};
export default config;
