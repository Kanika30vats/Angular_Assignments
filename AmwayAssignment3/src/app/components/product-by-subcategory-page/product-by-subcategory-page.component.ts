import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Selector, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { GetCategories } from 'src/app/store/actions/category.action';
import { GetProductBySubCategoryId } from 'src/app/store/actions/product.action';
import { CategoryStateClass } from 'src/app/store/states/category.state';
import { ProductStateClass } from 'src/app/store/states/product.state';

@Component({
  selector: 'app-product-by-subcategory-page',
  templateUrl: './product-by-subcategory-page.component.html',
  styleUrls: ['./product-by-subcategory-page.component.css']
})
export class ProductBySubcategoryPageComponent implements OnInit {

  @Select(ProductStateClass.getProductsBySubCategory) filteredProducts$!: Observable<Product[]>;
  @Select(CategoryStateClass.getCategories) categories$!: Observable<Category[]>;
  @Select(CategoryStateClass.getSubCategoriesOfCategories) subCategories$!: Observable<Category[]>;


  subCategoryId!: any;
  subCategoryArr!: any[];
  productsBySubCategory!: Product[];
  categoryId!: any;
  categoryData!: any[];
  categoryName!: any;
  subCategoryData!: any[];
  subCategoryName!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.productsBySubCategory = [];
    this.subCategoryId = this.activatedRoute.snapshot.paramMap.get('sId');
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('cId');
    this.subCategoryArr = [];
    this.subCategoryArr.push(this.subCategoryId);
    this.store.dispatch(new GetProductBySubCategoryId(this.subCategoryArr));
    this.getProductsBySubCategory();
    this.store.dispatch(new GetCategories);
    this.getCategory();
    this.getCategoryName();
    this.getSubCategoryName();



  }

  getProductsBySubCategory() {
    this.filteredProducts$.subscribe(
      res => {
        this.productsBySubCategory = res;
      }
    )
  }

  getCategory() {
    this.categories$.subscribe(
      res => {
        this.categoryData = res;
      }
    )
  }

  getCategoryName() {
    this.categoryData.forEach(
      (element) => {


        if ((element.id) == this.categoryId) {
          this.categoryName = element.name;
          this.subCategoryData = element.subCategory;

        }
      }
    )
  }

  getSubCategoryName() {
    this.subCategoryData.forEach(
      (element) => {
        if (element.id == this.subCategoryId) {
          this.subCategoryName = element.name;
        }
      }
    )
  }

}
