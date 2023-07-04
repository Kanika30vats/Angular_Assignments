import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import productData from "src/assets/productListing.json";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // private mockData = productData;

  constructor() { }

  getProducts() {
    return of(productData);
  }

  // getProductsById(id:any) {
  //   let dataFilteredByCategory: any[];
  //   dataFilteredByCategory=[];
  //   productData.forEach((element:any) => {
  //     element.subCategoryId.forEach((item:any) => {
  //             if(item == id){
  //                 dataFilteredByCategory.push(element);
  //             }
  //           })
  //   });

  //   return of (dataFilteredByCategory);
  // }

  getProductsById(id: any[]) {
    let dataFilteredByCategory: any[];
    dataFilteredByCategory = [];

    const subCategoryIdSet = new Set(id);

    dataFilteredByCategory = productData.filter((prod: any) =>
      prod.subCategoryId.some((id: any) => subCategoryIdSet.has(id))

    );

    return of(dataFilteredByCategory);
  }
}
