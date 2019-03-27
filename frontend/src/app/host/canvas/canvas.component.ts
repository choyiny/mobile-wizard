import {AfterViewInit, Component, Directive, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as Phaser from 'phaser';
import {CanvasService} from './canvas.service';

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

  constructor(
    private cs: CanvasService
  ) {
  }

  public ngAfterViewInit() {
    this.cs.initGame(this.canvas);
  }
}
