/**
 * login.component.ts
 *
 * Use the authentication service to handle user login and logout
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent {}
