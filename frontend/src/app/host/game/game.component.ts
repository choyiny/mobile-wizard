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

}
