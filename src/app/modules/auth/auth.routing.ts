/**
 * auth.routing.ts
 *
 * The router file to populate the auth layout with login screen etc.
 *
 * @author Rhys Evans
 * @version 0.1
 */
import { Routes } from '@angular/router';

import { LoginComponent } from '../../components/login/login.component';

export const AuthRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];
