import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { DataApiServiceInterface } from './data-api.service.interface';
import { PlpPageComponent } from '../components/plp-page/plp-page.component';

@Injectable({
  providedIn: 'root'
})
export class DataApiService implements DataApiServiceInterface{

  constructor(private httpClient: HttpClient) { }

  getProducts()
  {
    return this.httpClient.get(`http://localhost:3000/products`) as Observable<Product[]>;
    // return this.httpClient.get<Product[]>("assets/mockData.json");
  }

  getProductById(id: number): Observable<any>
  {
    return this.httpClient.get(`http://localhost:3000/products/${id}`);
  }

  addProduct(data: Product[])
  {
    return this.httpClient.post(`http://localhost:3000/products`, data);
  }

}
