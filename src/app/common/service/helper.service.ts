import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/components/booking/shared/booking';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public getRangeOfDate(startAt , endAt , dateFormat) {
    const tempDates = [];
    const mEndDate = moment(endAt);
    let mStartAt = moment(startAt);

    while (mStartAt < mEndDate) {
      tempDates.push(mStartAt.format(dateFormat));
      mStartAt = mStartAt.add(1 , 'day');
    }
    tempDates.push(moment(startAt).format(dateFormat));
    tempDates.push(mEndDate.format(dateFormat));

    return tempDates;
  }

  private formatDate(date , dateFormat) {
    return moment(date).format(dateFormat);
  }

  public formatBookingDate(date) {
    return this.formatDate(date , Booking.BOOKING_FORMAT);
  }

  public getBookingRangeOfDates(startAt , endAt){
    return this.getRangeOfDate(startAt , endAt , Booking.BOOKING_FORMAT);
  }
}
