import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../../services/api';
import { Product } from '../../models/IProducts';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductDetail {

  product: Product | null = null
  globalPrice = ''
  stars:number[] = []
  bigImage = ''

  constructor(private route: ActivatedRoute, private api: Api, private router: Router, private cdr: ChangeDetectorRef){
    this.route.params.subscribe(params => {
      
      const id = Number(params['id'])      
      if (!Number.isNaN(id) && id > 0) {
        api.productById(id).subscribe({
          next: (value) => {
            this.product = value.data
            this.globalPrice = (value.data.price + ((value.data.price * value.data.discountPercentage) / 100)).toFixed(2)
            this.countStars(value.data.rating)
            this.bigImage = value.data.images[0]
            this.cdr.detectChanges();
          },
          error: (err) => {
            alert("Not found product: " + id)
            this.router.navigate(['/products'])
            this.cdr.detectChanges();
          }
        })
      }else {
          alert("Not found product: " + params['id'])
          this.router.navigate(['/products'])
          this.cdr.detectChanges();
      }
      
    })
  }

  countStars(rating: number) {
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
