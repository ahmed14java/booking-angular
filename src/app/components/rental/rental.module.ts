import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import {ToastaModule} from 'ngx-toasta';

import { CommonModule } from "@angular/common";
import { RentalComponent } from "./rental.component";
import { RentalListComponent } from "./rental-list/rental-list.component";
import { RentalListItemComponent } from "./rental-list-item/rental-list-item.component";
import { RentalService } from "./shared/rental.service";
import { RentalDetailComponent } from "./rental-detail/rental-detail.component";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { NgPipesModule } from "ngx-pipes";
import { UppercasePipe } from "src/app/common/pipes/uppercase.pipe";
import { MapModule } from "src/app/common/map/map.module";
import { AuthGuard } from "src/app/auth/shared/auth.guard";
import { Daterangepicker } from "ng2-daterangepicker";
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { HelperService } from 'src/app/common/service/helper.service';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../booking/shared/booking.service';
import { SearchRentalComponent } from './search-rental/search-rental.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';
import { ToastrModule } from 'ngx-toastr';


const routes: Routes = [
  {
    path: "rentals",
    component: RentalComponent,
    children: [
      { path: "", component: RentalListComponent },
      { path: "new", component: RentalCreateComponent , canActivate: [AuthGuard]},
      {
        path: ":rentalId",
        component: RentalDetailComponent
      },
      {path: ':city/homes' , component: SearchRentalComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker,
    FormsModule,
    ToastaModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent,
    UppercasePipe,
    RentalDetailBookingComponent,
    SearchRentalComponent,
    RentalCreateComponent
  ],
  providers: [RentalService , HelperService , BookingService],
  exports: [BrowserModule, ToastaModule]
})
export class RentalModule {}
