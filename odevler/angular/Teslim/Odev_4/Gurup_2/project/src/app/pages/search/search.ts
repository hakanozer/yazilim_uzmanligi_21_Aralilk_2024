import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Api } from '../../services/api';
import { Pagination, Product } from '../../models/IProducts';
import { ProductItem } from '../../components/product-item/product-item';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [ProductItem, RouterModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Search implements OnInit {

  isLoading = false
  productArr: Product[] = []
  pageInfo: Pagination = {
    page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  }
  pages: number[] = []
  originalProductArr: Product[] = [];
  current_page = 1
  searchQuery = ''
   totalResults: number = 0;

  constructor(
    private api: Api, 
    private cdr: ChangeDetectorRef, 
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRouter.queryParams.forEach((params) => {
      const q = params['q']
      const page = params['page']
      
      if (q) {
        this.searchQuery = q
        if (page) {
          this.current_page = page
        }
        this.pullSearchData()
      }
    })
  }

  pullSearchData() {
    this.isLoading = true
    this.productArr = []
    
    this.api.searchProducts(this.searchQuery, this.current_page, 10).subscribe({
      next: (value) => {
        this.productArr = value.data
        this.pageInfo = value.meta.pagination
        this.pages = []
        for (let i = 0; i < value.meta.pagination.total_pages; i++) {
          this.pages.push(i+1)
        }
      },
      error: (error) => {
        //console.error('Search error:', error)
      if(error.error.message == 'No products found') {
          this.isLoading = true
          this.cdr.detectChanges()
        }
      },
      complete: () => {
        this.isLoading = false
        this.cdr.detectChanges();
      }
    })
  }


  // Arama çubuğuna girilen metinle listeyi filtreleme
  onSearch() {
    if (this.searchQuery.trim() === '') {
      this.productArr = []; // Arama terimi yoksa listeyi temizle
    } else {
      this.productArr = this.originalProductArr.filter(product => 
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
     this.totalResults = this.productArr.length; // Sonuç sayısını güncelle
  }

}


