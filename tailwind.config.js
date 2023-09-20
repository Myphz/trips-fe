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
      "primary-light": "#E6F6F4",
      "error-light": "#FFE6E6",
      "bg-dark": "#1A1A1A",
      "primary-dark": "#007F6D",
      "gray-dark": "#EAEAEA",
    },
    backgroundImage: {
      gradient:
        "linear-gradient(77deg, #00A991 37.51%, #01A892 42.72%, #05A795 47.94%, #0CA49A 53.15%, #15A1A1 58.36%, #209DA9 63.57%, #2C98B3 68.78%, #3A93BD 73.99%, #488EC8 79.2%, #5589D3 84.41%, #6384DD 89.63%, #6F7FE7 94.84%, #7A7BEF 100.05%, #8378F6 105.26%, #8A75FB 110.47%, #8E74FE 115.68%, #8F73FF 120.89%)",
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
      height: {
        fullscreen: "100dvh",
      },
    },
  },
  plugins: [],
};
