import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
    darkMode: 'selector',
  theme: {
    extend: {
      colors: {

        "main_color_light": "#fafafa",
        "second_color_light": "#ffffff",

        "text_main_color_light": "#f8fafc",
        "text_second_color_light": "#e2e8f0",

        "fade_color_light": "#09060a",
        "accent_color_light": "#3730a3",
        
        
        "main_color_dark": "#10172b",
        "second_color_dark": "#20293c",

        "text_main_color_dark": "#10172b",
        "fade_color_dark": "#c3c9d7",

        "accent_color_dark": "#a5b4fc",


        "color_accent": "indigo-500",
      },
      screens: {
        'xs': '350px',
      },
    },
  },
  plugins: [
  ],
};
export default config;
