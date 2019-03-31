import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, Injectable, NgModule} from '@angular/core';
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://bda780b9b8b7485e83be7130d61584ab@sentry.io/1416143'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}

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
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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
    },
    { provide: ErrorHandler, useClass: SentryErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
