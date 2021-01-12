import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  header: any;

  constructor(private http: HttpClient) {
    this.header = ({ Authorization: 'Bearer ' + localStorage.getItem('Token') });
  }

  addSchedule(body: {}): Observable<object> {
    return this.http.post('https://barbermanagement-api.azurewebsites.net/api/v1/schedule', body, { headers: this.header });
  }

  getSchedules(guid, date): Observable<object> {
    return this.http.get('https://barbermanagement-api.azurewebsites.net/api/v1/schedule/by-date/'
      + guid + '/' + date, { headers: this.header });
  }

  deleteSchedule(guid, id): Observable<object> {
    return this.http.delete('https://barbermanagement-api.azurewebsites.net/api/v1/schedule/'
      + guid + '/' + id, { headers: this.header });
  }

  getServices(guid): Observable<object> {
    return this.http.get('https://barbermanagement-api.azurewebsites.net/api/v1/service/' + guid, { headers: this.header });
  }

  getService(guid, id): Observable<object> {
    return this.http.get('https://barbermanagement-api.azurewebsites.net/api/v1/service/'
      + guid + '/' + id, { headers: this.header });
  }

  addClient(body: {}): Observable<object> {
    return this.http.post('https://barbermanagement-api.azurewebsites.net/api/v1/client/', body, { headers: this.header });
  }

  getClients(guid): Observable<object> {
    return this.http.get('https://barbermanagement-api.azurewebsites.net/api/v1/client/' + guid, { headers: this.header });
  }

  deleteClient(guid, id): Observable<object> {
    return this.http.delete('https://barbermanagement-api.azurewebsites.net/api/v1/client/' + guid + '/' + id, { headers: this.header });
  }

  editClient(body: {}): Observable<object> {
    return this.http.put('https://barbermanagement-api.azurewebsites.net/api/v1/client/', body, { headers: this.header });
  }

  getProducts(guid): Observable<object> {
    return this.http.get('https://barbermanagement-api.azurewebsites.net/api/v1/product/' + guid, { headers: this.header });
  }

  addSale(body: {}): Observable<object> {
    return this.http.post('https://barbermanagement-api.azurewebsites.net/api/v1/sale', body, { headers: this.header });
  }

  getUsers(guid): Observable<object> {
    return this.http.get('https://barbermanagement-api.azurewebsites.net/api/v1/user/' + guid, { headers: this.header });
  }

  deleteUser(guid, id): Observable<object> {
    return this.http.delete('https://barbermanagement-api.azurewebsites.net/api/v1/user/' + guid + '/' + id, { headers: this.header });
  }

  addUser(body: {}): Observable<object> {
    return this.http.post('https://barbermanagement-api.azurewebsites.net/api/v1/user/', body, { headers: this.header });
  }

  editUser(body: {}): Observable<object> {
    return this.http.put('https://barbermanagement-api.azurewebsites.net/api/v1/user/', body, { headers: this.header });
  }

}
