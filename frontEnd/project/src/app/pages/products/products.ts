import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Api } from '../../services/api';
import { Pagination, Product } from '../../models/IProducts';
import { ProductItem } from '../../components/product-item/product-item';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [ProductItem, RouterModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Products implements OnInit {

  productArr: Product[] = []
  pageInfo: Pagination = {
    page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  }
  pages: number[] = []
  current_page = 1

  constructor( private api: Api, 
    private cdr: ChangeDetectorRef, 
    private activeRouter: ActivatedRoute)
    {}




  ngOnInit(): void {
    this.activeRouter.queryParams.forEach((params) => {
      const page = params['page']
      if (page) {
        this.current_page = page
        this.pullData()
      }
    })
    this.pullData()
  }

  pullData() {
      this.api.allProducts(this.current_page, 10).subscribe({
      next: (value) => {
        this.productArr = value.data
        this.pageInfo = value.meta.pagination
        this.pages = []
        for (let i = 0; i < value.meta.pagination.total_pages; i++) {
          this.pages.push(i+1)
        }
        this.cdr.detectChanges();
      },
      error: (error) => {

      }
    })
  }

  plus10Price() {
    this.productArr.forEach((item, index) => {
      setTimeout(() => {
        item.price = Number((item.price + 10).toFixed(2))
        this.cdr.detectChanges();
      }, index * 1500);

    })
  }

  

}