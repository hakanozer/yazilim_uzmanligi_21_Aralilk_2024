import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {

  constructor(private route: ActivatedRoute){
    this.route.params.subscribe(params => {
      const id = params['id']
      console.log("id", id)
    })
  }

}
