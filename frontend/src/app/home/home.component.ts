import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../helpers/device.service';
import {WizardAPIService} from '../external/wizard-api.service';
import {PlayerPeerService} from '../peer/player-peer.service';
import {Router} from '@angular/router';
import {GameHostService} from '../peer/game-host.service';
import {AuthService} from '../core/auth.service';
import {HealthCheckService} from '../external/health-check.service';

@Component({
  selector: 'wizard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public myWizardName: string;
  private roomId: string;
  private roomName: string;

  private isHost: boolean;

  isPeerUp: boolean;
  isApiUp: boolean;

  // TODO: refactor this crap to use angular forms.

  constructor(public deviceService: DeviceService,
              private apiService: WizardAPIService,
              private playerService: PlayerPeerService,
              private hostService: GameHostService,
              private router: Router,
              public auth: AuthService,
              public healthCheck: HealthCheckService) {
    this.isPeerUp = true;
    this.isApiUp = true;
    this.healthCheck.getPeerServerStatus().subscribe((check) => this.isPeerUp = check);
    this.healthCheck.getApiStatus().subscribe((check) => this.isApiUp = check);

    this.myWizardName = '';
    this.isHost = deviceService.deviceIsDesktop();

    this.auth.user.subscribe((user) => {
      this.apiService.getUserProfile().subscribe(
        (data) => {
          if (data) {
            this.myWizardName = data['nickname'];
          }
        });
    });
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
    this.playerService.connectToHost(this.roomId, this.myWizardName).then(
      () => {this.router.navigate(['players']); },
      () => {console.log('On join error'); });
  }

  public createRoom() {
    this.hostService.gameName = this.roomName;
    this.hostService.createGame();
    this.router.navigate(['hosts/lobby']);
  }

  public updateWizardName(value: string) {
    this.myWizardName = value;
    this.apiService.changeNickName(this.myWizardName).subscribe(
      data => console.log('changed nickname to ' + data['nickname'])
    );

  }

  public updateRoomName(value: string) {
    this.roomName = value;
  }

}
