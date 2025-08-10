import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Api } from '../../services/api';
import { Product, IProducts } from '../../models/IProducts';
import { ProductItem } from '../../components/product-item/product-item';

@Component({
  selector: 'app-products',
  imports: [ProductItem],
  templateUrl: './products.html',
  styleUrls: ['./products.css'], // düzelttim
  changeDetection: ChangeDetectionStrategy.Default
})
export class Products implements OnInit {

  productArr: Product[] = [];

  constructor(private api: Api, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.api.allProducts(1,18).subscribe({
      next: (value: IProducts) => {
        this.productArr = value.products; 
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('API Hatası:', error);
      }
    });
  }
}
