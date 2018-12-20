import { Injectable } from "@angular/core";
import { Rental } from './model/rental';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class RentalService {
  private rentals: Rental[] = [
    {
      id: "1",
      title: "Central Title",
      city: "New York",
      street: "Times Sqaure",
      category: "apartment",
      image: "http://via.placeholder.com/350x250",
      bedrooms: 3,
      description: "Very nice apartment",
      dailyRate: 34,
      shared: false,
      createdAt: "24/12/2017"
    },
    {
      id: "2",
      title: "Central Apartment",
      city: "Cairo",
      street: "Times Sqaure",
      category: "apartment",
      image: "http://via.placeholder.com/350x250",
      bedrooms: 3,
      description: "Very nice apartment",
      dailyRate: 34,
      shared: false,
      createdAt: "24/12/2017"
    },
    {
      id: "3",
      title: "Central Apartment",
      city: "New York",
      street: "Times Sqaure",
      category: "apartment",
      image: "http://via.placeholder.com/350x250",
      bedrooms: 3,
      description: "Very nice apartment",
      dailyRate: 34,
      shared: false,
      createdAt: "24/12/2017"
    },
    {
      id: "4",
      title: "Central Apartment",
      city: "New York",
      street: "Times Sqaure",
      category: "apartment",
      image: "http://via.placeholder.com/350x250",
      bedrooms: 3,
      description: "Very nice apartment",
      dailyRate: 34,
      shared: false,
      createdAt: "24/12/2017"
    }
  ];

  constructor() {}

  getRentealById(rentalId: any): Observable<Rental> {
    return new Observable((observer) => {
      setTimeout(() => {
       const foundRental = this.rentals.find(rental => {
          return rental.id == rentalId;
        });
        observer.next(foundRental);
      }, 500);
    });
  }

  public getRentals(): Observable<Rental[]> {
    const rentalObservable: Observable<Rental[]> = new Observable((observe) => {
      setTimeout(() => {
        observe.next(this.rentals);
      }, 1000);
    })
    return rentalObservable;
  }

}
