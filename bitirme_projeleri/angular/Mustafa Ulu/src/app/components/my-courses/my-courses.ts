import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EnrollmentService } from '../../services/enrollment';
import { AuthService } from '../../services/auth.service';
import { CourseService } from '../../services/course.service';

import { Course } from '../../models/course';

@Component({
  standalone: true,
  selector: 'app-my-courses',
  imports: [
    CommonModule,
    RouterLink,

    // Material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './my-courses.html',
  styleUrl: './my-courses.scss',
})
export class MyCoursesComponent {
  private enrollmentService = inject(EnrollmentService);
  private authService = inject(AuthService);
  private courseService = inject(CourseService);

  courses: Course[] = [];
  isLoading = false;

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    const userId = Number(user?.id ?? 0);

    if (!userId) {
      this.courses = [];
      return;
    }

    this.isLoading = true;

    this.enrollmentService.getUserEnrollments(userId).subscribe({
      next: (enrs: any[]) => {
        const ids = (enrs ?? []).map((e) => Number(e.courseId));

        this.courseService.getCourses().subscribe({
          next: (all) => {
            this.courses = (all ?? []).filter((c) =>
              ids.includes(Number((c as any).id))
            );
          },
          error: () => {
            this.courses = [];
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      },
      error: () => {
        this.courses = [];
        this.isLoading = false;
      },
    });
  }
}
