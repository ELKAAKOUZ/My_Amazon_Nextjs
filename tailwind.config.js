module.exports = {
  mode: "jit",
  darkMode: "class",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
        // darkbg: {
        //   DEFAULT: "#20222f",
        //   card: "#252b43",
        //   dark: "1d2029",
        // },
      },
      animation: {
        wiggle: "wiggle 0.5s ease-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "scale(1)" },
          "10%": { transform: "scale(0.9)" },
          "30%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(1.15)" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
