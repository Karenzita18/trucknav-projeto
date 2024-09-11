import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'sans': ['Gotham Pro', 'sans-serif'],
        'gotham': ['Gotham Pro', 'sans-serif'],
        'barcelay': ['Barcelay', 'serif'],
      },
      colors: {
				brand: {
					100: "#F5A623",
					200: "#1E3A8A",
					300: "#D2D2D2",
				},
			},
    },
  },
  plugins: [],
};
export default config;