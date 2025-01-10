/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f0e17",
        primary: "#ff8906",
        secondary: "#f25f4c",
        tertiary: "#e53170",
        headline: "#ffffff",
        paragraph: "#a7a9be",
      },
      fontFamily: {
        roboto: ["RobotoSlab", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 10px rgba(0, 255, 255, 0.5)",
      },
    },
  },
  plugins: [],
};
