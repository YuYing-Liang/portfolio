import { Player } from "../(sprites)/Player";
import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class MainScene extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera | undefined;
  player!: Player;
  bricks!: Phaser.GameObjects.TileSprite;

  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.baseURL = "/game/";
    this.load.image("sun", "sun.png");
    this.load.image("ground", "ground.png");
    this.load.image("player", "player.png");
    this.load.image("playerLeft", "player-left.png");
    this.load.image("playerRight", "player-right.png");
    this.load.image("brick", "brick.png");
  }

  create() {
    this.camera = this.cameras.main;
    const sun = this.add.image(this.scale.baseSize.width - 128, 128, "sun");
    const ground = this.add.tileSprite(
      this.scale.baseSize.width / 2,
      this.scale.baseSize.height - 36,
      this.scale.baseSize.width,
      0,
      "ground",
    );

    this.bricks = this.add.tileSprite(300, this.scale.baseSize.height - 140 - 200, 210, 0, "brick");
    this.bricks.setSize(210, 70);
    this.physics.add.existing(this.bricks);

    this.player = new Player(this);

    this.tweens.add({
      targets: sun,
      rotation: Math.PI / 3,
      duration: 3000,
      yoyo: true,
      loop: -1,
    });

    EventBus.emit("current-scene-ready", this);
  }

  update(time: number, delta: number): void {
    this.player.update(time, this.bricks);

    this.physics.overlap(this.player, this.bricks, (_player, _bricks) => {
      this.player.y = this.bricks.y + (this.bricks.height + this.player.height) / 2;
      console.log("collided");
    });
  }
}
