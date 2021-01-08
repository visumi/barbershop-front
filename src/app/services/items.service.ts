import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  header: any;

  constructor(private http: HttpClient) {
    this.header = ({ Authorization: 'Bearer ' + localStorage.getItem('Token') });
  }

  addProduct(body: {}): Observable<object> {
    return this.http.post('https://barbermanagement-api.azurewebsites.net/api/v1/product', body, { headers: this.header });
  }

  editProduct(body: {}): Observable<object> {
    return this.http.put('https://barbermanagement-api.azurewebsites.net/api/v1/product', body, { headers: this.header });
  }

  deleteProduct(guid, id): Observable<object> {
    return this.http.delete('https://barbermanagement-api.azurewebsites.net/api/v1/product/' + guid + '/' + id, { headers: this.header });
  }

  editService(body: {}): Observable<object> {
    return this.http.put('https://barbermanagement-api.azurewebsites.net/api/v1/service/', body, { headers: this.header });
  }

  addService(body: {}): Observable<object> {
    return this.http.post('https://barbermanagement-api.azurewebsites.net/api/v1/service/', body, { headers: this.header });
  }

  deleteService(guid, id): Observable<object> {
    return this.http.delete('https://barbermanagement-api.azurewebsites.net/api/v1/service/' + guid + '/' + id, { headers: this.header });
  }

  getSales(guid): Observable<object> {
    return this.http.get('https://barbermanagement-api.azurewebsites.net/api/v1/sale/' + guid, { headers: this.header });
  }
}
