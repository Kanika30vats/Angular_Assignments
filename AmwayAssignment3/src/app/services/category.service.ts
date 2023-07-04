import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import categoryData from "src/assets/categoryListing.json";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(){
    return of (categoryData);
  }

}
