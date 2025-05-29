/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.2s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    ({ addVariant }) => {
      addVariant("aria-disabled", '&[aria-disabled="true"]')
    },
  ],
};
