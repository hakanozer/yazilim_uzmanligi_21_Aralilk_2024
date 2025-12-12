import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Api } from '../../services/api';
import { Pagination, Product } from '../../models/IProducts';
import { ProductItem } from '../../components/product-item/product-item';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AsyncPipe, JsonPipe } from '@angular/common';
import { AuthService } from '../../utils/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [ProductItem, RouterModule,FormsModule,AsyncPipe],
  templateUrl: './products.html',
  styleUrl: './products.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Products implements OnInit {

  isLoading = true
  productArr:any;
  
public product: Product = {} as Product;
public lessons: Product['lessons'] = [];
public imagesString:any;
public images: Product['images'] = []
  user$!: Observable<any>;

public tags: Product['tags'] = [];
  pageInfo: Pagination = {
    page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  }
  pages: number[] = []
  current_page = 0

  categories: string[] = [
  'python',
  'data-science',
  'machine-learning',
  'pandas',
  'numpy',
  'angular',
  'typescript',
  'deep-learning'
];


  openPopup: boolean = false;
x: any;
  constructor( private api: Api, 
    private cdr: ChangeDetectorRef, 
    private activeRouter: ActivatedRoute,
    private auth: AuthService)
    {
        this.pullData()


    }

  ngOnInit(): void {
    this.activeRouter.queryParams.forEach((params) => {
      const page = params['page']
      if (page) {
        this.current_page = page
        this.pullData()
      }
    })
    this.pullData()
     this.api.userProfileSync().subscribe({
      next:(value:any) => {
        this.auth.setUser(value);
    this.user$ = this.auth.user$;
       this.cdr.detectChanges();

      }
    })
  }
  onImagesChange(event: any) {
    const value = event.target.value;
    this.images = value.split(',').map((x: string) => x.trim());
    this.product.images = this.images;
       this.cdr.detectChanges();

  }
  
openPopupClick(value:boolean) {
  this.openPopup = value;
}
pullData() {
  this.isLoading = true;

  this.api.allProducts(this.current_page, 10).subscribe({
    next: (response) => {
      this.productArr = response.body ?? [];
      const totalItems = Number(response.headers.get('X-Total-Count')) || 0;
      this.pageInfo.total_items = totalItems;
      this.pageInfo.per_page = 10;
      this.pageInfo.total_pages = Math.ceil(totalItems / 10);

      this.pages = [];
      for (let i = 1; i <= this.pageInfo.total_pages; i++) {
        this.pages.push(i);
      }
       this.cdr.detectChanges();

    },
    complete: () => {
      this.isLoading = false;
      this.cdr.markForCheck(); // ✅ detectChanges yerine markForCheck kullan
       this.cdr.detectChanges();

    }
  });
}



  togglePopup() {
    this.openPopup = false;
  }

  onCategoryChange(event: any) {
  const value = event.target.value;
  if (event.target.checked) {
    this.tags.push(value);
       this.cdr.detectChanges();

  } else {
    this.tags = this.tags.filter(tag => tag !== value);
       this.cdr.detectChanges();

  }
}


   addCourse(){
    if(this.product.title && this.product.price){
      this.product.lessons = this.lessons;
      this.product.tags = this.tags;
      this.openPopup = false;
        this.api.addProduct(this.product).subscribe({
      next:(result:any) => {
      this.productArr.push(result);
      this.product = {} as Product;
      this.openPopup = false;
       this.cdr.detectChanges();

      }
      ,
      error:(err) => {
    this.openPopup = false;

        alert("Kurs eklenirken bir hata oluştu: " + err.message);
      }
    })

    }
  }

  changePage(page: number, event: Event) {
  event.preventDefault(); // sayfanın reload olmasını engelle
  if (page < 1 || page > this.pageInfo.total_pages) return;
       this.cdr.detectChanges();

  this.current_page = page;
  this.pullData();
}

addLesson() {
  this.lessons.push({
    id: Date.now(),
    lesson_name: '',
    lesson_content: ''
  });
}

removeLesson(index: number) {
  this.product.lessons.splice(index, 1);
}

}