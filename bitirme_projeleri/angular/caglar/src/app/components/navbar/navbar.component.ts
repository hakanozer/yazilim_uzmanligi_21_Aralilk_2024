import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  userSurname: string = '';
  isLoading: boolean = true;
  searchQuery: string = '';

  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadUserInfo();
    this.syncSearchBarWithUrl();
  }

  loadUserInfo(): void {
    this.apiService.getCurrentUser().subscribe({
      next: (user) => {
        this.userName = user.name || '';
        this.userSurname = user.surname || '';
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user info:', error);
        this.isLoading = false;
      }
    });
  }

  logout() {
    const answer = confirm('Are you sure you want to leave?');
    if (answer) {
      this.apiService.userLogout().subscribe({
        next: (value) => {
          // Clear all localStorage data
          localStorage.removeItem('accessToken');
          localStorage.removeItem('currentUser');
          localStorage.removeItem('enrolledCourses');
          window.location.replace('/');
        },
        error: (error) => {
          console.error('Logout error:', error);
          // Even if logout API fails, clear all local data and redirect
          localStorage.removeItem('accessToken');
          localStorage.removeItem('currentUser');
          localStorage.removeItem('enrolledCourses');
          window.location.replace('/');
        }
      });
    }
  }

  onSearch(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      // Search query'yi courses sayfasına query parameter olarak gönder
      this.router.navigate(['/courses'], { 
        queryParams: { search: this.searchQuery.trim() } 
      });
    } else {
      // Search query boşsa, tüm kursları göstermek için courses sayfasına git
      this.router.navigate(['/courses']);
    }
  }

  onSearchInputChange(): void {
    // Eğer search input tamamen temizlendiyse ve şu anda courses sayfasındaysak
    if (!this.searchQuery.trim() && this.router.url.includes('/courses')) {
      // Tüm kursları göstermek için courses sayfasına query parameter olmadan git
      this.router.navigate(['/courses']);
    }
  }

  syncSearchBarWithUrl(): void {
    // Router events'i dinleyerek URL değişikliklerini takip et
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Courses sayfasındaysak ve query parameter varsa search bar'ı güncelle
      if (this.router.url.includes('/courses')) {
        const urlParams = new URLSearchParams(this.router.url.split('?')[1] || '');
        const searchParam = urlParams.get('search');
        this.searchQuery = searchParam || '';
      } else {
        // Courses sayfasında değilsek search bar'ı temizle
        this.searchQuery = '';
      }
    });
  }
}
