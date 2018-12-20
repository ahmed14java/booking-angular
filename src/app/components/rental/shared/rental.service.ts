import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RentalService {
  private rentals: any[] = [
    {
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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

  public getRentals(): any[] {
    return this.rentals;
  }

}
