import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProducts()
  {
    return this.httpClient.get(`http://localhost:3000/products.`) as Observable<Product[]>;
  }

  getProductById(id: number): Observable<any>
  {
    return this.httpClient.get(`http://localhost:3000/products/${id}`);
  }
}
