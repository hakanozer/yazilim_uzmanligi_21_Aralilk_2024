import { Component, inject, OnInit } from '@angular/core';
import { BackgroundItem } from "../../components/background-item/background-item";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

interface Course {
  id: string;
  title: string;
  description?: string;
  price?: number;
  image?: string;
  instructorName?: string;
}

@Component({
  selector: 'app-courses',
  imports: [BackgroundItem, CommonModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses implements OnInit {
  private http = inject(HttpClient);
  readonly auth = inject(AuthService);

  courses: Course[] = [];
  enrolling = new Set<string>();

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.http.get<Course[]>('http://localhost:3000/courses').subscribe(list => this.courses = list);
  }

  isEnrolled(courseId: string) {
    const user = this.auth.currentUser();
    if (!user) return false;
    // check enrollments endpoint
    // synchronous check not possible here; UI will still allow enroll button to check on click
    return false;
  }

  enroll(courseId: string) {
    const user = this.auth.currentUser();
    if (!user) {
      alert('Lütfen önce giriş yapın');
      return;
    }
    this.enrolling.add(courseId);
    const payload = { userId: user.id, courseId };
    this.http.post('http://localhost:3000/enrollments', payload).subscribe({
      next: () => {
        this.enrolling.delete(courseId);
        alert('Kursa kayıt yapıldı');
      },
      error: () => {
        this.enrolling.delete(courseId);
        alert('Kayıt sırasında hata oluştu');
      }
    });
  }
}
