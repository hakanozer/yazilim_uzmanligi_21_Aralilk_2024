import { Component, Input } from '@angular/core';
import { Product } from '../../models/IProducts';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css'
})
export class ProductItem {

  @Input()
  item:Product | null = null

}
