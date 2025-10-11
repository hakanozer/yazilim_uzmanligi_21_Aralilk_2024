import { Component, input } from '@angular/core';
import { IReview } from '../../models/IProduct';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-reviews',
  imports: [DatePipe],
  templateUrl: './product-reviews.html',
  styleUrl: './product-reviews.css'
})
export class ProductReviews {
  reviews = input<IReview[]>([]);
}
