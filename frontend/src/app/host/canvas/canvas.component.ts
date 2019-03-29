import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CanvasService} from './canvas.service';
import {GameHostService} from '../../peer/game-host.service';

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

  constructor(
    private cs: CanvasService,
    private hs: GameHostService
  ) {
  }

  public ngAfterViewInit() {
    this.cs.initGame(this.canvas, this.hs.events);
  }
}
