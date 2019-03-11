import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostRoutingModule } from './host-routing.module';
import {RoomCreationComponent} from './room-creation/room-creation.component';
import {RoomLobbyComponent} from './room-lobby/room-lobby.component';

@NgModule({
  declarations: [
    RoomCreationComponent,
    RoomLobbyComponent
  ],
  imports: [
    CommonModule,
    HostRoutingModule
  ]
})
export class HostModule { }
