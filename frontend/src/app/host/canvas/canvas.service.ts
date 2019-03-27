import {ElementRef, Injectable} from '@angular/core';
import * as Phaser from 'phaser';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  public game: Phaser.Game;

  constructor() {
  }

  public initGame(canvas: ElementRef = null) {
    this.game = new Phaser.Game({
      canvas: canvas ? canvas.nativeElement : null,
      height: window.innerHeight,
      width: window.innerWidth,
      title: 'Mobile Wizard',
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
      },
      type: Phaser.WEBGL,
    });
    this.game.scene.add('SceneA', SceneA, true);
    Phaser.Display.Canvas.CanvasInterpolation.setCrisp(canvas.nativeElement);
    Phaser.Display.Canvas.Smoothing.disable(canvas.nativeElement);
  }
}

class Player {
  private state = 'idle';

  constructor(public obj: Phaser.GameObjects.Sprite) {
    this.initStateManager();
    obj.setScale(10);
  }

  /*
  Listen for completion of animations and then update to the next state
   */
  private initStateManager() {
    this.obj.on('animationcomplete', (anim, frame) => {
      // console.log(`${this.name} is done ${anim.key}ing`);
      this.state = 'idle';
    });
  }

  /*
  This is not called by Phaser, it must be called explicitly in each scene.update()
   */
  public update() {
    // play the animation for this state
    this.obj.anims.play(this.state, true);
  }
}

class Projectile extends Phaser.GameObjects.Sprite {
  private direction = 0;
  private xSpeed = 0;
  private ySpeed = 0;
  private speed = 1;
  private born = 0;

  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, 'fireball', frame);
  }

  update(time, delta) {
    this.x += this.xSpeed * delta;
    this.y += this.ySpeed * delta;
    this.born += delta;
    if (this.born > 1800) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  method fire(shooter, target) {
    this.setPosition(shooter.x, shooter.y); // Initial position
    this.direction = Math.atan((target.x - this.x) / (target.y - this.y));

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
  }
}

class SceneA extends Phaser.Scene {
  private player1;
  private player2;
  private cursors;
  private playerBullets;

  preload() {
    this.load.spritesheet('character', 'assets/character2.png', {frameWidth: 50, frameHeight: 37});
    this.load.spritesheet('fireball', 'assets/img/fireball/red/spritesheet-512px-by-197px-per-frame.png', {
      frameWidth: 512,
      frameHeight: 197
    });
  }

  create() {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('character', {start: 38, end: 41}),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: 'swing',
      frames: this.anims.generateFrameNumbers('character', {start: 48, end: 52}),
      frameRate: 10,
    });
    this.anims.create({
      key: 'jab',
      frames: this.anims.generateFrameNumbers('character', {start: 86, end: 93}),
      frameRate: 13,
    });
    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('fireball', {start: 0, end: 5}),
      frameRate: 13,
      repeat: -1
    });
    this.player1 = new Player(this.add.sprite(this.cameras.main.centerX - 300, this.cameras.main.centerY + 50, 'character'));
    this.player2 = new Player(this.add.sprite(this.cameras.main.centerX + 300, this.cameras.main.centerY + 50, 'character'));
    // const fireball = this.add.sprite(40, 20, 'fireball');
    // fireball.setScale(0.07);
    // fireball.flipX = true;
    // this.player1.anims.play('swing', true);
    this.player2.obj.flipX = true;
    // fireball.anims.play('fly', true);
    // keyboard listeners
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.world.setBounds(0, 0, 1600, 1200);
    this.playerBullets = this.physics.add.group(Projectile);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player1.state = 'swing';
    }
    if (this.cursors.right.isDown) {
      this.player2.state = 'swing';
    }
    if (this.cursors.up.isDown) {
      const bullet = this.playerBullets.get().setActive().setVisible(true);

      if (bullet) {
        // bullet.fire(this.player1.obj, this.player2.obj);
        console.log(bullet);
      }
    }
    this.player1.update();
    this.player2.update();
  }
}
