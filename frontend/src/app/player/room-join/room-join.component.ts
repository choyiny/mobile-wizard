import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Detector} from '../../motion/detector';
import {ActionProcessor} from '../../processor/action-processor';
import {PlayerPeerService} from '../../peer/player-peer.service';
import {Throw} from '../../processor/throw';
import {Defense} from '../../processor/defense';
import {AuthService} from '../../core/auth.service';
import {Strike} from '../../processor/strike';
import {WizardAPIService} from '../../external/wizard-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'wizard-room-join',
  templateUrl: './room-join.component.html',
  styleUrls: ['./room-join.component.scss']
})
export class RoomJoinComponent implements OnInit, OnDestroy {

  private status = '';

  private output = 'none';

  private playerIdEvent;
  private gameStatsEvent;

  // Class name for button after game ends
  public gameEndButton = 'gameEndHide';
  public buttons = 'gameEndHide'
  public gameEndStats = 'gameEndHide';
  public duration = 'No record';
  public most_damage = 0;
  public most_defense = 0;

  constructor(
    private peerService: PlayerPeerService,
    private ref: ChangeDetectorRef,
    private apiService: WizardAPIService,
    public auth: AuthService,
    private router: Router) {
    this.gameEndButton =  'gameEnd';
    this.playerIdEvent = this.peerService.fromEvent('playerId').subscribe((data) => {
      console.log(data);
      if (data['playerId'] === 1) {
        this.status = 'Throw to get ready!';
      } else if (data['playerId'] === 2) {
        this.status = 'Strike to get ready!';
      }
      this.ref.detectChanges();
    });

    this.gameStatsEvent = this.peerService.fromEvent('gamestats').subscribe((data) => {
      // When game stats data arrives, game ends. So first update user status.
      this.duration = data['fastest_game'];
      this.most_damage = data['most_damage'];
      this.most_defense = data['most_damage_blocked'];
      this.apiService.updateStats(data['fastest_game'], data['most_damage'], data['most_damage_blocked'])
        .subscribe((res) => {
          console.log(res);
          // Display button for new game
          this.gameEndButton = 'nes-btn is-success';
          this.gameEndStats = 'userstats nes-container';
          this.buttons = 'gameEndButton';
          this.ref.detectChanges();
      });
    });
    // waiting in lobby
    // TODO: we can include how to throw/strike in here.
    const processor = new ActionProcessor((action) => {
      this.status = action.name;
      peerService.sendAction(action);
    });
    const detector = new Detector(processor);
    this.output = '';
  }

  public getMyName() {
    return this.peerService.myName;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.playerIdEvent.unsubscribe();
  }

  public getStatus(): string {
    return this.status;
  }

  testThrow() {
    this.peerService.sendAction(new Throw());
  }

  testDefense() {
    this.peerService.sendAction(new Defense());
  }

  testStrike() {
    this.peerService.sendAction(new Strike());
  }

  public newGame() {
    this.router.navigate(['home']);
  }

  public userStats() {
    this.router.navigate(['userstats']);
  }
}
