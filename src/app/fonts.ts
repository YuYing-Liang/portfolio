import { Be_Vietnam_Pro, Libre_Baskerville, Space_Mono, Work_Sans } from "next/font/google";

export const sans = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const serif = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});
