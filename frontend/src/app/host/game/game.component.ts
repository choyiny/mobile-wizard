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

  private YELLOW_THRESHOLD = 60;
  private RED_THRESHOLD = 20;

  constructor(public peerService: HostPeerService) { }

  ngOnInit() {
  }

  damage(player: number, value: number) {
    // TODO: find some better way to do this. this is ugly af
    if (player === 1) {
      this.health1 -= value;
      if (this.health1 < this.YELLOW_THRESHOLD) {
        this.health1Class = 'nes-progress is-warning';
      }
      if (this.health1 < this.RED_THRESHOLD) {
        this.health1Class = 'nes-progress is-error';
      }
    } else {
      this.health2 -= value;
      if (this.health2 < this.YELLOW_THRESHOLD) {
        this.health2Class = 'nes-progress is-warning';
      }
      if (this.health2 < this.RED_THRESHOLD) {
        this.health2Class = 'nes-progress is-error';
      }
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
