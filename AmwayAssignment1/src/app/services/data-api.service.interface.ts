import { Observable } from "rxjs";
import { Product } from "../model/product";

export interface DataApiServiceInterface{
    getProducts() : Observable<Product[]>;
}