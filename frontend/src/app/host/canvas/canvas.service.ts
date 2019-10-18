import {ElementRef, Injectable} from '@angular/core';
import * as Phaser from 'phaser';
import { SceneA } from './scene-a';

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
