import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditsComponent } from './credits/credits.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {WizardAPIService} from './external/wizard-api.service';
import {CoreModule} from './core/core.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AuthService} from './core/auth.service';
import {AuthGuard} from './core/auth.guard';
import {DeviceGuard} from './helpers/device.guard';
import {GameGuard} from './helpers/game.guard';

@NgModule({
  declarations: [
    AppComponent,
    CreditsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule
  ],
  providers: [WizardAPIService, AuthService, AuthGuard, DeviceGuard, GameGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
