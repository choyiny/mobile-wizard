import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../helpers/device.service';
import {Room} from '../external/room';
import {WizardAPIService} from '../external/wizard-api.service';
import {PlayerPeerService} from '../peer/player-peer.service';
import {Router} from '@angular/router';
import {GameHostService} from '../peer/game-host.service';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'wizard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private wizardName: string;
  private roomId: string;
  private roomName: string;

  private isHost: boolean;

  // TODO: refactor this crap to use angular forms.

  constructor(public deviceService: DeviceService,
              private apiService: WizardAPIService,
              private playerService: PlayerPeerService,
              private hostService: GameHostService,
              private router: Router,
              public auth: AuthService) {
    // apiService.getRooms().subscribe(
    //   data => this.availableRooms = data,
    //   err => console.log(err)
    // );
    this.isHost = deviceService.deviceIsDesktop();
  }

  ngOnInit() {

  }

  public isHostScreen() {
    return this.isHost;
  }

  public setHostScreen(op: boolean) {
    this.isHost = op;
  }

  public updateRoomId(id: string) {
    this.roomId = id;
  }

  public joinRoom() {
    this.playerService.connectToHost(this.roomId, this.wizardName);
    this.router.navigate(['players']);
    // this.apiService.joinRoom(this.roomId, this.wizardName).subscribe(
    //   data => console.log(data)
    // );
  }

  public createRoom() {
    // this.apiService.createRoom(this.roomName).subscribe(
    //   data => console.log(data)
    // );
    // TODO: fail to create? non-unique room id?
    this.hostService.createGame(this.roomName);
    this.router.navigate(['hosts/lobby']);
  }

  public updateWizardName(value: string) {
    this.wizardName = value;
  }

  public updateRoomName(value: string) {
    this.roomName = value;
  }

}
