import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      primary: "#6A47C2", // iris (purple)
      secondary: "#E3C0D3", // thistle (light pink)
      tertiary: "#D9B596", // tan (light brown)
      dark: "#252323", // black
      light: "#F5F5F5", // white
      beige: "#EBE4D9", // beige
      transparent: "transparent",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
        serif: ["var(--font-serif)", ...fontFamily.serif],
      },
    },
  },
  plugins: [],
} satisfies Config;
