/**
 * booking.ts
 *
 * Model class for the booking object.
 *
 * @author Rhys Evans
 * @version 0.1
 */

export class Booking {
  _id: string;
  pickup_location: string;
  destination: string;
  time: Date;
  no_passengers: number;
  status: string;
  customer: string;
  driver: string;
  company: string;
  notes: string[];
  created_at: Date;
}
