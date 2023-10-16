import { createThemes } from "tw-colors";

const SHARED_COLORS = {
  success: "#E6F6F4",
  error: "#F51900",
  tab: "#37E0C8",
  accent: "#FFCB45",
  off: "#CECECE",

  "error-light": "#FEF1EF",
  "primary-light": "#EAFBF3",
  "primary-dark-toast": "#027834",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    backgroundImage: {
      gradient:
        "linear-gradient(77deg, #00A991 37.51%, #01A892 42.72%, #05A795 47.94%, #0CA49A 53.15%, #15A1A1 58.36%, #209DA9 63.57%, #2C98B3 68.78%, #3A93BD 73.99%, #488EC8 79.2%, #5589D3 84.41%, #6384DD 89.63%, #6F7FE7 94.84%, #7A7BEF 100.05%, #8378F6 105.26%, #8A75FB 110.47%, #8E74FE 115.68%, #8F73FF 120.89%)",
    },
    fontFamily: {
      headers: "'Nunito', sans-serif",
      regular: "'Source Sans 3', sans-serif",
    },

    fontSize: {
      h1: "1.75rem",
      h2: "1.75rem",
      h3: "1.5rem",
      regular: "1.25rem",
      small: "1rem",
      xs: "0.75rem",
    },
    extend: {
      minHeight: {
        textarea: "8rem",
        fullscreen: "100dvh",
      },
      height: {
        fullscreen: "100dvh",
      },
    },
  },
  plugins: [
    createThemes(
      {
        light: {
          primary: "#00A991",
          black: "#161616",
          white: "#F5F5F5",
          gray: "#606060",
          skeleton: "#B4B4B4",
          ...SHARED_COLORS,
        },

        dark: {
          primary: "#007F6D",
          black: "#F5F5F5",
          white: "#1A1A1A",
          gray: "#EAEAEA",
          skeleton: "#202020",
          ...SHARED_COLORS,
        },
      },
      { strict: true },
    ),
  ],
};
