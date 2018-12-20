import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/model/rental';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {

  id: any;
  rental: Rental;

  constructor(private route: ActivatedRoute , private rentalService: RentalService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id  = params['rentalId'];
      this.rentalService.getRentealById(params['rentalId']).subscribe(
        resule => {
          this.rental = resule;
          console.log(resule);
          
        }
      );
    });
  }

}
