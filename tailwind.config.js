/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hpcl: {
          blue: {
            DEFAULT: "#003873",
            dark: "#002347",
            light: "#1a529e",
            subtle: "#eef4fb",
          },
          red: {
            DEFAULT: "#D9252A",
            dark: "#B01B20",
            light: "#FF4D4F",
            subtle: "#FFF1F0",
          },
          yellow: {
            DEFAULT: "#F4B400",
            dark: "#D49800",
            light: "#FEF08A",
            subtle: "#FEFCE8",
          },
        },
      },
    },
  },
  plugins: [],
};
