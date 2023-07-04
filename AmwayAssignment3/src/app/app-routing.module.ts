import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { PlpPageComponent } from './components/plp-page/plp-page.component';
import { ProductByCategoryPageComponent } from './components/product-by-category-page/product-by-category-page.component';
import { ProductBySubcategoryPageComponent } from './components/product-by-subcategory-page/product-by-subcategory-page.component';

const routes: Routes = [
  {
    path: 'plpPage',
    component: PlpPageComponent
  },
  {
    path: 'category',
    component: CategoryPageComponent
  },
  {
    path: '', redirectTo: 'category', pathMatch: 'full'
  },
  {
    path: 'category/:cId',
    component: ProductByCategoryPageComponent
  },
  {
    path: 'productByCategory',
    component: ProductByCategoryPageComponent
  },
  {
    path: 'productBySubCategory',
    component: ProductBySubcategoryPageComponent
  },
  {
    path: 'category/:cId/:sId',
    component: ProductBySubcategoryPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
