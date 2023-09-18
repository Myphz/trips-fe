/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    colors: {
      primary: "#00A991",

      black: "#161616",
      white: "#F5F5F5",

      success: "#E6F6F4",
      gray: "#606060",
      error: "#B60B0B",
      tab: "#37E0C8",
      accent: "#FFCB45",

      "bg-dark": "#1A1A1A",
      "primary-dark": "#007F6D",
      "gray-dark": "#EAEAEA",
    },
    fontFamily: {
      headers: "'Ubuntu', sans-serif",
      regular: "'Source Sans 3', sans-serif",
    },

    fontSize: {
      h1: "2rem",
      h2: "1.75rem",
      h3: "1.5rem",
      regular: "1.25rem",
      small: "1rem",
      xs: "0.75rem",
    },
    extend: {
      minHeight: {
        textarea: "8rem",
      },
    },
  },
  plugins: [],
};
