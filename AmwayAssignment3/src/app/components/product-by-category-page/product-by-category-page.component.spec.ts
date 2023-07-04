import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductByCategoryPageComponent } from './product-by-category-page.component';

describe('ProductByCategoryPageComponent', () => {
  let component: ProductByCategoryPageComponent;
  let fixture: ComponentFixture<ProductByCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductByCategoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductByCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
