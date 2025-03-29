"use client";
import { ParallaxProvider } from "react-scroll-parallax";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <ParallaxProvider> {children} </ParallaxProvider>;
}
