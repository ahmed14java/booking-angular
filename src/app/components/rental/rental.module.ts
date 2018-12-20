import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RentalComponent } from "./rental.component";
import { RentalListComponent } from "./rental-list/rental-list.component";
import { RentalListItemComponent } from "./rental-list-item/rental-list-item.component";
import { RentalService } from "./shared/rental.service";
import { RentalDetailComponent } from "./rental-detail/rental-detail.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "rentals", component: RentalComponent, children: [
    {path: '' , component: RentalListComponent},
    {path: ':rentalId' , component: RentalDetailComponent},
  ] }
];

@NgModule({
  imports: [CommonModule , RouterModule.forRoot(routes)],
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent
  ],
  providers: [RentalService]
})
export class RentalModule {}
