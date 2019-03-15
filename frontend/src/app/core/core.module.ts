import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AuthService} from './auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireAuthModule,  // imports firebase/auth, only needed for auth features,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
  ],
  providers: [AuthService]
})
export class CoreModule { }
