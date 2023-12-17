/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    fontSize: {
      "heading1-bold": [
        "56px",
        {
          lineHeight: "150%",
          fontWeight: "700",
        },
      ],
      "heading1-semibold": [
        "56px",
        {
          lineHeight: "150%",
          fontWeight: "600",
        },
      ],
      "heading2-bold": [
        "48px",
        {
          lineHeight: "150%",
          fontWeight: "700",
        },
      ],
      "heading2-semibold": [
        "48px",
        {
          lineHeight: "150%",
          fontWeight: "600",
        },
      ],
      "heading3-bold": [
        "40px",
        {
          lineHeight: "150%",
          fontWeight: "700",
        },
      ],
      "heading4-bold": [
        "32px",
        {
          lineHeight: "150%",
          fontWeight: "700",
        },
      ],
      "body-bold": [
        "18px",
        {
          lineHeight: "150%",
          fontWeight: "700",
        },
      ],
      "body-semibold": [
        "18px",
        {
          lineHeight: "150%",
          fontWeight: "600",
        },
      ],
      "body-medium": [
        "18px",
        {
          lineHeight: "150%",
          fontWeight: "500",
        },
      ],
      "body-normal": [
        "18px",
        {
          lineHeight: "150%",
          fontWeight: "400",
        },
      ],
      "base-regular": [
        "16px",
        {
          lineHeight: "150%",
          fontWeight: "400",
        },
      ],
      "base-medium": [
        "16px",
        {
          lineHeight: "150%",
          fontWeight: "500",
        },
      ],
      "base-semibold": [
        "16px",
        {
          lineHeight: "150%",
          fontWeight: "600",
        },
      ],
      "small-regular": [
        "14px",
        {
          lineHeight: "150%",
          fontWeight: "400",
        },
      ],
      "small-medium": [
        "14px",
        {
          lineHeight: "150%",
          fontWeight: "500",
        },
      ],
      "small-semibold": [
        "14px",
        {
          lineHeight: "150%",
          fontWeight: "600",
        },
      ],
      "tiny-medium": [
        "12px",
        {
          lineHeight: "150%",
          fontWeight: "500",
        },
      ],
      "tiny-semibold": [
        "12px",
        {
          lineHeight: "150%",
          fontWeight: "600",
        },
      ],
      "tiny-bold": [
        "12px",
        {
          lineHeight: "150%",
          fontWeight: "700",
        },
      ],
    },

    extend: {
      colors: {
        blue: "#0095F6",
        green: "62A60A",
        brightGreen: "#C3D500",
        yellow: "F38A00",
        glassmorphism: "rgba(16, 16, 18, 0.60)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "count-badge": "0px 0px 6px 2px rgba(0, 0, 0, 0.25)",
        "groups-sidebar": "-30px 0px 60px 0px rgba(28, 28, 31, 0.50)",
      },
      screens: {
        xs: "400px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
