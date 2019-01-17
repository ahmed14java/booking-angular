import { element } from 'protractor';
import { Component, OnInit, Input , ViewChild, ViewEncapsulation } from "@angular/core";
import { Booking } from 'src/app/components/booking/shared/booking';
import { HelperService } from 'src/app/common/service/helper.service';
import * as moment from 'moment';
import { Rental } from '../../shared/model/rental';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/components/booking/shared/booking.service';
import { Router } from '@angular/router';
import {ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { AuthService } from 'src/app/auth/shared/auth.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-rental-detail-booking",
  templateUrl: "./rental-detail-booking.component.html",
  styleUrls: ["./rental-detail-booking.component.scss"]
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental: Rental;
  
  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  

  newBooking: Booking;

  daterange: any = {};
  bookedOutDates: any[] = [];
  closeResult: string;
  modalRef: any;
  errors: any[] = [];

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  options: any = {
    locale: { format: Booking.BOOKING_FORMAT },
    alwaysShowCalendars: false,
    autoUpdateInput: false,
    isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  constructor(private helperService: HelperService ,
              private bookingService: BookingService,
              private router: Router,
              private modalService: NgbModal,
              private toastaService:ToastaService, 
              private toastaConfig: ToastaConfig,
              public auth: AuthService
              ) {
               this.toastaConfig.position = 'top-right';
              }
  
addToast() {
    // Just add default Toast with title only
    this.toastaService.success({
        title: "Toast It!",
        msg: "Mmmm, tasties...",
        showClose: true,
        timeout: 5000,
        theme: "bootstrap",
    });
}

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
  }

  private resetDatePicker(){
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  openConfirmModal(content) {
    this.errors = [];
   this.modalRef = this.modalService.open(content);
  }

  private checkForInvalidDates(date){
    return this.bookedOutDates.includes(this.helperService.formatBookingDate(date)) || date.diff(moment() , 'days') < 0;
  }

  private getBookedOutDates(){
    const bookings: Booking[] = this.rental.bookings;
    if (bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
      const dateRange = this.helperService.getBookingRangeOfDates(booking.startAt , booking.endAt);
      this.bookedOutDates.push(...dateRange);
      console.log(this.bookedOutDates);
      
    });
  }
}

private addNewBookedOutDate(bookingDate: any){
  const dateRange = this.helperService.getBookingRangeOfDates(bookingDate.startAt , bookingDate.endAt);
  this.bookedOutDates.push(...dateRange);
  }

  createBooking(){
    console.log(this.newBooking);
    this.newBooking.rental = this.rental;
    this.bookingService.createBooking(this.newBooking).subscribe(
      res => {
        this.addNewBookedOutDate(res);
        this.newBooking = new Booking();
        this.modalRef.close();
        // this.router.navigate([`/rentals/${this.rental._id}`]);
        this.resetDatePicker();
        this.toastaService.success({title: "Toast It!",msg: "Mmmm, tasties...",showClose: true,timeout: 5000,theme: "bootstrap",});
      }, errorResponse => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

  selectedDate(value: any, datepicker?: any) {
  // any object can be passed to the selected event and it will be passed back here
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helperService.formatBookingDate(value.start);
    this.newBooking.endAt = this.helperService.formatBookingDate(value.end);
    this.newBooking.days = -(value.start.diff(value.end , 'days'));
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }
}
