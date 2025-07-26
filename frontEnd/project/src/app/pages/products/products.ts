import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Api } from '../../services/api';
import { Product } from '../../models/IProducts';

@Component({
  selector: 'app-products',
  imports: [],
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

  

}