import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { GetCategories, GetSubCategories } from 'src/app/store/actions/category.action';
import { GetProductBySubCategoryId } from 'src/app/store/actions/product.action';
import { CategoryStateClass } from 'src/app/store/states/category.state';
import { ProductStateClass } from 'src/app/store/states/product.state';


@Component({
  selector: 'app-product-by-category-page',
  templateUrl: './product-by-category-page.component.html',
  styleUrls: ['./product-by-category-page.component.css']
})
export class ProductByCategoryPageComponent implements OnInit {

  @Select(CategoryStateClass.getCategories) categories$!: Observable<Category[]>;
  @Select(CategoryStateClass.getSubCategoriesOfCategories) filteredCategories$!: Observable<Category[]>;
  @Select(ProductStateClass.getProductsBySubCategory) productsBySubCategories$!: Observable<Product[]>;

  categoryId!: any;
  productsByCategory!: any[];
  subCategoryDataByCategory!: any[];
  subCategoryId!:any[];
  categoryName!:any;

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subCategoryDataByCategory = [];
    this.productsByCategory = [];
    this.subCategoryId=[];
    this.store.dispatch(new GetCategories());
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('cId');
    this.store.dispatch(new GetSubCategories(this.categoryId));
    this.getDataByCategory();
    this.getSubCategoryId();
    this.store.dispatch(new GetProductBySubCategoryId(this.subCategoryId));
    this.getProductsByCategory();
    
  }

  getDataByCategory() {
    this.filteredCategories$.subscribe(res => {
      console.log(res[0]?.subCategory);
      this.subCategoryDataByCategory = res[0]?.subCategory;
      this.categoryName = res[0].name;
      
      
    })

  }

  getSubCategoryId() {
    this.subCategoryDataByCategory.forEach((element:any) => {
      
      this.subCategoryId.push(element.id);
      
    })
    
  }

  getProductsByCategory(){
    this.productsBySubCategories$.subscribe(
      res => {
        this.productsByCategory = res;
      }
    )
    
  }



}
