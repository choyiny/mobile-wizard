import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../helpers/device.service';
import {Room} from '../external/room';
import {WizardAPIService} from '../external/wizard-api.service';

@Component({
  selector: 'wizard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private wizardName: string;
  private roomId: string;

  public availableRooms: Room[] = [];

  constructor(public deviceService: DeviceService,
              private apiService: WizardAPIService) {
    // apiService.getRooms().subscribe(
    //   data => this.availableRooms = data,
    //   err => console.log(err)
    // );
  }

  ngOnInit() {

  }

  public updateRoomName(id: string) {
    this.roomId = id;
  }

  public joinRoom() {
    this.apiService.joinRoom(this.roomId, this.wizardName).subscribe(
      data => console.log(data)
    );
  }

  public createRoom() {
    this.apiService.createRoom(name).subscribe(
      data => console.log(data)
    );
  }

  public updateWizardName(value: string) {
    this.wizardName = value;
  }
}
