import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoomLobbyComponent} from './room-lobby/room-lobby.component';

const routes: Routes = [
  {
    path: 'hosts',
    component: RoomLobbyComponent,
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
