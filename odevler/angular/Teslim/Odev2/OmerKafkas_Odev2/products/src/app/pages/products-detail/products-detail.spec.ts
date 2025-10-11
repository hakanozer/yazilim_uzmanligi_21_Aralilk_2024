import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDetail } from './products-detail';

describe('ProductsDetail', () => {
  let component: ProductsDetail;
  let fixture: ComponentFixture<ProductsDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
