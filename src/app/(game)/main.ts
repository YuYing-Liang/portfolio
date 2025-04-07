import { Game } from "phaser";
import { MainScene } from "./(scenes)/MainScene";

// Aspect Ratio 16:9 - Portrait
const MAX_SIZE_WIDTH_SCREEN = 3840;
const MAX_SIZE_HEIGHT_SCREEN = 2160;
const MIN_SIZE_WIDTH_SCREEN = 270;
const MIN_SIZE_HEIGHT_SCREEN = 480;
const SIZE_WIDTH_SCREEN = 540;
const SIZE_HEIGHT_SCREEN = 960;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: "game-container",
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN,
    min: {
      width: MIN_SIZE_WIDTH_SCREEN,
      height: MIN_SIZE_HEIGHT_SCREEN,
    },
    max: {
      width: MAX_SIZE_WIDTH_SCREEN,
      height: MAX_SIZE_HEIGHT_SCREEN,
    },
  },
  physics: {
    default: "matter",
    matter: {
      debug: true,
    },
  },
  parent: "game-container",
  backgroundColor: "#ADD8E6",
  scene: [MainScene],
};

export const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

// Global
export const screenBaseSize = {
  maxWidth: MAX_SIZE_WIDTH_SCREEN,
  maxHeight: MAX_SIZE_HEIGHT_SCREEN,
  minWidth: MIN_SIZE_WIDTH_SCREEN,
  minHeight: MIN_SIZE_HEIGHT_SCREEN,
  width: SIZE_WIDTH_SCREEN,
  height: SIZE_HEIGHT_SCREEN,
};
