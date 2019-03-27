import {ElementRef, Injectable} from '@angular/core';
import * as Phaser from 'phaser';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  public game: Phaser.Game;
  public player1: Player;
  public player2: Player;
  public fireballs: Phaser.GameObjects.Group;

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
    // const scene = this.game.scene.getScene('SceneA');
    // this.player1 = new Player(scene, scene.cameras.main.centerX - 300, scene.cameras.main.centerY + 50);
    // this.player2 = new Player(scene, scene.cameras.main.centerX + 300, scene.cameras.main.centerY + 50);
    // const thing = [];
    // for (let i = 0; i < 20; i++) {
    //   thing.push(new Projectile(this, 0, 0));
    // }
    // this.fireballs  = scene.add.group(thing);
    Phaser.Display.Canvas.CanvasInterpolation.setCrisp(canvas.nativeElement);
    Phaser.Display.Canvas.Smoothing.disable(canvas.nativeElement);
  }
}

class Player extends Phaser.GameObjects.Sprite {
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
    this.on('animationcomplete', (anim, frame) => {
      // console.log(`${this.name} is done ${anim.key}ing`);
      this.state = 'idle';
    });
  }

  /*
  This is not called by Phaser, it must be called explicitly in each scene.update()
   */
  public update() {
    // play the animation for this state
    this.anims.play(this.state, true);
  }
}

class Projectile extends Phaser.GameObjects.Sprite {
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
    console.log(this.direction);
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

class SceneA extends Phaser.Scene {
  private player1;
  private player2;
  private cursors;
  private playerBullets: Phaser.GameObjects.Group;

  preload() {
    this.load.spritesheet('character', 'assets/character2.png', {frameWidth: 50, frameHeight: 37});
    this.load.spritesheet('fireball', 'assets/img/fireball/red/spritesheet-512px-by-197px-per-frame.png', {
      frameWidth: 512,
      frameHeight: 197
    });
  }

  create() {
    this.cameras.main.setBackgroundColor('#ffffff');
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
    this.player1 = new Player(this, this.cameras.main.centerX - 300, this.cameras.main.centerY + 50);
    this.player2 = new Player(this, this.cameras.main.centerX + 300, this.cameras.main.centerY + 50);
    this.player2.flipX = true;

    // keyboard listeners
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height);
    const thing = [];
    for (let i = 0; i < 20; i++) {
      thing.push(new Projectile(this, 0, 0));
    }
    this.playerBullets = this.add.group(thing);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player1.state = 'swing';
    }
    if (this.cursors.right.isDown) {
      this.player2.state = 'swing';
    }
    if (this.cursors.up.isDown) {
      this.player1.state = 'jab';
      const bullet = this.playerBullets.getFirstDead();

      if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.fire(this.player1, this.player2);
      }
    }
    if (this.cursors.down.isDown) {
      this.player2.state = 'jab';
      const bullet = this.playerBullets.getFirstDead();

      if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.fire(this.player2, this.player1);
      }
    }
    this.player1.update();
    this.player2.update();
    this.playerBullets.runChildUpdate = true;
  }
}
