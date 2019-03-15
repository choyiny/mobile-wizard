import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {auth, User} from 'firebase';


@Injectable({ providedIn: 'root' })
export class AuthService {


  user: Observable<User>;
  public token = null;
  userDetails: User;

  public isReady: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.isReady = false;
    // Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        this.isReady = true;
        if (user) {
          this.userDetails = user;
          return of(user);
        } else {
          this.userDetails = null;
          return of(null);
        }
      })
    );

    // get token from user
    this.user.subscribe((user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          this.token = idToken;
        });
      }
    });
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
