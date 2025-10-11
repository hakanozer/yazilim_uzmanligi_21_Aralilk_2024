import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/IProducts';


@Component({
  selector: 'app-products-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './products-item.html',
  styleUrl: './products-item.css'
})
export class ProductsItem {
  @Input()
  item: Product | null = null;
}
