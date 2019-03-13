import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // set to true temporarily for debugging purposes so we can access all views until peer is setup
  private inGame = true;

  constructor() { }

  public setInGame(status: boolean) {
    this.inGame = status;
  }

  public isInGame(): boolean {
    return this.inGame;
  }
}
