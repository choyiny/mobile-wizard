import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreditsComponent} from './credits/credits.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
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
    path: 'hosts',
    loadChildren: './host/host.module#HostModule'
  },
  {
    path: 'players',
    loadChildren: './player/player.module#PlayerModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
