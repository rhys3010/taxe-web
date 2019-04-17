/**
 * footer.components.ts
 *
 * The component file for the shared footer layout
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  // Pass today's date to footer for copyright notice
  date: Date = new Date();

  constructor() {}

  ngOnInit(): void {
  }
}
