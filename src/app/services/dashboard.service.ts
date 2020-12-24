import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

const header = ({ Authorization: 'Bearer ' + localStorage.getItem('Token')});

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  addSchedule(body: {}): Observable<object> {
    return this.http.post('https://barbermanagement-api.azurewebsites.net/api/v1/schedule', body, { headers: header });
  }

  getSchedules(guid, date): Observable<object> {
    return this.http.get('https://barbermanagement-api.azurewebsites.net/api/v1/schedule/by-date/'
     + guid + '/' + date, { headers: header });
  }

  deleteSchedule(guid, id): Observable<object> {
    return this.http.delete('https://barbermanagement-api.azurewebsites.net/api/v1/schedule/'
     + guid + '/' + id, { headers: header });
  }

  getServices(guid): Observable<object> {
    return this.http.get('https://barbermanagement-api.azurewebsites.net/api/v1/service/' + guid, { headers: header });
  }

  getService(guid, id): Observable<object> {
    return this.http.get('https://barbermanagement-api.azurewebsites.net/api/v1/service/'
     + guid + '/' + id, { headers: header });
  }

  addClient(body: {}): Observable<object> {
    return this.http.post('https://barbermanagement-api.azurewebsites.net/api/v1/client/', body, { headers: header });
  }

  getClients(guid): Observable<object> {
    return this.http.get('https://barbermanagement-api.azurewebsites.net/api/v1/client/' + guid, { headers: header });
  }

  deleteClient(guid, id): Observable<object> {
    return this.http.delete('https://barbermanagement-api.azurewebsites.net/api/v1/client/' + guid + '/' + id, { headers: header });
  }

  editClient(body: {}): Observable<object> {
    return this.http.put('https://barbermanagement-api.azurewebsites.net/api/v1/client/', body, { headers: header});
  }

  getProducts(guid): Observable<object> {
    return this.http.get('https://barbermanagement-api.azurewebsites.net/api/v1/product/' + guid, { headers: header });
  }

  addSale(body: {}): Observable<object> {
    return this.http.post('https://barbermanagement-api.azurewebsites.net/api/v1/sale', body, { headers: header });
  }

  getUsers(guid): Observable<object> {
    return this.http.get('https://barbermanagement-api.azurewebsites.net/api/v1/user/' + guid, { headers: header });
  }

  deleteUser(guid, id): Observable<object> {
    return this.http.delete('https://barbermanagement-api.azurewebsites.net/api/v1/user/' + guid + '/' + id, { headers: header });
  }

  addUser(body: {}): Observable<object> {
    return this.http.post('https://barbermanagement-api.azurewebsites.net/api/v1/user/', body, { headers: header });
  }

  editUser(body: {}): Observable<object> {
    return this.http.put('https://barbermanagement-api.azurewebsites.net/api/v1/user/', body, { headers: header });
  }

}
