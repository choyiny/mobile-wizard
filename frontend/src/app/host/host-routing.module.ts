import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoomCreationComponent} from './room-creation/room-creation.component';
import {RoomLobbyComponent} from './room-lobby/room-lobby.component';

const routes: Routes = [
  {
    path: 'hosts',
    component: RoomCreationComponent,
    children: [
      {
        path: 'lobby',
        component: RoomLobbyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
