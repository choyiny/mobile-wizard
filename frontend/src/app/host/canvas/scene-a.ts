import * as Phaser from 'phaser';
import { Player } from './player';
import { Projectile } from './projectile';

export class SceneA extends Phaser.Scene {
  public player1;
  public player2;
  private cursors;
  private playerProjectiles: Phaser.GameObjects.Group;

  preload() {
    this.load.spritesheet('character', 'assets/character.png', { frameWidth: 50, frameHeight: 37 });
    this.load.spritesheet('character-combat', 'assets/character-combat.png', { frameWidth: 50, frameHeight: 37 });
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
      frames: this.anims.generateFrameNumbers('character', { start: 38, end: 41 }),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: 'swing',
      frames: this.anims.generateFrameNumbers('character', { start: 48, end: 52 }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'jab',
      frames: this.anims.generateFrameNumbers('character', { start: 86, end: 93 }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'die',
      frames: this.anims.generateFrameNumbers('character-combat', { start: 32, end: 39 }),
      frameRate: 6,
    });
    this.anims.create({
      key: 'block',
      frames: this.anims.generateFrameNames('character-combat', { start: 20, end: 20 }),
      repeat: 15
    });
    this.anims.create({
      key: 'hit',
      frames: this.anims.generateFrameNumbers('character-combat', { start: 33, end: 33 }),
      repeat: 5
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
    // damage player event
    gameEvents.listen('damagePlayer', data => {
      if (data.target === 1) {
        this.player1.state = 'hit';
      }
      if (data.target === 2) {
        this.player2.state = 'hit';
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
