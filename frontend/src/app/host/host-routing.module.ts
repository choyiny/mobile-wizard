import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameComponent} from './game/game.component';
import {RoomLobbyComponent} from './room-lobby/room-lobby.component';
import {ResultComponent} from './result/result.component';

const routes: Routes = [
  {
    path: 'lobby',
    component: RoomLobbyComponent,
    data: {state: 'host-lobby'}
  },
  {
    path: 'game',
    component: GameComponent,
    data: {state: 'host-game'}
  },
  {
    path: 'result',
    component: ResultComponent,
    data: {state: 'result'}
  },
  {
    path: '',
    redirectTo: 'game',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
