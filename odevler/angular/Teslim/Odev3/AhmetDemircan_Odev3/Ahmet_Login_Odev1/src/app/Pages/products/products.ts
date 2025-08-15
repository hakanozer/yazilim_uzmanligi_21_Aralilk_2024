import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';
import { ProductFace } from '../../components/product-face/product-face';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductFace],
  templateUrl: './products.html',
  styleUrl: './products.css',

})
export class Product implements OnInit {
  products: any[] = [];

  constructor(private api: Api, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.fetchProductsFromApi();
  }

  private fetchProductsFromApi(): void {
    this.api.allProducts(1, 10).subscribe({
      next: (value) => {
        this.products = value.products;
        console.log('Fetched products');
        this.cdr.detectChanges(); // bu olmadan ürünlerin kaybolması
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }
}
