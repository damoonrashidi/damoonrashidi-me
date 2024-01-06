import { type Config } from "tailwindcss";

export default {
  theme: {
    colors: {
      text: "var(--text-fg)",
      link: "var(--text-link)",
      subtle: "var(--text-subtle)",
      highlight: "var(--text-highlight)",
      bg: "var(--background)",
      bgLight: "var(--background-light)",
      transparent: "transparent",
    },
    extend: {
      fontFamily: {
        textular: "Overpass, sans-serif",
        display: "'Playfair Display', serif",
        code: "'Overpass Mono', monospace",
      },
      fontSize: {
        sm: ["0.9rem", {
          lineHeight: "2rem",
          letterSpacing: "-0.01em",
          fontWeight: "400",
        }],
        base: ["16px", {
          lineHeight: "2rem",
          letterSpacing: "-0.01em",
          fontWeight: "400",
        }],
        lg: ["1.5rem", {
          lineHeight: "2rem",
          letterSpacing: "-0.01em",
          fontWeight: "500",
        }],
        huge: ["3rem", {
          lineHeight: "3rem",
          letterSpacing: "-0.01em",
          fontWeight: "500",
        }],
      },
      fontWeight: {
        thin: "100",
        hairline: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        "extra-bold": "800",
        black: "900",
      },
    },
  },
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
} satisfies Config;
