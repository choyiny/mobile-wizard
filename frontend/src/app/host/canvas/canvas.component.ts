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
        preload: function () {
          this.load.spritesheet('character', 'assets/character2.png', {frameWidth: 50, frameHeight: 37});
          this.load.spritesheet('fireball', 'assets/img/fireball/red/spritesheet-512px-by-197px-per-frame.png', {
            frameWidth: 512,
            frameHeight: 197
          });
        },
        create: function () {
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
            repeat: -1
          });
          this.anims.create({
            key: 'jab',
            frames: this.anims.generateFrameNumbers('character', {start: 86, end: 93}),
            frameRate: 13,
            repeat: -1
          });
          this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('fireball', {start: 0, end: 5}),
            frameRate: 13,
            repeat: -1
          });
          const player = this.add.sprite(10, 20, 'character');
          const fireball = this.add.sprite(30, 20, 'fireball');
          fireball.setScale(0.07);
          fireball.flipX = true;
          player.anims.play('jab', true);
          fireball.anims.play('fly', true);
        }
      }
    });
  }
}
