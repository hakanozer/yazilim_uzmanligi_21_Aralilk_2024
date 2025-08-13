import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsItem } from './products-item';

describe('ProductsItem', () => {
  let component: ProductsItem;
  let fixture: ComponentFixture<ProductsItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
