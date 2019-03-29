import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GameHostService} from '../../peer/game-host.service';
import {GameState} from '../../peer/game-state.enum';
import {RoomService} from '../../external/room.service';
import {environment} from '../../../environments/environment';

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
    public roomService: RoomService,
    public router: Router,
    private ref: ChangeDetectorRef
  ) {
    // detect when join!
    this.joinEvent = this.peerService.events.listen('join', (playerId) => {
      if (playerId === 1) {
        this.status[1] = 'Throw to get ready!';
      } else if (playerId === 2) {
        this.status[2] = 'Strike to get ready!';
      }
      this.ref.detectChanges();
    });

    // detect when left!
    this.leftEvent = this.peerService.events.listen('left', (playerId) => {
      if (playerId === 1) {
        this.status[1] = 'Waiting for player to join...';
      } else if (playerId === 2) {
        this.status[2] = 'Waiting for player to join...';
      }
      this.ref.detectChanges();
    });

    // when ready, start the game, obviously.
    this.actionEvent = this.peerService.events.listen('action', data => {
      console.log(data);
      const action = JSON.parse(data['action']);
      if (action['name'] === 'Throw' && action['actor'] === 1) {
        this.status[1] = 'Ready';
      } else if (action['name'] === 'Strike' && action['actor'] === 2) {
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
    this.roomService.deleteRoom();
  }

  startGame() {
    this.roomService.deleteRoom();
    this.peerService.changeState(GameState.Countdown);
    this.router.navigate(['/hosts/game']);
  }

  gameStartable(): boolean {
    return this.status[1] === 'Ready' && this.status[2] === 'Ready';
  }

  getGameRoomUrl() {
    return environment.frontendUrl + '/join/' + this.roomService.gameRoomId;
  }
}
