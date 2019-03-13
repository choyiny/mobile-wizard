import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Detector} from '../../motion/detector';
import {ActionProcessor} from '../../processor/action-processor';
import {PlayerPeerService} from '../../peer/player-peer.service';
import {Throw} from '../../processor/throw';

@Component({
  selector: 'wizard-room-join',
  templateUrl: './room-join.component.html',
  styleUrls: ['./room-join.component.scss']
})
export class RoomJoinComponent implements OnInit, OnDestroy {
  player_name = 'Player';

  private status = '';

  private output = 'none';

  private hostEvent;

  constructor(
    private peerService: PlayerPeerService,
    private ref: ChangeDetectorRef) {
    this.hostEvent = this.peerService.fromEvent('host').subscribe((data) => {
      console.log(data);
      if (data['playerId'] === 1) {
        this.status = 'Throw to get ready!';
      } else if (data['playerId'] === 2) {
        this.status = 'Strike to get ready!';
      }
      this.ref.detectChanges();
    });
    // waiting in lobby
    // TODO: we can include how to throw/strike in here.
    const processor = new ActionProcessor((action) => {
      this.status = action.name;
      peerService.sendAction(action);
    });
    const detector = new Detector(processor);
    this.output = '';
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.hostEvent.unsubscribe();
  }

  public getStatus(): string {
    return this.status;
  }

  throwyou() {
    this.peerService.sendAction(new Throw());
  }
}
