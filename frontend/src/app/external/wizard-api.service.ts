import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {AuthService} from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WizardAPIService {

  private endpoint = environment.backend;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  getUserProfile(): Observable<object> {
    if (this.authService.userDetails) {
      return this.http.get(`${environment.backend}/users/${this.authService.userDetails.uid}`);
    } else {
      return of(null);
    }
  }

  getUserStats(): Observable<object> {
    if (this.authService.userDetails) {
      return this.http.get(`${environment.backend}/users/${this.authService.userDetails.uid}/stats`);
    } else {
      return of(null);
    }
  }

  changeNickName(nickname: string): Observable<object> {
    return this.http.patch(`${environment.backend}/users/${this.authService.userDetails.uid}`, {nickname: nickname});
  }

  updateStats(fastest_game: number, most_damage: number, most_damage_blocked: number) {
    return this.http.patch(`${environment.backend}/users/${this.authService.userDetails.uid}/stats`, {
      fastest_game: fastest_game,
      most_damage: most_damage,
      most_damage_blocked: most_damage_blocked
    });
  }

}
