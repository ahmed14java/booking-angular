import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RentalService } from "../shared/rental.service";
import { Rental } from "../shared/model/rental";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-search-rental",
  templateUrl: "./search-rental.component.html",
  styleUrls: ["./search-rental.component.scss"]
})
export class SearchRentalComponent implements OnInit {
  public rentals: Rental[] = [];
  city: string;
  errors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.city = params["city"];
      this.getRentals();
    });
  }

  getRentals() {
    this.errors = [];
    this.rentals = [];
    this.rentalService.getRentalsByCity(this.city).subscribe(result => {
      this.rentals = result;
    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.errors = err.error.errors;
    });
  }

}
