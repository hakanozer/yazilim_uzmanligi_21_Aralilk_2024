import { Component, inject, OnInit } from '@angular/core';
import { BackgroundItem } from "../../components/background-item/background-item";
import { AuthService, UserDto } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Category {
  id: string;
  name: string;
}

interface Course {
  id: string;
  title: string;
  categoryId: string;
  instructorId: string;
}

@Component({
  selector: 'app-profile',
  imports: [BackgroundItem, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  private auth = inject(AuthService);
  private http = inject(HttpClient);

  user: UserDto | null = null;
  profilePhoto = 'assets/logo.png';

  // grouped data
  groupedCourses: Record<string, Course[]> = {};
  categories: Category[] = [];

  ngOnInit(): void {
    this.user = this.auth.currentUser();
    if (this.user) this.profilePhoto = this.user.profilePhoto || this.profilePhoto;

    // load categories and courses from json-server
    this.http.get<Category[]>('http://localhost:3000/categories').subscribe(categories => {
      this.categories = categories;
      this.loadCourses();
    });
  }

  private loadCourses() {
    this.http.get<Course[]>('http://localhost:3000/courses').subscribe(courses => {
      if (!this.user) return;

      if (this.user.role === 'instructor') {
        // group instructor's courses by category
        const my = courses.filter(c => c.instructorId === this.user!.id);
        this.groupedCourses = this.groupByCategory(my);
      } else {
        // student: load enrollments then map to courses
        this.http.get<any[]>('http://localhost:3000/enrollments?userId=' + this.user.id).subscribe(enrolls => {
          const enrolledCourseIds = new Set(enrolls.map(e => e.courseId));
          const my = courses.filter(c => enrolledCourseIds.has(c.id));
          this.groupedCourses = this.groupByCategory(my);
        });
      }
    });
  }

  private groupByCategory(list: Course[]) {
    const map: Record<string, Course[]> = {};
    for (const c of list) {
      map[c.categoryId] = map[c.categoryId] || [];
      map[c.categoryId].push(c);
    }
    return map;
  }
}
