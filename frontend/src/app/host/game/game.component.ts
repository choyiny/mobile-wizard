import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {GameHostService} from '../../peer/game-host.service';

@Component({
  selector: 'wizard-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  public readonly maxHealth = 100;

  public health = [100, 100];

  public healthClass = ['nes-progress is-success', 'nes-progress is-success'];

  public action = ['', ''];

  public player_name = ['', ''];

  public actionClass = ['player-action p1-action', 'player-action p2-action'];

  private YELLOW_THRESHOLD = 60;
  private RED_THRESHOLD = 20;

  private subscription;

  constructor(
    public peerService: GameHostService,
    private ref: ChangeDetectorRef
    ) {
    this.subscription = peerService.fromEvent('action').subscribe((data) => {
      console.log(data);
      if (data['actor'] === 1 || data['actor'] === 2) {
        this.setAction(data['name'], data['actor'] - 1);
        // TODO: damage should only apply for attack, and should get from action
        this.damage(data['actor'] % 2, 10);
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
    this.health[player] -= value;
    if (this.health[player] < this.YELLOW_THRESHOLD) {
      this.healthClass[player] = 'nes-progress is-warning';
    }
    if (this.health[player] < this.RED_THRESHOLD) {
      this.healthClass[player] = 'nes-progress is-error';
    }
  }

  setAction(actionName: string, actor: number) {
    this.action[actor] = actionName;
    this.actionClass[actor] = 'player-action p' + (actor + 1) + '-action animated fadeOutUp';
    setTimeout(() => {
      this.actionClass[actor] = 'player-action p' + (actor + 1) + '-action';
      this.action[actor] = '';
      this.ref.detectChanges();
    }, 500);
  }
}
