import { Component, OnInit } from '@angular/core';
import {HostPeerService} from '../../peer/host-peer.service';

@Component({
  selector: 'wizard-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public readonly maxHealth = 100;

  public health1 = 100;
  public health2 = 100;

  public health1Class = 'nes-progress is-success';
  public health2Class = 'nes-progress is-success';

  public action1 = '';
  public action2 = '';

  public player_one_name = '';
  public player_two_name = '';

  public action1class = 'player-action p1-action';
  public action2class = 'player-action p2-action';

  constructor(public peerService: HostPeerService) { }

  ngOnInit() {
  }

  damage(player: number, value: number) {
    if (player === 1) {
      this.health1 -= value;
    } else {
      this.health2 -= value;
    }
  }

  setAction2(actionName: string) {
    this.action2 = actionName;
    this.action2class = 'player-action p2-action animated fadeOutUp';
    // TODO: refactor this bad code
    setTimeout(() => {
      this.action2class = 'player-action p2-action';
      this.action2 = '';
    }, 500);
  }

  setAction1(actionName: string) {
    this.action1 = actionName;
    this.action1class = 'player-action p1-action animated fadeOutUp';
    // TODO: refactor this bad code
    setTimeout(() => {
      this.action1class = 'player-action p1-action';
      this.action1 = '';
    }, 500);
  }
}
