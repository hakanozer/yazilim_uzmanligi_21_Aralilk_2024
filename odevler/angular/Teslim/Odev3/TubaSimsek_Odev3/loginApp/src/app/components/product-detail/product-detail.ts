import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
import { Api } from '../../services/api';
import { ISingleProduct } from '../../models/IProducts';
import { IComment } from '../../models/IComment';

@Component({
  selector: 'app-product-detail',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetail implements OnInit {

  product!: ISingleProduct;
  comments: IComment[] = [];
  loading = true;
  commentsLoading = true;

  constructor(private route: ActivatedRoute, private api: Api) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getSingleProduct(id).subscribe(data => {
      this.product = data;
      this.loading = false;
    });

    this.api.getProductComments(id).subscribe(comments => {
      this.comments = comments;
      this.commentsLoading = false;
    });
  }
} 