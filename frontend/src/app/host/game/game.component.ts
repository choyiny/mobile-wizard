import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {GameHostService} from '../../peer/game-host.service';
import {GameState} from '../../peer/game-state.enum';
import {GamestatsService} from '../result/gamestats.service';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {delay, tap} from 'rxjs/operators';

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
  public countdown_display: any; // string or number

  private player_defense = [-1, -1];
  constructor(
    public peerService: GameHostService,
    public gamestats: GamestatsService,
    private router: Router,
    private ref: ChangeDetectorRef
    ) {

    // Set player name for display
    this.player_name[0] = peerService.playerNames[1];
    this.player_name[1] = peerService.playerNames[2];
    // Set player name for game stats
    gamestats.playName[0] = peerService.playerNames[1];
    gamestats.playName[1] = peerService.playerNames[2];

    // start countdown on screen
    if (peerService.gameState === GameState.Countdown) {
      this.startCountdown();
    }

    this.subscription = peerService.events.listen('action', (data) => {
      // if game state is in game, process action.
      if (peerService.gameState === GameState.InGame) {
        const action = JSON.parse(data['action']);
        if (action['actor'] === 1 || action['actor'] === 2) {
          this.setAction(action['name'], action['actor'] - 1);
          this.judge(action);
        }
        this.ref.detectChanges();
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  judge(action) {
    // Get current player and opposite
    const me = action['actor'] - 1;
    const oppo = action['actor'] % 2;
    if (action['name'] === 'Strike' || action['name'] === 'Throw') {
      // On attack action, it current player didn't perform a defense, or last defense is
      // performed before attack defense time range, this attack succeeds, calculate damage.
      if (this.player_defense[oppo] < 0 || action['timestamp'] - this.player_defense[oppo] > action['dfrange']) {
        this.player_defense[oppo] = -1; // The latest defense is no longer effective, reset.
        this.damage(oppo, action['damage']); // Calculate the damage to opposite
        // Reset opposite's accumulated continuous defense and accumulate my continuous damage
        this.gamestats.makeDamage(me, action['damage']);
      } else {
        // Opposite defense succeeded
        // Accumulate his continuous defense and reset my continuous damage
        this.gamestats.makeDefense(oppo, action['damage']);
      }
    } else if (action['name'] === 'Defense') {
      // Update the latest defense of current player
      this.player_defense[me] = action['timestamp'];
    }
    this.checkIfEnd();
  }


  damage(player: number, value: number) {
    this.health[player] -= value;
    this.peerService.events.emit('damagePlayer', {
      source: player === 0 ? 2 : 1,
      target: player === 0 ? 1 : 2,
      value: value
    });
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

  private checkIfEnd() {
    if (this.health[0] <= 0) {
      this.countdown_display = 'Player 2 has won!';
      this.peerService.changeState(GameState.Ended);
      this.gamestats.gameEnd(1);
      this.peerService.events.emit('gameEnd', {winner: 1});
      this.displayStatic();
    } else if (this.health[1] <= 0) {
      this.countdown_display = 'Player 1 has won!';
      this.peerService.changeState(GameState.Ended);
      this.gamestats.gameEnd(0);
      this.peerService.events.emit('gameEnd', {winner: 0});
      this.displayStatic();
    }
  }

  private displayStatic() {
    // Send back game statistics
    // For player 1
    this.peerService.sendGameStats(0, this.gamestats.getDuration(),
      this.gamestats.maxDamage[0], this.gamestats.maxDefense[0]);
    // For player 2
    this.peerService.sendGameStats(1, this.gamestats.getDuration(),
      this.gamestats.maxDamage[1], this.gamestats.maxDefense[1]);
    // Go to result page after 2s, in case some operations in setAction haven't finished
    of(true).pipe(
      delay(2000),
      tap(() => {
        this.peerService.reset();
        this.router.navigate(['/hosts/result']);
      })
    ).subscribe(() => {});
  }

  private startCountdown() {
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        this.countdown_display = 3 - i;
        if (this.countdown_display === 0) {
          this.peerService.changeState(GameState.InGame);
          this.countdown_display = 'GO!';
          this.gamestats.gameStart();
          // this.peerService.startTime = new Date();
        } else if (this.countdown_display === -1) {
          this.countdown_display = '';
        }
        this.ref.detectChanges();
      }, i * 1000);
    }
  }
}
