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

  getClients(guid): Observable<object> {
    return this.http.get('https://barbermanagement-api.azurewebsites.net/api/v1/client/' + guid, { headers: header });
  }

}
