import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoomJoinComponent} from './room-join/room-join.component';
import {DeviceGuard} from '../helpers/device.guard';
import {GameGuard} from '../helpers/game.guard';

const routes: Routes = [
  {
    path: '',
    component: RoomJoinComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
