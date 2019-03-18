import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameComponent} from './game/game.component';
import {GameGuard} from '../helpers/game.guard';
import {RoomLobbyComponent} from './room-lobby/room-lobby.component';
import {ResultComponent} from './result/result.component';

const routes: Routes = [
  {
    path: 'lobby',
    component: RoomLobbyComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: '',
    redirectTo: 'game'
  },
  {
    path: 'result',
    component: ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
