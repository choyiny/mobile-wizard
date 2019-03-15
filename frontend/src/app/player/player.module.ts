import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import {RoomJoinComponent} from './room-join/room-join.component';
import {AuthService} from '../core/auth.service';

@NgModule({
  declarations: [
    RoomJoinComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule
  ],
  providers: [AuthService]
})
export class PlayerModule { }
