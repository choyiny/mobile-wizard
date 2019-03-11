import { Component, OnInit } from '@angular/core';
import {Detector} from '../../motion/detector';
import {ActionProcessor} from '../../processor/action-processor';

@Component({
  selector: 'wizard-room-join',
  templateUrl: './room-join.component.html',
  styleUrls: ['./room-join.component.scss']
})
export class RoomJoinComponent implements OnInit {
  player_name = 'Player';

  private status = 'Throw to ready!';

  private output = 'none';

  constructor() {
    const processor = new ActionProcessor((action) => this.status = action.name);
    const detector = new Detector(processor);
    this.output = '';
  }

  ngOnInit() {
  }

  public getStatus(): string {
    return this.status;
  }

}
