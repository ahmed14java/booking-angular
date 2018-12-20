import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RentalComponent , RentalListComponent , RentalListItemComponent]
})
export class RentalModule { }
