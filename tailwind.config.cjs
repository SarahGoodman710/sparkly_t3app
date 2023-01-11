/** @type {import("tailwindcss").Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createThemes } = require("tw-colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      animation: ["group-hover"],
    },
  },
  plugins: [
    createThemes({
      light: {
        primary: "#6200EE",
		"primary-variant": "#3700B3",
        secondary: "#03DAC6",
		"secondary-variant": "#018786",
		"background": "#FFFFFF",
		"surface": "#FFFFFF",
		"on-background": "#000000",
		"on-surface": "#000000",
		"on-primary": "#FFFFFF",
		"on-secondary": "#000000",
		"error": "#B00020",
		"on-error": "#FFFFFF",
      },
      dark: {
        primary: "#BB86FC",
		"primary-variant": "#3700B3",
        secondary: "#03DAC6",
		"secondary-variant": "#03DAC6",
		"background": "#121212",
		"surface": "#121212",
		"on-background": "#FFFFFF",
		"on-surface": "#FFFFFF",
		"on-primary": "#000000",
		"on-secondary": "#000000",
		"error": "#CF6679",
		"on-error": "#000000",
      },
    }),
  ],
  darkMode: "class",
};
