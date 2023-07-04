import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlpPageComponent } from './components/plp-page/plp-page.component';
import { AddProductPageComponent } from './components/add-product-page/add-product-page.component';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { FooterPageComponent } from './components/footer-page/footer-page.component';
import { AllReviewsComponent } from './components/all-reviews/all-reviews.component';
import { PdpState } from './store/state/pdp.state';
import { PlpState } from './store/state/plp.state';
import { CartState } from './store/state/cart.state';

@NgModule({
  declarations: [
    AppComponent,
    PlpPageComponent,
    AddProductPageComponent,
    HeaderPageComponent,
    CartPageComponent,
    ProductPageComponent,
    HomePageComponent,
    ReviewPageComponent,
    FooterPageComponent,
    AllReviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([PdpState, PlpState, CartState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    ...environment.providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
