import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlpPageComponent } from './plp-page.component';

describe('PlpPageComponent', () => {
  let component: PlpPageComponent;
  let fixture: ComponentFixture<PlpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlpPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
