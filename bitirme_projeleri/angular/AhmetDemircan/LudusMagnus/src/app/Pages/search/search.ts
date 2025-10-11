import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Api } from '../../services/api';
import { ICourses } from '../../models/Icourses';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [RouterModule, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {

  searchResults: ICourses[] = [];
  searchQuery = '';
  isLoading = false;
  hasSearched = false;

  constructor(
    private api: Api, 
    private cdr: ChangeDetectorRef, 
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const query = params['query'];
      if (query) {
        this.searchQuery = query;
        this.performSearch(query);
      }
    });
  }

  performSearch(query: string) {
    this.isLoading = true;
    this.hasSearched = true;
    
    // Tüm kursları çek ve client-side filtering yap
    this.api.getCourses().subscribe({
      next: (allCourses) => {
        // searchQuery ile eşleşen kursları filtrele
        this.searchResults = allCourses.filter(course => {
          const searchTerm = query.toLowerCase();
          return (
            course.title.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm) ||
            course.instructor.toLowerCase().includes(searchTerm) ||
            course.category.toLowerCase().includes(searchTerm)
          );
        });
        
        console.log('Arama sorgusu:', query);
        console.log('Filtrelenmiş sonuçlar:', this.searchResults);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Arama hatası:', error);
        this.searchResults = [];
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}

