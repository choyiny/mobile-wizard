import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreditsComponent} from './credits/credits.component';
import {HomeComponent} from './home/home.component';
import {GameGuard} from './helpers/game.guard';
import {DeviceGuard} from './helpers/device.guard';
import {AuthGuard} from './core/auth.guard';

const routes: Routes = [
  {
    path: 'hosts',
    loadChildren: './host/host.module#HostModule',
    canActivateChild: []
  },
  {
    path: 'players',
    loadChildren: './player/player.module#PlayerModule',
    canActivateChild: [AuthGuard, DeviceGuard, GameGuard]
  },
  {
    path: 'home',
    // component: HomeComponent
    redirectTo: 'hosts'
  },
  {
    path: 'credits',
    component: CreditsComponent
  },
  {
    path: '**',
    redirectTo: 'hosts'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
