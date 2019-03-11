import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wizard-room-join',
  templateUrl: './room-join.component.html',
  styleUrls: ['./room-join.component.scss']
})
export class RoomJoinComponent implements OnInit {
  player_name = 'Player';

  private status = 'Throw to ready!';

  constructor() { }

  ngOnInit() {
  }

  public getStatus(): string {
    return this.status;
  }

}
