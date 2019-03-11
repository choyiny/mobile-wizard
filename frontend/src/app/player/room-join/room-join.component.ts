import { Component, OnInit } from '@angular/core';
import {Detector} from '../../motion/detector';
import {ActionProcessor} from '../../processor/action-processor';
import {PlayerPeerService} from '../../peer/player-peer.service';

@Component({
  selector: 'wizard-room-join',
  templateUrl: './room-join.component.html',
  styleUrls: ['./room-join.component.scss']
})
export class RoomJoinComponent implements OnInit {
  player_name = 'Player';

  private status = 'Throw to ready!';

  private output = 'none';

  constructor(private peerService: PlayerPeerService) {
    const processor = new ActionProcessor((action) => {
      this.status = action.name;
      peerService.sendAction(action);
    });
    const detector = new Detector(processor);
    this.output = '';
  }

  ngOnInit() {
  }

  public getStatus(): string {
    return this.status;
  }

}
