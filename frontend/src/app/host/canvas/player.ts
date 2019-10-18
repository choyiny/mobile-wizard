import * as Phaser from 'phaser';

export class Player extends Phaser.GameObjects.Sprite {
  public state = 'idle';

  constructor(scene, x, y) {
    super(scene, x, y, 'character');
    this.scene.add.existing(this);
    this.initStateManager();
    this.setScale(10);
  }

  /*
  Listen for completion of animations and then update to the next state
   */
  private initStateManager() {
    this.on('animationcomplete', (anim) => {
      if (anim.key === 'die') {
        this.state = 'dead';
      } else {
        if (anim.key !== 'idle' && anim.key !== 'die') {
          this.state = 'idle';
        }
      }
    });
  }

  /*
  This is not called by Phaser, it must be called explicitly in each scene.update()
   */
  public update() {
    if (this.state === 'die') {
      this.anims.play('die', false);
    } else if (this.state !== 'dead') {
      this.anims.play(this.state, true);
    }
  }
}
