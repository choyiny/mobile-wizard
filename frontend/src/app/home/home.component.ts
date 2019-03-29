import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeviceService} from '../helpers/device.service';
import {WizardAPIService} from '../external/wizard-api.service';
import {PlayerPeerService} from '../peer/player-peer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GameHostService} from '../peer/game-host.service';
import {AuthService} from '../core/auth.service';
import {HealthCheckService} from '../external/health-check.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'wizard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private roomId: string;

  private isHost: boolean;

  isPeerUp: boolean;
  isApiUp: boolean;

  createRoomForm: FormGroup;
  joinRoomForm: FormGroup;
  error: string;

  routeSubscription: any;

  constructor(public deviceService: DeviceService,
              private apiService: WizardAPIService,
              public playerService: PlayerPeerService,
              private hostService: GameHostService,
              private router: Router,
              public auth: AuthService,
              private fb: FormBuilder,
              public healthCheck: HealthCheckService,
              private route: ActivatedRoute) {

    // form controls
    this.createRoomForm = this.fb.group({
      roomName: ['', [Validators.required]]
    });

    this.joinRoomForm = this.fb.group({
      wizardName: ['', [Validators.required]],
      roomId: ['', [Validators.required]]
    });

    this.isPeerUp = true;
    this.isApiUp = true;
    this.healthCheck.getPeerServerStatus().subscribe((check) => this.isPeerUp = check);
    this.healthCheck.getApiStatus().subscribe((check) => this.isApiUp = check);

    this.isHost = deviceService.deviceIsDesktop();

    this.auth.user.subscribe((user) => {
      this.apiService.getUserProfile().subscribe(
        (data) => {
          if (data) {
            this.joinRoomForm.controls.wizardName.setValue(data['nickname']);
          }
        });
    });
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      if (params.roomId !== undefined) {
        this.joinRoomForm.controls.roomId.setValue(params.roomId);
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  public isHostScreen() {
    return this.isHost;
  }

  public setHostScreen(op: boolean) {
    this.isHost = op;
  }
  public joinRoom() {
    this.apiService.changeNickName(this.joinRoomForm.value.wizardName).subscribe(() => {});
    this.playerService.connectToHost(this.joinRoomForm.value.roomId, this.joinRoomForm.value.wizardName).then(
      () => {
        this.error = '';
        this.router.navigate(['players']);
      },
      () => {
        this.error = 'invalid room id';
      });
  }

  public createRoom() {
    this.hostService.gameName = this.createRoomForm.value['roomName'] || 'Thierry\'s Office';
    this.hostService.createGame();
    this.router.navigate(['hosts/lobby']);
  }

}
