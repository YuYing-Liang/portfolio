// import { type Player } from "../(sprites)/Player";
import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class MainScene extends Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private player!: Phaser.Physics.Matter.Sprite;
  private isTouchingGround = false;

  constructor() {
    super("MainScene");
  }

  init() {
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  preload() {
    this.load.baseURL = "/game/";
    this.load.atlas("character", "character/character.png", "character/character.json");
    this.load.image("sun", "sun.png");
    this.load.image("tiles", "tilesheet.png");
    this.load.tilemapTiledJSON("level1tilemap", "level1.json");
  }

  create() {
    this.createCharacterAnimations();
    const map = this.make.tilemap({ key: "level1tilemap" });
    const tileset = map.addTilesetImage("game-tileset", "tiles");

    if (tileset == null) {
      console.log("Unable to create tileset");
      return;
    }

    const layer1 = map.createLayer("Tile Layer 1", tileset);
    if (layer1 == null) {
      console.log("Unable to create ground");
      return;
    }

    layer1.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);
    this.matter.world.setBounds(0, 0, map.widthInPixels, this.scale.height, 4);

    this.player = this.matter.add
      .sprite(256, this.scale.height - 256, "character")
      .play("player-idle")
      .setFixedRotation()
      .setOnCollide(() => {
        this.isTouchingGround = true;
      });

    this.cameras.main.setBounds(0, 0, map.widthInPixels, this.scale.height);
    this.cameras.main.startFollow(this.player);

    const sun = this.add.image(this.scale.baseSize.width - 128, 128, "sun");

    this.tweens.add({
      targets: sun,
      rotation: Math.PI / 3,
      duration: 3000,
      yoyo: true,
      loop: -1,
    });

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    const speed = 10;
    if (this.cursors.left.isDown || this.cursors.right.isDown) {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-speed);
        this.player.setFlipX(true);
      } else {
        this.player.setVelocityX(speed);
        this.player.setFlipX(false);
      }
      if (this.isTouchingGround) {
        this.player.play("player-walk", true);
      } else {
        this.player.play("player-idle", true);
      }
    } else {
      this.player.setVelocityX(0);
      this.player.play("player-idle", true);
    }

    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up);
    if (spaceJustPressed && this.isTouchingGround) {
      this.player.setVelocityY(-speed * 1.5);
      this.isTouchingGround = false;
    }
  }

  private createCharacterAnimations() {
    this.anims.create({
      key: "player-idle",
      frames: [
        {
          key: "character",
          frame: "character_femalePerson_idle.png",
        },
      ],
    });
    this.anims.create({
      key: "player-walk",
      frameRate: 10,
      frames: this.anims.generateFrameNames("character", {
        start: 1,
        end: 7,
        prefix: "character_femalePerson_walk",
        suffix: ".png",
      }),
      repeat: -1,
    });
  }
}
