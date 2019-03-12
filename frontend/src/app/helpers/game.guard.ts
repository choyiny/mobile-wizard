import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {GameService} from './game.service';

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanActivate {

  constructor(private gameService: GameService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return true;
    return this.gameService.isInGame();
  }
}
