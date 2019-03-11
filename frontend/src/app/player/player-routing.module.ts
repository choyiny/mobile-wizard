import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoomJoinComponent} from './room-join/room-join.component';
import {DeviceGuard} from '../helpers/device.guard';

const routes: Routes = [
  {
    path: 'players',
    component: RoomJoinComponent,
    children: [
      {
        path: 'join',
        component: RoomJoinComponent
      },
      { path: '', redirectTo: 'join', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DeviceGuard]
})
export class PlayerRoutingModule { }
