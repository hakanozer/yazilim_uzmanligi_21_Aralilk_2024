import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProducts, Product } from '../../models/IProducts';
import { ProductsItem } from '../../components/products-item/products-item';
import { Api } from '../../services/api';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterModule, ProductsItem],
  templateUrl: './products.html',
  styleUrl: './products.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Products implements OnInit {
  productsArr: Product[] = [];
  totalProducts: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private api: Api, private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const skip = (this.currentPage - 1) * this.itemsPerPage;
    this.api.getProducts(this.itemsPerPage, skip).subscribe({
      next: (value: IProducts): void => {
        this.productsArr = value.products;
        this.totalProducts = value.total;
        this.cdr.detectChanges();
        console.log('Ürünler yüklendi:', this.productsArr);
        console.log('Meta bilgileri:', value.products);
      },
      error: (err) => {
        console.error('Ürünler yüklenmedi:', err);
      }
    });
  }
}