import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
  }

  startGame() {

  }

  gameStartable(): boolean {
    return this.player_one_status === 'Ready' && this.player_two_status !== 'Ready';
  }
}
