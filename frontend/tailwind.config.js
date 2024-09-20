/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        "bgcolor": "#09090B",
        "textcolor": "#FAFAFA",
        "color2": "#30303D",
        "color3": "#414170",
        "color4": "#3E3EA3",
        "color5": "#2727D6",
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
