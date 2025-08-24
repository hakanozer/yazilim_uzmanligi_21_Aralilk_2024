import { Component, OnInit,ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Pagination, Product } from '../../models/IProducts';
import { Api } from '../../services/api';
import { SearchItemComponent } from "../../components/search-item/search-item";

@Component({
  selector: 'app-search',
  imports: [RouterModule, SearchItemComponent],
  templateUrl: './search.html',
  styleUrl: './search.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Search implements OnInit {
  
  isLoading = true
  productArr: Product [] = []
  pageInfo: Pagination = {
    page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  }
  pages: number[] = []
  current_page = 1
  searchQuery = ''

  constructor(private activeRouter: ActivatedRoute, private api: Api, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.activeRouter.queryParams.forEach((params) => {
      const q = params['q']
      const page = params['page']

      if (q) {
        this.searchQuery = q
        if(page) {
          this.current_page = page
        }
        this.pullSearchData()
      }
    })
  }
    pullSearchData(){
      this.isLoading =true
      this.productArr = []

      this.api.SearchProducts(this.searchQuery, this.current_page, 10).subscribe({
        next:(value) => {
          if (value && value.data) {
            this.productArr = value.data.map((item: any) => ({
              ...item,
              brand: item.brand ?? ''
            }))
            this.pageInfo = value.meta.pagination
            this.pages = []
            for(let i = 0; i < value.meta.pagination.total_pages; i++){
              this.pages.push(i+1)
            }
          } else {
            this.productArr = []
            this.pages = []
            this.pageInfo = {
              page: 0,
              per_page: 0,
              total_items: 0,
              total_pages: 0
            }
          }
        },
        error: (error) => {
          console.error('Search error', error)
          this.productArr = []
          this.pages = []
          this.pageInfo = {
            page: 0,
            per_page: 0,
            total_items: 0,
            total_pages: 0
          }
          this.isLoading = false
          this.cdr.detectChanges()
        },
        complete:() => {
          this.isLoading = false
          this.cdr.detectChanges()
        }
      })

    }

}
