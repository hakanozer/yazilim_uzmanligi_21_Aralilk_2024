import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Api } from '../../services/api';
import { Product } from '../../models/IProducts';
import { ProductItem } from '../../components/product-item/product-item';

@Component({
  selector: 'app-products',
  imports: [ProductItem],
  templateUrl: './products.html',
  styleUrl: './products.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Products implements OnInit {

  productArr: Product[] = []

  constructor( private api: Api, private cdr: ChangeDetectorRef ){
  }

  ngOnInit(): void {
    this.api.allProducts(1, 10).subscribe({
      next: (value) => {
        this.productArr = value.data
        this.cdr.detectChanges();
      },
      error: (error) => {

      }
    })
  }

  plus10Price() {
    this.productArr.forEach(item => {
      item.price = Number((item.price + 10).toFixed(2))
    })
  }

  

}