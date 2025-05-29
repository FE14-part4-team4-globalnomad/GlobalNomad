/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        desktop: "1280px",
        tablet: { min: "769px", max: "1279px" },
        mobile: { max: "768px" },
      },
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      gray: {
        25: "#F8F8F8",
        50: "#EDEEF2",
        100: "#E0E0E5",
        200: "#C6C8CF",
        300: "#B3B4BC",
        400: "#9FA0A7",
        500: "#84858C",
        600: "#707177",
        700: "#5D5D61",
        800: "#49494C",
        900: "#323236",
        950: "#1F1F22",
      },
      brand: {
        100: "#E5F3FF",
        500: "#3D9EF2",
      },
      red: {
        500: "#FF2727",
      },
    },
    fontSize: {
      // Medium
      "11-m": ["1rem", { fontWeight: 500 }],
      "12-m": ["1.2rem", { fontWeight: 500 }],
      "13-m": ["1.3rem", { fontWeight: 500 }],
      "14-m": ["1.4rem", { fontWeight: 500 }],
      "16-m": ["1.6rem", { fontWeight: 500 }],
      "18-m": ["1.8rem", { fontWeight: 500 }],
      "20-m": ["2rem", { fontWeight: 500 }],
      "24-m": ["2.4rem", { fontWeight: 500 }],
      "32-m": ["3.2rem", { fontWeight: 500 }],
      // Bold
      "11-b": ["1rem", { fontWeight: 700 }],
      "12-b": ["1.2rem", { fontWeight: 700 }],
      "13-b": ["1.3rem", { fontWeight: 700 }],
      "14-b": ["1.4rem", { fontWeight: 700 }],
      "16-b": ["1.6rem", { fontWeight: 700 }],
      "18-b": ["1.8rem", { fontWeight: 700 }],
      "20-b": ["2rem", { fontWeight: 500 }],
      "24-b": ["2.4rem", { fontWeight: 500 }],
      "32-b": ["3.2rem", { fontWeight: 700 }],
      // Body
      "14-body-m": ["1.4rem", { lineHeight: "180%", fontWeight: 500 }],
      "16-body-m": ["1.6rem", { lineHeight: "180%", fontWeight: 500 }],
      "18-body-b": ["1.8rem", { lineHeight: "140%", fontWeight: 700 }],
      "20-body-b": ["2rem", { lineHeight: "160%", fontWeight: 700 }],
    },
  },
};
