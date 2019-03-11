import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoomLobbyComponent} from './room-lobby/room-lobby.component';
import {GameComponent} from './game/game.component';

const routes: Routes = [
  {
    path: 'hosts',
    component: GameComponent,
    children: [
      {
        path: 'game',
        component: GameComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
