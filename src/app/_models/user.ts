/**
 * user.ts
 *
 * Model class for the user object.
 *
 * @author Rhys Evans
 * @version 0.1
 */

export class User {
  _id: string;
  name: string;
  email: string;
  password: string;
  available: boolean;
  role: string;
  company: string;
  bookings: string[];
  created_at: Date;
  token: string;
}
