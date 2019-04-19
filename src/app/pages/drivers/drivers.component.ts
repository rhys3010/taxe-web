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
  constructor(private companyService: CompanyService,
              private notificationService: NotificationService) {}

  /**
   * Called when the component is initialized to load the drivers list
   */
  ngOnInit() {
    this.loadDrivers();
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
        console.log(this.drivers);
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
          // If error ocurred, set drivers to empty
          this.drivers = [];
        }
      );
  }
}
