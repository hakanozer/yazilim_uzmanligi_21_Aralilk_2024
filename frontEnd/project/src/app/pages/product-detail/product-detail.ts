import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../../services/api';
import { Product } from '../../models/IProducts';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {

  product: Product | null = null

  constructor(private route: ActivatedRoute, private api: Api, private router: Router){
    this.route.params.subscribe(params => {
      
      const id = Number(params['id'])
      if (!Number.isNaN(id) && id > 0) {
        api.productById(id).subscribe({
          next: (value) => {
            this.product = value.data
            console.log(value)
          },
          error: (err) => {
            alert("Not found product: " + id)
            this.router.navigate(['/products'])
          }
        })
      }else {
          alert("Not found product: " + params['id'])
          this.router.navigate(['/products'])
      }
      
    })
  }

}
