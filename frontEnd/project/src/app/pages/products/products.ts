import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  constructor( private api: Api ){
    const stToken = localStorage.getItem('token')
    if (!stToken) {
      window.location.replace('/')
    }
    console.log("call -1")
  }

  ngOnInit(): void {
    this.api.allProducts(1, 10).subscribe({
      next(value) {
        console.log(value.data[0].title)
      },
      error(err) {
        
      },
    })
  }

  

}
