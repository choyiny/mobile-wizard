import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostRoutingModule } from './host-routing.module';
import {RoomLobbyComponent} from './room-lobby/room-lobby.component';
import { GameComponent } from './game/game.component';
import { ResultComponent } from './result/result.component';
import {NgxKjuaModule} from 'ngx-kjua';

@NgModule({
  declarations: [
    RoomLobbyComponent,
    GameComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    HostRoutingModule,
    NgxKjuaModule
  ]
})
export class HostModule { }
