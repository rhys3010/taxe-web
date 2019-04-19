/**
 * app.module.ts
 *
 * The main module class for the app
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthComponent } from './modules/auth/auth.component';
import { MainComponent } from './modules/main/main.component';

import { AuthGuard } from './_guards/auth.guard';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

import { AuthenticationService } from './_services/authentication.service';

import { LayoutsModule } from './layouts/layouts.module';
import {NotificationService} from './_services/notification.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    AuthGuard,
    AuthenticationService,
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
