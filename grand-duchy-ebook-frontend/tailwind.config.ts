/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    // our colors theme
    colors: {
      primary: "#AFAFAF",
      secondary: "#fdfbf7",
      gray: "#AFAFAF",
      black: "#0B0109",
      white: "#FFFFFF",
      beige: "#EDEAE2",
      error: "#DF5357",
      success: "#28864c",
      darkGray: "#71797E",
      customBlack: "#101417",
    },
    container: {
      center: true,
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1400px",
        "2xl": "1536px", // Tailwind's default 2xl size
        "3xl": "1700px", // Ultra-wide laptops/desktops
        "4xl": "1920px", // Full HD screens
        "5xl": "2560px", // 2K resolution screens
        "6xl": "3440px", // Ultra-wide monitors
        "7xl": "3840px", // 4K resolution screens
      },
    },
  },

  plugins: [],
};
