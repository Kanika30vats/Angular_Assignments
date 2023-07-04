import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductPageComponent } from './components/add-product-page/add-product-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { PlpPageComponent } from './components/plp-page/plp-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AllReviewsComponent } from './components/all-reviews/all-reviews.component';

const routes: Routes = [
  {
    path:'addProduct', component: AddProductPageComponent
  },
  {
    path:'homePage', component: HomePageComponent
  },
  {
    path: '', redirectTo: 'homePage', pathMatch: 'full' ,
  },
  {
    path:'cartPage', component:CartPageComponent
  },
  {
    path:'products/:id', component: ProductPageComponent
  },
  {
    path:'plpPage', component: PlpPageComponent
  },
  {
    path:'allReviewsPage', component: AllReviewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
