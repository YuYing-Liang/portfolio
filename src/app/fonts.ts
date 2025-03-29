import { STIX_Two_Text, Space_Mono, Work_Sans } from "next/font/google";

export const sans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const serif = STIX_Two_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});