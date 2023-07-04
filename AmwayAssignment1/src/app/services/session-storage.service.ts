import { Injectable } from '@angular/core';
import productData from "src/assets/mockData.json";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private mockCategories = productData;

  constructor() { }

  saveData() {
    sessionStorage.setItem('mockData', JSON.stringify(this.mockCategories));
  }

  getData() {
    return sessionStorage.getItem('mockData');
  }

  setData(data:any){
    sessionStorage.setItem('mockData', data);
  }
}
