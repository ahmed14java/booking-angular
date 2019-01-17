import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/model/rental';
import { RentalService } from '../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {


  rental: Rental = new Rental();
  categories = Rental.CATEGORIES;
  errors: any[] = [];


  constructor(private rentalService: RentalService , private router: Router) { }

  ngOnInit() {
    this.rental.shared = false;
  }

  createRental() {
    console.log(this.rental);
    this.rentalService.createRental(this.rental).subscribe(
      res => {
        this.router.navigate([`/rentals/${res._id}`]);
      }, (err: HttpErrorResponse) => {
        this.errors = err.error.errors;
      }
    );
  }

  handleImageChange(){
    console.log('handle image called');
    this.rental.image = 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg';
  }
}
