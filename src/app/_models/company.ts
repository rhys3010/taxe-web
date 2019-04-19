/**
 * company.ts
 *
 * Model class for the company object.
 *
 * @author Rhys Evans
 * @version 0.1
 */

export class Company {
  _id: string;
  name: string;
  admins: string[];
  drivers: string[];
  bookings: string[];
  created_at: Date;
}
