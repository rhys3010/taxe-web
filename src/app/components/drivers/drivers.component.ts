/**
 * drivers.component.ts
 *
 * The component file for the drivers component to handle API requests etc.
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../_models/user';
import { CompanyService } from '../../_services/company.service';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  // The loaded list of drivers
  drivers: User[];
  // The company ID from localstorage
  companyId = JSON.parse(localStorage.getItem('user')).company;
  // Form Stuff
  addDriverForm: FormGroup;
  submitted = false;
  hasError = false;
  constructor(private companyService: CompanyService,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder) {}

  /**
   * Called when the component is initialized to load the drivers list
   */
  ngOnInit() {
    this.loadDrivers();
    // Initialize add driver form
    this.addDriverForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  /**
   * Convenience getter to get form controls
   */
  get f() {
    return this.addDriverForm.controls;
  }

  /**
   * Called by template when the 'add driver' form is submitted
   */
  submitAddDriverForm() {
    this.submitted = true;
    // If the form was invalid, return and show an error
    if (this.addDriverForm.invalid) {
      this.notificationService.showNotification('danger', 'error', 'User Must be Provided')
      this.hasError = true;
      return;
    }
    // Add driver to company and show success message
    this.companyService.addDriver(this.companyId, this.f.email.value)
      .pipe(first())
      .subscribe(
        // Driver Successfully Added
        data => {
          this.notificationService.showNotification('success', 'done', 'Driver Successfully Added');
          // Refresh View
          this.loadDrivers();
          this.hasError = false;
          // Reset Form
          this.addDriverForm.reset();
        },
        // Error Occurred
        error => {
          this.hasError = true;
        }
      );
  }

  /**
   * Remove a driver by ID using company service
   * @param id - The driver's user ID
   */
  removeDriver(id: string) {
    // Remove the driver via company service
    this.companyService.removeDriver(this.companyId, id)
      .pipe(first())
      .subscribe(() => {
        // Send Success Message
        this.notificationService.showNotification('success', 'done',  'Driver Successfully Removed');
        // Update View
        this.loadDrivers();
      });
  }

  /**
   * Load a list of all the company's drivers via the Company Service class
   */
  private loadDrivers() {
    // Get the drivers list from the API
    this.companyService.getDrivers(this.companyId)
      .pipe(first())
      .subscribe(
        drivers => {
          this.drivers = drivers;
        },
        error => {
          // If error occurred, set drivers to empty
          this.drivers = [];
        }
      );
  }
}
