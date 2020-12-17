import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginAuth(body: {}): Observable<object> {
    return this.http.post('https://barbermanagement-api.azurewebsites.net/api/v1/Auth/login', body);
  }

  forgotAuth(body: {}): Observable<object> {
    return this.http.put('https://barbermanagement-api.azurewebsites.net/api/v1/Auth/forgot-password', body);
  }

  changeAuth(body: {}): Observable<object> {
    return this.http.put('https://barbermanagement-api.azurewebsites.net/api/v1/Auth/change-password', body);
  }

}
