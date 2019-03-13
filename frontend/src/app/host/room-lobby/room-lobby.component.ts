import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HostPeerService} from '../../peer/host-peer.service';
import {GameHostService} from '../../peer/game-host.service';

@Component({
  selector: 'wizard-room-lobby',
  templateUrl: './room-lobby.component.html',
  styleUrls: ['./room-lobby.component.scss']
})
export class RoomLobbyComponent implements OnInit, OnDestroy {
  public player_one_name = 'Empty';
  public player_two_name = 'Empty';

  private event;

  public status = {
    1: 'Throw to get ready!',
    2: 'Strike to get ready!'
  };

  constructor(
    public peerService: GameHostService,
    public router: Router,
    private ref: ChangeDetectorRef
  ) {
    // when ready, start the game, obviously.
    this.event = this.peerService.fromEvent('action').subscribe((data) => {
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
    this.event.unsubscribe();
  }

  startGame() {
    this.router.navigate(['/hosts/game']);
  }

  gameStartable(): boolean {
    return this.status[1] === 'Ready' && this.status[2] === 'Ready';
  }
}
