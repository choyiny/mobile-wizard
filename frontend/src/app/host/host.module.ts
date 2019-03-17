import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostRoutingModule } from './host-routing.module';
import {RoomLobbyComponent} from './room-lobby/room-lobby.component';
import { GameComponent } from './game/game.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    RoomLobbyComponent,
    GameComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    HostRoutingModule
  ]
})
export class HostModule { }
