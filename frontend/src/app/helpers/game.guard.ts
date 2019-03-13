import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs';
import {GameService} from './game.service';
import {PlayerPeerService} from '../peer/player-peer.service';
import {GameHostService} from '../peer/game-host.service';

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanActivate, CanActivateChild {

  constructor(private peerService: PlayerPeerService,
              private hostService: GameHostService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return true;
    if (this.peerService.inGame() || this.hostService.hostingGame()) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(next, state);
  }
}
