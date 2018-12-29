import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { DebugContext } from '@angular/core/src/view';

class DecodedToken {
  exp: number = 0;
  username: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private decodedToken ;

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { 
    this.decodedToken = JSON.parse(localStorage.getItem('jwt_meta')) || new DecodedToken();
  }

  saveToken(token: string): string {
    this.decodedToken = jwt.decode(token);
    localStorage.setItem('jwt' , token);
    localStorage.setItem('jwt_meta' , JSON.stringify(this.decodedToken));
    return token;
  }

  register(data: any): Observable<any>{
    return this.http.post(`/api/v1/users/register` , data);
  }
  login(data: any): Observable<any>{
    return this.http.post(`/api/v1/users/auth` , data);
  }

  public isAuthenticated(): boolean {
  return moment().isBefore(this.getExpiration());
  }

  private getExpiration(){
    return moment.unix(this.decodedToken.exp); 
  }

  public logout(){
    localStorage.clear();
    this.decodedToken = new DecodedToken();
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }

  public getAuthToken(): string {
    return localStorage.getItem('jwt');
  }
}
