import { Injectable } from "@angular/core";
import { Rental } from './model/rental';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class RentalService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getRentealById(rentalId: any): Observable<any> {
    return this.http.get(`/api/v1/rentals/${rentalId}`);
  }

  public getRentals(): Observable<any> {
    return this.http.get('/api/v1/rentals');
  }

  public getRentalsByCity(city: any): Observable<any> {
    return this.http.get(`/api/v1/rentals?city=${city}`);
  }

  public createRental(rental: Rental): Observable<any> {
    return this.http.post('/api/v1/rentals' , rental);
  }

  public getManageRental(): Observable<any> {
    return this.http.get('/api/v1/rentals/manage');
  }

  public deleteRental(rentalId: any): Observable<any> {
    return this.http.delete(`/api/v1/rentals/${rentalId}`);
  }

}
