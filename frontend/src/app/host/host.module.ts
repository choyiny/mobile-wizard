import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostRoutingModule } from './host-routing.module';
import {RoomLobbyComponent} from './room-lobby/room-lobby.component';

@NgModule({
  declarations: [
    RoomLobbyComponent
  ],
  imports: [
    CommonModule,
    HostRoutingModule
  ]
})
export class HostModule { }
