/**
 * sidebar.components.ts
 *
 * The component file for the shared sidebar layout
 *
 * @author Creative Tim
 * @author Rhys Evans
 * @version 0.1
 */

import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/company-profile', title: 'Company Profile', icon: 'account_box', class: '' },
  { path: '/drivers', title: 'Drivers', icon: 'people', class: ''},
  { path: '/active-bookings', title: 'Active Bookings', icon: 'local_taxi', class: '' },
  { path: '/available-bookings', title: 'Available Bookings', icon: 'list', class: '' },
  { path: '/booking-history', title: 'Booking History', icon: 'history', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    return $(window).width() <= 991;
  };
}
