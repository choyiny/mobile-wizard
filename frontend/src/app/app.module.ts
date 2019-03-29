import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {NgxKjuaModule} from 'ngx-kjua';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditsComponent } from './credits/credits.component';
import { HomeComponent } from './home/home.component';
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
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
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
