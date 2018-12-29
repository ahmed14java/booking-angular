import { NgModule } from "@angular/core";
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

const routes: Routes = [
  {
    path: "rentals",
    component: RentalComponent,
    children: [
      { path: "", component: RentalListComponent },
      {
        path: ":rentalId",
        component: RentalDetailComponent,
        canActivate: [AuthGuard]
      }
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
    Daterangepicker
  ],
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent,
    UppercasePipe,
    RentalDetailBookingComponent
  ],
  providers: [RentalService]
})
export class RentalModule {}
