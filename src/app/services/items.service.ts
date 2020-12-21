import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

const header = ({ Authorization: 'Bearer ' + localStorage.getItem('Token')});

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  addProduct(body: {}): Observable<object> {
    return this.http.post('https://barbermanagement-api.azurewebsites.net/api/v1/product', body, { headers: header });
  }

  editProduct(body: {}): Observable<object> {
    return this.http.put('https://barbermanagement-api.azurewebsites.net/api/v1/product', body, { headers: header });
  }

  deleteProduct(guid, id): Observable<object> {
    return this.http.delete('https://barbermanagement-api.azurewebsites.net/api/v1/product/' + guid + '/' + id, { headers: header });
  }

  editService(body: {}): Observable<object> {
    return this.http.put('https://barbermanagement-api.azurewebsites.net/api/v1/service/', body, { headers: header });
  }

  addService(body: {}): Observable<object> {
    return this.http.post('https://barbermanagement-api.azurewebsites.net/api/v1/service/', body, { headers: header });
  }

  deleteService(guid, id): Observable<object> {
    return this.http.delete('https://barbermanagement-api.azurewebsites.net/api/v1/service/' + guid + '/' + id, { headers: header });
  }

}
