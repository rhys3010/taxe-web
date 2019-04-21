/**
 * booking.ts
 *
 * Model class for the booking object.
 *
 * @author Rhys Evans
 * @version 0.1
 */
import {User} from './user';

export class Booking {
  _id: string;
  pickup_location: string;
  destination: string;
  time: Date;
  no_passengers: number;
  status: string;
  customer: string | User;
  driver: string | User;
  company: string;
  notes: string[];
  created_at: Date;
}
