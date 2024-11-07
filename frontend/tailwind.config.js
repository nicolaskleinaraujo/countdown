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
        "bgcolor2": "#1A1A2E",
        "bgcolor3": "#0F4F3D",
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
