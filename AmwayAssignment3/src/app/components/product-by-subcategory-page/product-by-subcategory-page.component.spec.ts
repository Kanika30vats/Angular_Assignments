import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBySubcategoryPageComponent } from './product-by-subcategory-page.component';

describe('ProductBySubcategoryPageComponent', () => {
  let component: ProductBySubcategoryPageComponent;
  let fixture: ComponentFixture<ProductBySubcategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBySubcategoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBySubcategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
