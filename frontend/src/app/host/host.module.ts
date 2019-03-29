import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgxKjuaModule} from 'ngx-kjua';

import { HostRoutingModule } from './host-routing.module';
import {RoomLobbyComponent} from './room-lobby/room-lobby.component';
import { GameComponent } from './game/game.component';
import { ResultComponent } from './result/result.component';
import { CanvasComponent } from './canvas/canvas.component';

@NgModule({
  declarations: [
    RoomLobbyComponent,
    GameComponent,
    ResultComponent,
    CanvasComponent
  ],
  imports: [
    CommonModule,
    HostRoutingModule,
    NgxKjuaModule
  ]
})
export class HostModule { }
