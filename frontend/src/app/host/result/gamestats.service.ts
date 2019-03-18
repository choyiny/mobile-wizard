import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamestatsService {

  public playName = ['', ''];

  private startTime = 0;
  private endTime = 0;

  public winner = -1;

  // The max continuous damage one player made
  public maxDamage = [0, 0];
  // The max continuous defense one player made
  public maxDefense = [0, 0];

  // The accumulated continuous damage one player made
  private accuDamage = [0, 0];
  // The accumulated continuous defense one player made
  private accuDefense = [0, 0];

  constructor() {}

  public gameStart() {
    this.startTime = Date.now();
  }

  public gameEnd(winner: number) {
    this.endTime = Date.now();
    // Last update in case missing
    for (let i = 0; i < 2; i++) {
      this.maxDamage[i] = Math.max(this.maxDamage[i], this.accuDamage[i]);
      this.maxDefense[i] = Math.max(this.maxDefense[i], this.accuDefense[i]);
    }
    this.winner = winner;
  }

  public getDuration() {
    return (this.endTime - this.startTime) / 1000;
  }

  /**
   * Accumulate a players continuous damage and reset his opposite's accumulated continuous
   * defense.
   * @param player the id of a player, 0 or 1.
   * @param damage the new damage this play made.
   */
  public makeDamage(player: number, damage: number) {
    console.log('Player ' + player + 'make damage');
    // Accumulate given players continuous damage
    this.accuDamage[player] += damage;
    this.maxDamage[player] = Math.max(this.maxDamage[player], this.accuDamage[player]);
    // Reset his opposite's accumulated continuous defense.
    const oppo = (player + 1) % 2;
    this.accuDefense[oppo]  = 0;
  }

  /**
   * Accumulate a players continuous defense and reset his opposite's accumulated continuous
   * damage.
   * @param player the id of a player, 0 or 1.
   * @param damage the new damage this play defensed.
   */
  public makeDefense(player: number, damage: number) {
    console.log('Player ' + player + 'make defense');
    // Accumulate given players continuous defense
    this.accuDefense[player] += damage;
    this.maxDefense[player] = Math.max(this.maxDefense[player], this.accuDefense[player]);
    // Reset his opposite's accumulated continuous damage.
    const oppo = (player + 1) % 2;
    this.accuDamage[oppo]  = 0;
  }

  public reset() {
    this.playName = ['', ''];
    this.maxDamage = [0, 0];
    this.maxDefense = [0, 0];
    this.accuDamage = [0, 0];
    this.accuDefense = [0, 0];
    this.startTime = 0;
    this.endTime = 0;
    this.winner = -1;
  }

}
