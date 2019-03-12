import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private inGame = false;

  constructor() { }

  public setInGame(status: boolean) {
    this.inGame = status;
  }

  public isInGame(): boolean {
    return this.inGame;
  }
}
