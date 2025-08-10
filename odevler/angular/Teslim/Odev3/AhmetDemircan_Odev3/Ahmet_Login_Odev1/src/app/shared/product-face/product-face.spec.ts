import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFace } from './product-face';

describe('ProductFace', () => {
  let component: ProductFace;
  let fixture: ComponentFixture<ProductFace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFace]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
