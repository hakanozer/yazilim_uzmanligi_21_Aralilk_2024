import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Api } from '../../services/api';
import { IProducts, Pagination, Product } from '../../models/IProducts';
import { ProductItem } from '../../components/product-item/product-item';

@Component({
  selector: 'app-search',
  imports: [ProductItem, RouterModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit  {
  constructor(private api: Api, private activeRouter: ActivatedRoute, private cdr: ChangeDetectorRef) {}
  isLoading: boolean = false
  query: string = ""
  current_page: number = 1
  productArr : Product[] = []
  pageInfo: Pagination = {
    page: 0,
    per_page:0,
    total_items:0,
    total_pages:0
  }
  pages: number[] = []
  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe((params) => {
      this.query = params["q"];
      this.current_page = params["page"] ? Number(params["page"]) : 1;
      if(this.query.length > 0) {
        this.pullData();
      }
    })
  }

  pullData() {
    this.isLoading = true;
    this.productArr = [];
    this.api.searchProduct(this.query, this.current_page, 10).subscribe({
      next: (value: IProducts) => {
        this.productArr = value.data
        this.pageInfo = value.meta.pagination;
        this.pages = [];
        for(let i = 0; i < value.meta.pagination.total_pages; i++){
          this.pages.push(i+1);
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading= false;
        this.cdr.detectChanges();
      }

    })
  }

}
