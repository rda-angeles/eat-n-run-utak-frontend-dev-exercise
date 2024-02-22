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
        "c-primary": "#1C6758",
        "c-secondary": "#3D8361",
        "c-tertiary": "#D6CDA4",
        "c-quarternary": "#EEF2E6",
      },
    },
  },
  plugins: [],
};
export default config;
