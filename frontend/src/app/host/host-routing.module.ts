import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameComponent} from './game/game.component';
import {GameGuard} from '../helpers/game.guard';

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
  exports: [RouterModule],
  providers: [GameGuard]
})
export class HostRoutingModule { }
