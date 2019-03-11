import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoomJoinComponent} from './room-join/room-join.component';
import {DeviceGuard} from '../helpers/device.guard';

const routes: Routes = [
  {
    path: 'players',
    component: RoomJoinComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DeviceGuard]
})
export class PlayerRoutingModule { }
