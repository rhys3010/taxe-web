/**
 * app-routing.module.ts
 *
 * Handle all of the app's routing for each page
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './modules/auth/auth.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: './modules/auth/auth.module#AuthModule'
      }
    ]
  }, {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
