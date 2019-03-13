import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameComponent} from './game/game.component';
import {GameGuard} from '../helpers/game.guard';
import {RoomLobbyComponent} from './room-lobby/room-lobby.component';

const routes: Routes = [
  {
    path: 'lobby',
    component: RoomLobbyComponent
  },
  {
    path: 'game',
    component: GameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
