import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/shared/auth.guard';
import { RentalService } from '../rental/shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';
import { NgPipesModule } from 'ngx-pipes';
import { DateFormatPipe } from 'src/app/common/pipes/date-format.pipe';
import { ManageRentalBookingComponent } from './manage-rental/manage-rental-booking/manage-rental-booking.component';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  {
    path: "manage",
    component: ManageComponent,
    children: [
      { path: "rentals", component: ManageRentalComponent , canActivate: [AuthGuard]},
      { path: "bookings", component: ManageBookingComponent , canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgPipesModule,
    ToastrModule.forRoot()
  ],
  declarations: [ManageComponent ,ManageRentalComponent,ManageBookingComponent , DateFormatPipe, ManageRentalBookingComponent],
  providers: [ RentalService , BookingService ]
})
export class ManageModule { }
