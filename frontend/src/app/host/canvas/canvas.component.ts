import {AfterViewInit, Component, Directive, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as Phaser from 'phaser';

@Component({
  selector: 'wizard-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})

export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') public canvas: ElementRef;

  // setting a width and height for the canvas
  @Input() public width = 400;
  @Input() public height = 400;

  private cx: CanvasRenderingContext2D;

  game: Phaser.Game;

  constructor() {
  }

  public ngAfterViewInit() {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;

    this.game = new Phaser.Game({
      width: 100,
      height: 100,
      canvas: canvasEl,
      title: 'Test Title',
      pixelArt: true,
      zoom: 20,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
      },
      type: Phaser.CANVAS,
      scene: {
        preload: function() {
          this.load.spritesheet('character', 'assets/character2.png', {frameWidth: 50, frameHeight: 37});
          // this.load.setBaseURL('http://labs.phaser.io');
          // this.load.image('sky', 'assets/skies/space3.png');
          // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
          // this.load.image('red', 'assets/particles/red.png');
        },
        create: function() {
          this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
          });
          let player = this.add.sprite(20, 20, 'character');
          player.anims.play('idle', true);
          // let player2 = this.add.sprite(27, 20, 'character');
          // player2.anims.play('idle', true);

          // let character = this.add.sprite(200, 200, 'character');
          // character.anims.add('idle');
          // console.log(character.anims);
          // character.anims.play('idle', 30, true);
          // this.add.image(400, 300, 'sky');
          // const particles = this.add.particles('red');
          // const emitter = particles.createEmitter({
          //   speed: 100,
          //   scale: { start: 1, end: 0 },
          //   blendMode: 'ADD'
          // });
          // const logo = this.physics.add.image(400, 100, 'logo');
          //
          // logo.setVelocity(100, 200);
          // logo.setBounce(1, 1);
          // logo.setCollideWorldBounds(true);
          //
          // emitter.startFollow(logo);

        }
      }
    });
  }
}
