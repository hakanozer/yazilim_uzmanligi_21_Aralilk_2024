import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { IProduct, IProductResponse } from "../../models/IProducts";
import { Product } from "../../services/api";
import { CommonModule, CurrencyPipe, SlicePipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-products",
  imports: [CommonModule, CurrencyPipe, SlicePipe, RouterModule, FormsModule], //CurrencyPipe ve SlicePipe ile düzgün bir görüntü sağlayabiliyoruz.
  templateUrl: "./products.html",
  styleUrl: "./products.css",
})
export class Products implements OnInit {
  products = signal<IProduct[]>([]);
  isLoading = signal<boolean>(true);
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(12);
  totalProducts = signal<number>(0);
  totalPages = computed(() => Math.ceil(this.totalProducts() / this.itemsPerPage() ))
  itemsPerPageOptions = signal<number[]>([12, 21, 30, 39, 48]);
  private apiService: Product = inject(Product);
  pageNumbers = computed(() => {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  });

  ngOnInit(): void {
    this.fetchProducts();
  }

  onItemsPerPageChange(event: Event): void {
    const selectedValue = parseInt((event.target as HTMLSelectElement).value,10);
    this.itemsPerPage.set(selectedValue);
    this.currentPage.set(1);
    this.fetchProducts();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.fetchProducts();
    }
  }

  onPageSelectChange(event: Event): void {
      const selectedPage = parseInt((event.target as HTMLSelectElement).value);
      this.goToPage(selectedPage);
  }
  


  fetchProducts(): void {
    this.isLoading.set(true);
    const skip = (this.currentPage() - 1) * this.itemsPerPage(); // Atlanacak product sayısı

    this.apiService.getProducts(this.itemsPerPage(), skip).subscribe({
      next: (response: IProductResponse) => {
        console.log(response.products)
        this.products.set(response.products);
        this.totalProducts.set(response.total);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error("Ürünler getirilemedi", error);
        this.isLoading.set(false);
      },
    });
  }

  nextPage(): void {
    if((this.currentPage() + 1) * this.itemsPerPage() < this.totalProducts()) // sonraki sayfa için yeterince ürün varsa
    {
      this.currentPage.update(current => current + 1);
      this.fetchProducts() // sayfa numarasını 1 arttırıp yeni sayfayı çektik.
    }
  }

  prevPage(): void {
    if(this.currentPage() > 0) {
      this.currentPage.update(current => current -1)
      this.fetchProducts()
    }
  }
}
