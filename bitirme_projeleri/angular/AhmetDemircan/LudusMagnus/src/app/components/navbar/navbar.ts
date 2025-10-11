import { Component, ViewChild, ElementRef, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef;

  showSearch = false;
  showDropdown = false;
  searchQuery = '';
  currentPlaceholder = 'Search courses...';
  
  private placeholders = [
    'Search courses...',
    '1283',// 1283
    'Find Angular tutorials...',
    'Look for JavaScript lessons...',
    'Discover React courses...',
    'Search Python programming...',
    'Find web development...',
    'Look for data science...'
  ];
  
  private placeholderIndex = 0;
  private placeholderInterval: any;
  
  constructor(public authService: AuthService, private router: Router) {}
  
  ngOnInit() {
    this.startPlaceholderRotation();
  }
  
  ngOnDestroy() {
    // Bir yaşam döngüsü metodudur. Bileşen DOM'dan kaldırılmadan ve tamamen yok edilmeden önce çağrılır.
    // Bu metot, bellek sızıntılarını önlemek için abone olunan Observable'ları, zamanlayıcıları ve
    // diğer kaynakları temizlemek için kullanılır.
    // diğer asenkron işlemleri temizlemek için kullanılır.
    // Burada placeholderInterval ı temizlemek için kullanılır.
    // Kurulan zamanlayıcı birden çok kez çalıştı ve durmayıp aşırı tüketime neden olunca yapay zeka ile yapılan araştırma sonucu eklenildi.
    if (this.placeholderInterval) {
      clearInterval(this.placeholderInterval);
    }
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdownContainer = target.closest('.dropdown-container');
    const searchContainer = target.closest('.search-container');
    
    if (!dropdownContainer) {
      this.showDropdown = false;
    }
    
    if (!searchContainer) {
      this.showSearch = false;
    }
  }
  
  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      setTimeout(() => {
        this.searchInput?.nativeElement?.focus();
      }, 300); // Arama barı açıldığında animasyon süresi kadar bekle
    }
  }
  
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  
  closeDropdown() {
    this.showDropdown = false;
  }
  
  performSearch() {
    const trimmedQuery = this.searchQuery.trim();
    if (trimmedQuery) {
      // Özel arama kontrolü
      if (trimmedQuery === "1283") {
        console.log("we seeking for 1283 too");
        return;
      }
      // Search sayfasına yönlendir ve query parametresi gönder
      this.router.navigate(['/search'], { queryParams: { query: trimmedQuery } });
      this.showSearch = false; // Arama kutusunu kapat
    }
  }
  
  logout() { // logout durumunda authService de bulunan logout metodu çağrılır ve dropdown kapatılır.
    this.authService.logout();
    this.closeDropdown();
  }
  
  private startPlaceholderRotation() {
    this.placeholderInterval = setInterval(() => {
      this.placeholderIndex = (this.placeholderIndex + 1) % this.placeholders.length;
      this.currentPlaceholder = this.placeholders[this.placeholderIndex];
    }, 3000);
  }
}
