import { Booking } from 'src/app/components/booking/shared/booking';

export class Rental {

  static readonly CATEGORIES = ['house' , 'apartment' , 'condo'];

  _id: string;
  title: string;
  city: string;
  street: string;
  category: string;
  image: string;
  bedrooms: number;
  description: string;
  dailyRate: number;
  shared: boolean;
  createdAt: string;
  bookings: Booking[];
}
