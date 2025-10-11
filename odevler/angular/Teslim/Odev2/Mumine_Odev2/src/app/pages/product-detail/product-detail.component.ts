import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Product} from '../../models/IProduct';



@Component({
  selector: 'app-product-detail',
  imports: [RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  changeDetection: ChangeDetectionStrategy.Default
  
})

export class ProductDetailComponent {

  product: Product | null = null
  globalPrice=''
  bigImage = ''
  

  constructor(private route: ActivatedRoute,private api:ApiService,private router: Router,private cdr: ChangeDetectorRef) {
 }
     ngOnInit():void{this.route.params.subscribe(params =>{
     const id =Number(params['id'])
     if(!Number.isNaN(id) && id > 0){
      this.api.productById(id).subscribe({
        next: (value =>{
          this.product= value;
          this.globalPrice=(value.price+((value.price*value.discountPercentage)/100)).toFixed(2)
          this.bigImage=value.images[0]    
          console.log(value)
        }),
        error:(err =>{
          alert("Not found product: "+ id)
        })
      })
     }else{
      alert("Not found product : "+params['id'])
      this.router.navigate(['/product'])
     }
    })
  

}
     
  changeImage(images: string) {
    this.bigImage = images
  }

  

}
