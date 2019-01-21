import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../rental/shared/rental.service';
import { Rental } from '../../rental/shared/model/rental';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {

  rentals: Rental[] ;
  rentalDeleteIndex: number;

  constructor(private rentalService: RentalService , private toastr: ToastrService) { }

  ngOnInit() {
    this.rentalService.getManageRental().subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      }, (err) => {
        console.log(err);
      }
    );
  }

  deleteRental(rentalId: any){
    this.rentalService.deleteRental(rentalId).subscribe(
      () => {
        this.rentals.splice(this.rentalDeleteIndex , 1);
        this.rentalDeleteIndex = undefined;
      }, (err: HttpErrorResponse) => {
        this.toastr.error(err.error.errors[0].detail , 'Failed!' , {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      }
    );
  }

}
