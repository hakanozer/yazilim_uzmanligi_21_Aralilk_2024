import { Component, OnInit,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IProduct, IProductResponse } from '../../models/IProduct';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class  ProductComponent implements OnInit {
  productArr : IProduct [] = []

  constructor (private api: ApiService, private cdr: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.api.allproducts(1, 10).subscribe({
      next: (value: IProductResponse) => {
        this.productArr = value.products
        this.cdr.detectChanges()
        console.log('Ürünler yüklendi:', this.productArr);
      },
      error:(err) => {
        console.error('Ürünler yüklenmedi:', err)
      }
    })
  }
}
