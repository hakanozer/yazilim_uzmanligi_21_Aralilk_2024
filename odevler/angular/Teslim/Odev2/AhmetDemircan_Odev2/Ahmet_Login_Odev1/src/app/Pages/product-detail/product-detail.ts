import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';
import { IProduct } from '../../models/IProducts';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule,RouterModule, Navbar],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductDetail {
  product: IProduct | null = null;

  constructor(private route: ActivatedRoute, private api: Api, private router: Router, private cdr: ChangeDetectorRef) {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      if (!Number.isNaN(id) && id > 0) {
        api.productById(id).subscribe({
          next: (value) => {
            this.product = value;
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
}
