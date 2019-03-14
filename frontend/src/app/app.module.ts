import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PlayerRoutingModule} from './player/player-routing.module';
import {HostRoutingModule} from './host/host-routing.module';
import {HostModule} from './host/host.module';
import {PlayerModule} from './player/player.module';
import { CreditsComponent } from './credits/credits.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {WizardAPIService} from './external/wizard-api.service';
import {CoreModule} from './core/core.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditsComponent,
    HomeComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule
  ],
  providers: [WizardAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
