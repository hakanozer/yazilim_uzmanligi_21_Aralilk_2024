import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';
import { Course } from '../../models/course';

@Component({
  standalone: true,
  selector: 'app-course-list',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,

    // Material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.scss',
})
export class CourseListComponent {
  private courseService = inject(CourseService);
  private auth = inject(AuthService);

  courses: Course[] = [];
  q = '';

  isLoading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;

    this.courseService.getCourses().subscribe({
      next: (res) => (this.courses = res ?? []),
      error: () => (this.courses = []),
      complete: () => (this.isLoading = false),
    });
  }

  get filtered(): Course[] {
    const s = this.q.trim().toLowerCase();
    if (!s) return this.courses;
    return this.courses.filter(
      (c) =>
        c.title.toLowerCase().includes(s) ||
        c.description.toLowerCase().includes(s)
    );
  }

  isInstructor(): boolean {
    const u = this.auth.getCurrentUser();
    return u?.role === 'instructor';
  }
}
