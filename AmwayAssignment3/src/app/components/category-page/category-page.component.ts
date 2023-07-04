import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { GetCategories } from 'src/app/store/actions/category.action';
import { GetProducts } from 'src/app/store/actions/product.action';
import { CategoryStateClass } from 'src/app/store/states/category.state';
import { ProductStateClass } from 'src/app/store/states/product.state';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  @Select(CategoryStateClass.getCategories) categories$!: Observable<Category[]>;
  @Select(ProductStateClass.getProducts) products$!: Observable<Product[]>;


  products!: Product[];
  
  constructor(
    private store: Store
    
    ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetCategories());
    this.store.dispatch(new GetProducts());
    this.getProductsFromState();
    }

    getProductsFromState() {
      
      this.products$.subscribe(
        (prod) => {
          this.products = prod;
  
        }
      )
     
      
    }





    


}
