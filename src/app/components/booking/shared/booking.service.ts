import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from './booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  createBooking(booking: Booking): Observable<any> {
    return this.http.post('/api/v1/bookings' , booking);
  }

  public getManageBookings(): Observable<any> {
    return this.http.get('/api/v1/bookings/manage');
  }
}
