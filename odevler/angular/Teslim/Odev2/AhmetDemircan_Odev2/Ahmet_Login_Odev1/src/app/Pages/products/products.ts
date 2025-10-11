import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';
import { ProductFace } from '../../shared/product-face/product-face';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductFace, Navbar],
  templateUrl: './products.html',
  styleUrl: './products.css',
  changeDetection: ChangeDetectionStrategy.Default // angular ile ilgili en garip özellik
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
