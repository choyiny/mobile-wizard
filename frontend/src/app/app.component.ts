import { Component } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AuthService} from './core/auth.service';

@Component({
  selector: 'wizard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mobile-wizard-frontend';

  constructor(public authService: AuthService) {}
}
