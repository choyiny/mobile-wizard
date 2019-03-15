import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GameHostService} from '../../peer/game-host.service';
import {GameState} from '../../peer/game-state.enum';

@Component({
  selector: 'wizard-room-lobby',
  templateUrl: './room-lobby.component.html',
  styleUrls: ['./room-lobby.component.scss']
})
export class RoomLobbyComponent implements OnInit, OnDestroy {

  private actionEvent;
  private joinEvent;
  private leftEvent;

  public status = {
    1: 'Waiting for player to join...',
    2: 'Waiting for player to join...'
  };

  constructor(
    public peerService: GameHostService,
    public router: Router,
    private ref: ChangeDetectorRef
  ) {
    // detect when join!
    this.joinEvent = this.peerService.fromEvent('join').subscribe((playerId) => {
      if (playerId === 1) {
        this.status[1] = 'Throw to get ready!';
      } else if (playerId === 2) {
        this.status[2] = 'Strike to get ready!';
      }
      this.ref.detectChanges();
    });

    // detect when left!
    this.leftEvent = this.peerService.fromEvent('left').subscribe((playerId) => {
      if (playerId === 1) {
        this.status[1] = 'Waiting for player to join...';
      } else if (playerId === 2) {
        this.status[2] = 'Waiting for player to join...';
      }
      this.ref.detectChanges();
    });

    // when ready, start the game, obviously.
    this.actionEvent = this.peerService.fromEvent('action').subscribe((data) => {
      console.log(data);
      if (data['name'] === 'Throw' && data['actor'] === 1) {
          this.status[1] = 'Ready';
      } else if (data['name'] === 'Strike' && data['actor'] === 2) {
          this.status[2] = 'Ready';
      }
      this.ref.detectChanges();
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.actionEvent.unsubscribe();
    this.joinEvent.unsubscribe();
    this.leftEvent.unsubscribe();
  }

  startGame() {
    this.peerService.changeState(GameState.Countdown);
    this.router.navigate(['/hosts/game']);
  }

  gameStartable(): boolean {
    return this.status[1] === 'Ready' && this.status[2] === 'Ready';
  }
}
