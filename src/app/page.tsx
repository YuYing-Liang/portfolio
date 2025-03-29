"use client";
import { useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "./(game)/Game";

// export const metadata = {
//   title: "YuYing - Game Portfolio",
//   description: "experiences portfolio in the style of a simple platformer",
//   icons: [{ rel: "icon", url: "/favicon.ico" }],
// };

export default function Game() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  return <PhaserGame ref={phaserRef} />;
}
