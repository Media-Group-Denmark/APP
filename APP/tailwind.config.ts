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
         "accent_color_light": "#007F6C",
         "accent_color_gradient_light": "#007F6C, #00C090",
         
         
         "main_color_dark": "#10172b",
         "second_color_dark": "#20293c",
        
         "text_main_color_dark": "#10172b",
         "fade_color_dark": "#c3c9d7",
        
         "accent_color_dark": "#00C090",
        
        
         "color_accent": "#007F6C",
      },
      backgroundImage: {
        'accent-color-gradient': 'linear-gradient(90deg, #007F6C, #00AC82)',
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
