import { CommonModule, CurrencyPipe } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { IProduct } from "../../models/IProduct";
import { Product } from "../../services/api/product";
import { ProductReviews } from "../product-reviews/product-reviews";

@Component({
  selector: "app-product-details",
  imports: [CommonModule, CurrencyPipe, RouterModule, ProductReviews],
  templateUrl: "./product-details.html",
  styleUrl: "./product-details.css",
})
export class ProductDetails implements OnInit {
  product = signal<IProduct | undefined>(undefined);
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);
  
  private route: ActivatedRoute = inject(ActivatedRoute);
  
  private apiService: Product  = inject(Product);
  
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId = +params["id"];
      if (isNaN(productId)) {
        console.error("Geçersiz ürün ID'si:", params["id"]);
        this.isLoading.set(false);
        return; 
      }
      this.fetchProductDetails(productId);
    });
  }

  
  fetchProductDetails(id: number): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.apiService.getProductById(id).subscribe({
      next: (data: IProduct) => {
        
        this.product.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error("Ürün detayları çekilirken hata oluştu:", error);
        this.hasError.set(true);
        this.isLoading.set(false);
        this.product.set(undefined);
      },
    });
  }

  goBackToProducts(): void {
    this.router.navigate(["/products"]);
  }
}
