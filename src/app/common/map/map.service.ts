import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private geocoder;

  constructor() { }

  public geolocation(location: string): Observable<any> {
    this.geocoder = new (<any>window).google.maps.Geocder();
    return new Observable((observer) => {
      this.geocoder.geocode({address: location}, (result , status) => {
          if(status === 'OK'){
            const geometry = result[0].geometry.location;
            observer.next({lat: geometry.lat(), lng: geometry.lng()});
          }else{
            observer.error('location could not be geocoded');
          }
      });
    });
  }
}
