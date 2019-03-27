import {AfterViewInit, Component, Directive, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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

  private cx: CanvasRenderingContext2D;

  constructor(
    private cs: CanvasService,
    private hs: GameHostService
  ) {

  }

  public ngAfterViewInit() {
    this.cs.initGame(this.canvas);
    this.hs.fromEvent('action').subscribe((data) => {
      const action = JSON.parse(data['action']);
      if (action['actor'] === 1) {
        switch (action['name']) {
          case 'Strike':
            this.cs.player1.state = 'jab';
        }
      }
    });
  }
}
