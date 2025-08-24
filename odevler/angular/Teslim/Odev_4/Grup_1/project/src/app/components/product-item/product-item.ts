import { Component, Input } from '@angular/core';
import { Product } from '../../models/IProducts';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [RouterModule],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css'
})
export class ProductItem {

  @Input()
  item:Product | null = null

}
