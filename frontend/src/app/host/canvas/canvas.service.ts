import {ElementRef, Injectable} from '@angular/core';
import * as Phaser from 'phaser';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  public game: Phaser.Game;

  public initGame(canvas: ElementRef = null, gameEvents) {
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
    this.game.scene.add('SceneA', SceneA, true, gameEvents);
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
    if (this.state !== 'dead') {
      this.anims.play(this.state, true);
    }
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
  public player1;
  public player2;
  private cursors;
  private playerProjectiles: Phaser.GameObjects.Group;

  preload() {
    this.load.spritesheet('character', 'assets/character.png', {frameWidth: 50, frameHeight: 37});
    this.load.spritesheet('character-combat', 'assets/character-combat.png', {frameWidth: 50, frameHeight: 37});
    this.load.spritesheet('fireball', 'assets/img/fireball/red/spritesheet-512px-by-197px-per-frame.png', {
      frameWidth: 512,
      frameHeight: 197
    });
  }

  create(gameEvents) {
    this.cameras.main.setBackgroundColor('#ffffff');

    // setting animations
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
      frameRate: 10,
    });
    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('fireball', {start: 0, end: 5}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'die',
      frames: this.anims.generateFrameNumbers('character-combat', {start: 32, end: 39}),
      frameRate: 6,
    });
    this.anims.create({
      key: 'block',
      frames: this.anims.generateFrameNames('character-combat', {start: 20, end: 20}),
      repeat: 15
    });
    this.player1 = new Player(this, this.cameras.main.centerX - 300, this.cameras.main.centerY + 50);
    this.player2 = new Player(this, this.cameras.main.centerX + 300, this.cameras.main.centerY + 50);
    this.player2.flipX = true;

    // keyboard listeners
    this.cursors = this.input.keyboard.createCursorKeys();

    // generate projectile objects (limited to 20)
    this.physics.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height);
    const projectileGameObjects = [];
    for (let i = 0; i < 20; i++) {
      projectileGameObjects.push(new Projectile(this, 0, 0));
    }
    this.playerProjectiles = this.add.group(projectileGameObjects);

    // sync up actions with action emitter
    gameEvents.listen('action', data => {
      const action = JSON.parse(data['action']);
      let player: Player;

      // check which player emitted the action
      if (action['actor'] === 1) {
        player = this.player1;
      } else if (action['actor'] === 2) {
        player = this.player2;
      }

      // update player states depending on event
      if (action['name'] === 'Strike') {
        // player is in 'jab' state
        player.state = 'jab';

        // spawn a projectile
        const projectile = this.playerProjectiles.getFirstDead();
        if (projectile) {
          projectile.setActive(true);
          projectile.setVisible(true);
          projectile.fire(player, action['actor'] === 1 ? this.player2 : this.player1);
        }
      }
      if (action['name'] === 'Throw') {
        player.state = 'swing';
      }
      if (action['name'] === 'Defense') {
        player.state = 'block';
      }
    });

    // kill player when game ends
    gameEvents.listen('gameEnd', data => {
      if (data.winner = 1) {
        this.player2.state = 'die';
      } else if (data.winner = 0) {
        this.player1.state = 'die';
      }
    });
  }

  update() {
    this.player1.update();
    this.player2.update();
    this.playerProjectiles.runChildUpdate = true;
  }
}
