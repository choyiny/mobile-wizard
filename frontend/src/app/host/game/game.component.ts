import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {GameHostService} from '../../peer/game-host.service';

@Component({
  selector: 'wizard-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  public readonly maxHealth = 100;

  public health1 = 100;
  public health2 = 100;

  public health1Class = 'nes-progress is-success';
  public health2Class = 'nes-progress is-success';

  public action1 = '';
  public action2 = '';

  public player_one_name = '';
  public player_two_name = '';

  public action1class = 'player-action p1-action';
  public action2class = 'player-action p2-action';

  private YELLOW_THRESHOLD = 60;
  private RED_THRESHOLD = 20;

  private subscription;

  constructor(
    public peerService: GameHostService,
    private ref: ChangeDetectorRef
    ) {
    this.subscription = peerService.fromEvent('action').subscribe((data) => {
      console.log(data);
      if (data['actor'] === 1) {
        this.setAction1(data['name']);
        this.damage(2, 10);
      } else if (data['actor'] === 2) {
        this.setAction2(data['name']);
        this.damage(1, 10);
      }
      this.ref.detectChanges();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  damage(player: number, value: number) {
    // TODO: find some better way to do this. this is ugly af
    if (player === 1) {
      this.health1 -= value;
      if (this.health1 < this.YELLOW_THRESHOLD) {
        this.health1Class = 'nes-progress is-warning';
      }
      if (this.health1 < this.RED_THRESHOLD) {
        this.health1Class = 'nes-progress is-error';
      }
    } else {
      this.health2 -= value;
      if (this.health2 < this.YELLOW_THRESHOLD) {
        this.health2Class = 'nes-progress is-warning';
      }
      if (this.health2 < this.RED_THRESHOLD) {
        this.health2Class = 'nes-progress is-error';
      }
    }
  }

  setAction2(actionName: string) {
    this.action2 = actionName;
    this.action2class = 'player-action p2-action animated fadeOutUp';
    // TODO: refactor this bad code
    setTimeout(() => {
      this.action2class = 'player-action p2-action';
      this.action2 = '';
      this.ref.detectChanges();
    }, 500);
  }

  setAction1(actionName: string) {
    this.action1 = actionName;
    this.action1class = 'player-action p1-action animated fadeOutUp';
    // TODO: refactor this bad code
    setTimeout(() => {
      this.action1class = 'player-action p1-action';
      this.action1 = '';
      this.ref.detectChanges();
    }, 500);
  }
}
