import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlpPageComponent } from './components/plp-page/plp-page.component';
import { ProductStateClass } from './store/states/product.state';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { CategoryStateClass } from './store/states/category.state';
import { ProductByCategoryPageComponent } from './components/product-by-category-page/product-by-category-page.component';
import { ProductBySubcategoryPageComponent } from './components/product-by-subcategory-page/product-by-subcategory-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    PlpPageComponent,
    CategoryPageComponent,
    ProductByCategoryPageComponent,
    ProductBySubcategoryPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([ProductStateClass, CategoryStateClass]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgbModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
