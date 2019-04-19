/**
 * company.service.ts
 *
 * Service class for all tasks to do with the company model, fetch company information, edit company, etc.
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class CompanyService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieves a companny by ID via the API
   * @param id
   */
  getCompany(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/companies/${id}`)
      .pipe(map(company => {
        return company;
      }));
  }
}
