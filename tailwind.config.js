/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef6ff",
          100: "#d9ebff",
          500: "#1f5fbf",
          700: "#133f7d",
          800: "#0d315f",
          900: "#071c35",
          950: "#041224",
        },
        saffron: {
          400: "#f6a72d",
          500: "#f08c18",
          600: "#d96f08",
        },
        indiaGreen: {
          500: "#15803d",
          600: "#116b33",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(4, 18, 36, 0.12)",
        card: "0 16px 40px rgba(4, 18, 36, 0.1)",
      },
      backgroundImage: {
        "patriotic-radial":
          "radial-gradient(circle at 20% 20%, rgba(240,140,24,0.22), transparent 28%), radial-gradient(circle at 80% 0%, rgba(21,128,61,0.18), transparent 24%), linear-gradient(135deg, #041224 0%, #0d315f 52%, #071c35 100%)",
      },
    },
  },
  plugins: [],
};
