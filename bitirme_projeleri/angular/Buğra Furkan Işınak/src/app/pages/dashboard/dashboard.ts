import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../../services/api';
import { Product } from '../../models/IProducts';
import { Bar } from '../../components/bar/bar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Bar, CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  totalProducts: number = 0;
  totalUsers: number = 0;
  totalComments: number = 0;
  recentProducts: any[] = [];
  recentUsers: any[] = [];
  isLoading: any = true;

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef

  ) {
  }


ngOnInit(){
    this.loadDashboardData();
}

loadDashboardData() {
  const products$ = this.api.allProducts(1, 5);
  const users$ = this.api.users(1, 5);
  const comments$ = this.api.productComment(1, 1);

  forkJoin([products$, users$, comments$]).subscribe({
    next: ([productsRes, usersRes, commentsRes]) => {
      this.isLoading = false;
      // ürünler
      const data: Product[] = productsRes.body ?? [];
      this.totalProducts = Number(productsRes.headers.get('X-Total-Count')) || 0;
      this.recentProducts = data.slice(0, 3);

      // kullanıcılar
      this.totalUsers = Number(usersRes.headers.get('X-Total-Count')) || 0;
      var user: any = usersRes.body;
      if (user.body) this.recentUsers = user.body.slice(0, 3);

      // yorumlar
      this.totalComments = Number(commentsRes.headers.get('X-Total-Count')) || 0;
       this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Dashboard load error:', err);
       this.cdr.detectChanges();
      this.isLoading = false;
    }
  });
}

  private loadedCount = 0;
  checkLoadingComplete() {
    this.loadedCount++;
    if (this.loadedCount >= 3) {

       this.cdr.detectChanges();

      this.isLoading = false;
    }
  }
}