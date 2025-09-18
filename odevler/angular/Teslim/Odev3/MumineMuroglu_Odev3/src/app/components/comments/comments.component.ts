import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Review } from '../../models/IProduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnChanges {
  @Input() item: Review | null = null;

  stars: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.item) {
      this.stars = this.countStars(this.item.rating);
    }
  }

  private countStars(rating: number): number[] {
    const arr: number[] = [];
    const tamSayi = Math.floor(rating);
    const yarimSayi = Math.ceil(rating - tamSayi);
    const bosSayi = 5 - (tamSayi + yarimSayi);

    for (let i = 0; i < tamSayi; i++) arr.push(1);
    if (yarimSayi > 0) arr.push(0.5);
    for (let i = 0; i < bosSayi; i++) arr.push(0);

    return arr;
  }
}
