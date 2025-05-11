export class Player extends Phaser.Physics.Arcade.Sprite {
  private keyUp: Phaser.Input.Keyboard.Key | undefined;
  private keyLeft: Phaser.Input.Keyboard.Key | undefined;
  private keyRight: Phaser.Input.Keyboard.Key | undefined;
  private upKeyDownStartTime: number | undefined;
  private groundY: number;

  constructor(scene: Phaser.Scene) {
    const groundY = scene.scale.baseSize.height - 140;
    super(scene, 200, groundY, "player");
    this.groundY = groundY;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);

    this.keyUp = this.scene.input.keyboard?.addKey("W");
    this.keyLeft = this.scene.input.keyboard?.addKey("A");
    this.keyRight = this.scene.input.keyboard?.addKey("D");

    this.body?.setSize(70, 140);
  }

  update(time: number, colliders: Phaser.GameObjects.TileSprite): void {
    if (this.keyLeft?.isDown) {
      this.setTexture("playerLeft");
      this.x -= 5;
      this.y = this.scene.scale.baseSize.height - 145;
    } else if (this.keyRight?.isDown) {
      this.setTexture("playerRight");
      this.x += 5;
      this.y = this.scene.scale.baseSize.height - 145;
      // } else if (this.keyUp?.isDown) {
      //   this.y -= 2;
    } else {
      this.setTexture("player");
      this.y = this.groundY;
    }

    if (this.keyUp?.isDown) {
      if (this.upKeyDownStartTime === undefined) {
        this.upKeyDownStartTime = time;
        return;
      }
    }

    if (this.upKeyDownStartTime !== undefined) {
      const isMovingInX = this.keyLeft?.isDown ?? this.keyRight?.isDown;
      const a = isMovingInX ? 0.002 : 0.005;
      const k = isMovingInX ? 223.60679775 : 141.421356237;
      const y = Math.min(this.groundY, this.groundY - 150 + a * (time - this.upKeyDownStartTime - k) ** 2);

      // this.y = colliders.y + (colliders.height + this.height) / 2;
      console.log(y, colliders.y + (colliders.height + this.height) / 2);
      if (
        y >= colliders.y + (colliders.height + this.height) / 2 ||
        Math.abs(this.x - colliders.x) >= (this.width + colliders.width) / 2
      ) {
        this.y = y;
      }

      if (this.y >= this.groundY && this.keyUp?.isUp) {
        this.upKeyDownStartTime = undefined;
      }
    }
  }
}
