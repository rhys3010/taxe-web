/**
 * company-profile.component.ts
 *
 * The component file for the company profile component to handle API requests etc.
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';

import { Company } from '../../_models/company';
import { CompanyService } from '../../_services/company.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  // The loaded company
  company: Company;
  constructor(private companyService: CompanyService) {
    // Create default company object (in case API returns null)
    this.company = new Company();
    this.company.name = 'Company Not Found';
    this.company.bookings = [];
    this.company.admins = [];
    this.company.drivers = [];
    this.company._id = '';
  }

  /**
   * Called when the component is intialized to load the needed data
   */
  ngOnInit() {
    this.loadCompany();
  }

  /**
   * Load the company information using the company service class
   */
  private loadCompany() {
    // Get the company ID from local storage
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const companyId = currentUser.company;
    // Get the company object from API.
    this.companyService.getCompany(companyId)
      .pipe(first())
      .subscribe(company => {
        this.company = company;
      });
  }
}
