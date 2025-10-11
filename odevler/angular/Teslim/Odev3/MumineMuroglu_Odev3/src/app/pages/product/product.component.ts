import { Component, OnInit ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/IProduct';
import { BarComponent } from '../../components/bar/bar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [ProductItemComponent,BarComponent,RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
   changeDetection: ChangeDetectionStrategy.Default
})
export class ProductComponent implements OnInit{

  productArr : Product []= []
  
 constructor(private api: ApiService,private cdr:ChangeDetectorRef){

 }

 ngOnInit(): void {
   this.getProducts();
 }

 getProducts() {
   this.api.allProduct(1, 15).subscribe({
     next: (value) => {
       this.productArr = value.products; 
       this.cdr.detectChanges();
     },
     error: (error) => {
       console.error('Error fetching products:', error); 
     }
   });
 }
 }
