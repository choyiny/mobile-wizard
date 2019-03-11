import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HostPeerService} from '../../peer/host-peer.service';

@Component({
  selector: 'wizard-room-lobby',
  templateUrl: './room-lobby.component.html',
  styleUrls: ['./room-lobby.component.scss']
})
export class RoomLobbyComponent implements OnInit {
  public player_one_name = 'Empty';
  public player_two_name = 'Empty';
  public player_one_status = '';
  public player_two_status = ''; // TODO: refactor into enum

  constructor(
    public peerService: HostPeerService,
    public router: Router
  ) {}

  ngOnInit() {

  }

  startGame() {
    this.router.navigate(['/hosts/game']);
  }

  gameStartable(): boolean {
    return this.player_one_status === 'Ready' && this.player_two_status !== 'Ready';
  }
}
