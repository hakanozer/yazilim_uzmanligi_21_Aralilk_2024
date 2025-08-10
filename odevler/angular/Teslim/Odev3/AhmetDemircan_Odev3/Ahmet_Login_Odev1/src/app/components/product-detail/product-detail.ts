import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';
import { IProduct } from '../../models/IProducts';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,RouterModule, Navbar],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductDetail {
  product: IProduct | null = null;
  stars: number[] = []

  constructor(private route: ActivatedRoute, private api: Api, private router: Router, private cdr: ChangeDetectorRef) {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      if (!Number.isNaN(id) && id > 0) {
        api.productById(id).subscribe({
          next: (value) => {
            this.product = value;
            this.countStars(value.rating)
            this.cdr.detectChanges();
            console.log("Product:", value);
          },
          error: (err) => {
            alert("Not found product: " + id);
            this.router.navigate(['/products']);
            this.cdr.detectChanges();
          }
        });
      } else {
        alert("Not found product: " + params['id']);
        this.router.navigate(['/products']);
        this.cdr.detectChanges();
      }
    });
  }

    countStars(rating: number) {
      console.log("Rating:", rating)
    const arr:number[] = []
    const tamSayi = Math.floor(rating)
    const yarimSayi = Math.ceil(rating - tamSayi)
    const bosSayi = 5 - (tamSayi + yarimSayi)
    for (let i = 0; i < tamSayi; i++) {
      arr.push(1)
    }
    if (yarimSayi > 0) {
      arr.push(0.5)
    }
    for (let i = 0; i < bosSayi; i++) {
      arr.push(0)
    }
    this.stars = arr
  }
}
