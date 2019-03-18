import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import {RoomJoinComponent} from './room-join/room-join.component';
import {AuthService} from '../core/auth.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../core/token.interceptor';

@NgModule({
  declarations: [
    RoomJoinComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class PlayerModule { }
