import { Component, Input } from '@angular/core';
import { Product } from '../../models/IProducts';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.css']
})
export class ProductItem {
  @Input() item: Product | null = null;
  
}
