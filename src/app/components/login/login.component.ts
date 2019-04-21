/**
 * login.component.ts
 *
 * The component file for the login component to handle the API's login request
 * based on the credentials entered in the login form.
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../_services/authentication.service';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;
  hasError = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService) {
  }

  /**
   * Called when the component is initialized
   */
  ngOnInit() {
    // Initialize the login form
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Reset login status
    this.authenticationService.logout();

    // Get return url from route parameters to send user back to where they weree
    // if none exist, send them home
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  /**
   * Convenience getter to get form controls
   */
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Called by template when the 'login' button is pressed on the form
   */
  onSubmit() {
    this.submitted = true;

    // If the form was invalid, return and show error.
    if (this.loginForm.invalid) {
      this.notificationService.showNotification('danger', 'error', 'Email and Password fields must not be empty');
      this.hasError = true;
      return;
    }
    // Log user in using the credentials through the authentication service
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.hasError = true;
        }
      );
  }
}
