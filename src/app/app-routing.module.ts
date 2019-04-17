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
import { MainComponent } from './modules/main/main.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'company-profile',
    pathMatch: 'full',
  }, {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: './modules/main/main.module#MainModule'
      }
    ]
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
    redirectTo: 'company-profile'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
