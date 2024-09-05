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
					100: "#0047AB",
					200: "#FFA500",
					300: "#D3D3D3",
					400: "#32CD32",
          500: "#ffffff",
          600: "#5c24b4"
				},
			},
    },
  },
  plugins: [],
};
export default config;