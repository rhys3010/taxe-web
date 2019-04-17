/**
 * auth.module.ts
 *
 * The module file for the app's auth screens to initialize router etc.
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutes } from './auth.routing';

import { LoginComponent } from '../../pages/login/login.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    FormsModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthModule { }
