import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditsComponent } from './credits/credits.component';
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {WizardAPIService} from './external/wizard-api.service';
import {CoreModule} from './core/core.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AuthService} from './core/auth.service';
import {AuthGuard} from './core/auth.guard';
import {DeviceGuard} from './helpers/device.guard';
import {GameGuard} from './helpers/game.guard';
import {TokenInterceptor} from './core/token.interceptor';
import { UserStatsComponent } from './user-stats/user-stats.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CreditsComponent,
    HomeComponent,
    UserStatsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule
  ],
  providers: [
    WizardAPIService,
    AuthService,
    AuthGuard,
    DeviceGuard,
    GameGuard,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
