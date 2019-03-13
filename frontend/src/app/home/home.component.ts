import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../helpers/device.service';
import {Room} from '../external/room';
import {WizardAPIService} from '../external/wizard-api.service';
import {PlayerPeerService} from '../peer/player-peer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'wizard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private wizardName: string;
  private roomId: string;
  private roomName: string;

  public availableRooms: Room[] = [];

  constructor(public deviceService: DeviceService,
              private apiService: WizardAPIService,
              private peerService: PlayerPeerService,
              private router: Router) {
    apiService.getRooms().subscribe(
      data => this.availableRooms = data,
      err => console.log(err)
    );
  }

  ngOnInit() {

  }

  public updateRoomId(id: string) {
    this.roomId = id;
  }

  public joinRoom() {
    this.peerService.connectToHost(this.roomId);
    this.router.navigate(['players']);
  }

  public createRoom() {
    this.apiService.createRoom(this.roomName).subscribe(
      data => console.log(data)
    );
  }

  public updateWizardName(value: string) {
    this.wizardName = value;
  }

  public updateRoomName(value: string) {
    this.roomName = value;
  }
}
