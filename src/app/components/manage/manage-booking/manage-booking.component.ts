import { Component, OnInit } from '@angular/core';
import { Booking } from '../../booking/shared/booking';
import { BookingService } from '../../booking/shared/booking.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  bookings: Booking[];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getManageBookings().subscribe(
      (bookings: Booking[]) => {
        this.bookings = bookings;
      }, (err) => {
        console.log(err);
      }
    );
  }


}
