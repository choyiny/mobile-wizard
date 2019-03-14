import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoomJoinComponent} from './room-join/room-join.component';

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
