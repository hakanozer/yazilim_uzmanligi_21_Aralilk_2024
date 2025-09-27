import { Component, OnInit, ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Course } from '../../models/Course';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CoursesItemComponent } from "../../components/courses-item/courses-item.component";
import { RouterModule, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
  changeDetection:ChangeDetectionStrategy.Default
})
export class CoursesComponent implements OnInit {

  coursesArr: Course[] = []
  selectedCourses: Set<number> = new Set()
  allCoursesArr: Course[] = [] // Tüm kursları saklamak için

  constructor (private api:ApiService, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    // Mevcut seçili kursları yükle
    this.loadSelectedCourses();
    
    // Tüm kursları yükle
    this.api.allCourses().subscribe({
      next:(response: any[]) => {
        this.allCoursesArr = response;
        this.coursesArr = response;
        this.cdr.detectChanges();
        console.log('Courses loaded:', this.coursesArr);
      },
      error:(error) => {
        console.error('Error loading courses:', error);
      }
    });

    // URL'den search query'sini kontrol et
    this.route.queryParams.subscribe(params => {
      const searchQuery = params['search'];
      if (searchQuery) {
        this.searchCourses(searchQuery);
      } else {
        // Search query yoksa tüm kursları göster
        this.coursesArr = this.allCoursesArr;
        this.cdr.detectChanges();
      }
    });
  }

  loadSelectedCourses(): void {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    this.selectedCourses = new Set(enrolledCourses);
  }

  selectCourse(courseId: number): void {
    this.api.enrollCourse(courseId).subscribe({
      next: (response: any) => {
        this.selectedCourses.add(courseId);
        console.log('Course selected successfully:', response);
        if (response.success) {
          alert('Kurs başarıyla seçildi!');
        } else {
          alert('Bu kursa zaten kayıtlısınız!');
        }
      },
      error: (error: any) => {
        console.error('Error selecting course:', error);
        alert('Kurs seçilirken bir hata oluştu.');
      }
    });
  }

  isCourseSelected(courseId: number): boolean {
    return this.selectedCourses.has(courseId);
  }

  searchCourses(query: string): void {
    if (!query || query.trim() === '') {
      // Eğer arama terimi boşsa, tüm kursları göster
      this.coursesArr = this.allCoursesArr;
    } else {
      // API service'deki search fonksiyonunu kullan
      this.api.searchCourses(query).subscribe({
        next: (filteredCourses) => {
          this.coursesArr = filteredCourses;
          this.cdr.detectChanges();
          console.log('Search results:', this.coursesArr);
        },
        error: (error) => {
          console.error('Error searching courses:', error);
        }
      });
    }
  }
}
