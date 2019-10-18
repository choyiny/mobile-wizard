import * as Phaser from 'phaser';

export class Projectile extends Phaser.GameObjects.Sprite {
  private direction;
  private xSpeed;
  private ySpeed;
  private speed;
  private born;

  constructor(scene, x, y) {
    super(scene, x, y, 'fireball');
    this.x = 0;
    this.y = 100;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.speed = 1;
    this.born = 0;
    this.direction = 0;
    this.setVisible(false);
    this.setActive(false);
    this.setScale(0.4);
    scene.add.existing(this);
  }

  update(time, delta) {
    this.x += this.xSpeed * delta;
    this.y += this.ySpeed * delta;
    this.born += delta;
    if (this.born > 1000) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  public fire(shooter, target) {
    this.setPosition(shooter.x, shooter.y); // Initial position
    this.direction = Math.atan((target.x - this.x) / (target.y - this.y));
    this.flipX = this.direction > 0;
    // Calculate X and y velocity of bullet to moves it from shooter to target
    if (target.y >= this.y) {
      this.xSpeed = this.speed * Math.sin(this.direction);
      this.ySpeed = this.speed * Math.cos(this.direction);
    } else {
      this.xSpeed = -this.speed * Math.sin(this.direction);
      this.ySpeed = -this.speed * Math.cos(this.direction);
    }
    this.rotation = shooter.rotation; // angle bullet with shooters rotation
    this.born = 0; // Time since new bullet spawned
    this.scene.anims.play('fly', this);
  }
}
