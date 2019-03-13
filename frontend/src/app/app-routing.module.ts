import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreditsComponent} from './credits/credits.component';
import {HomeComponent} from './home/home.component';
import {GameGuard} from './helpers/game.guard';
import {DeviceGuard} from './helpers/device.guard';

const routes: Routes = [
  {
    path: 'hosts',
    loadChildren: './host/host.module#HostModule',
    canActivateChild: [GameGuard]
  },
  {
    path: 'players',
    loadChildren: './player/player.module#PlayerModule',
    canActivateChild: [DeviceGuard, GameGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'credits',
    component: CreditsComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
