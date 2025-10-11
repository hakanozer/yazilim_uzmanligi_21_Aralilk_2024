import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/IProduct';

@Component({
  selector: 'app-product-item',
  imports: [RouterModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  @Input()
  item: Product | null =null
}
