import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/Course';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-courses-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-item.component.html',
  styleUrl: './courses-item.component.css'
})
export class CoursesItemComponent implements OnInit {
  course: Course | null = null;
  userNames: { [userId: string]: string } = {};

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;
    if (id !== null) {
      this.api.getCourseById(id).subscribe((res) => {
        this.course = res as Course;
        this.loadUserNames();
      });
    }
  }

  loadUserNames(): void {
    if (this.course?.comments) {
      this.course.comments.forEach(comment => {
        if (comment.userId && !this.userNames[comment.userId]) {
          this.api.getUserById(comment.userId).subscribe({
            next: (user) => {
              this.userNames[comment.userId] = `${user.name} ${user.surname}`;
            },
            error: (error) => {
              console.error('Error loading user:', error);
              this.userNames[comment.userId] = 'Anonim Kullanıcı';
            }
          });
        }
      });
    }
  }

  getUserName(userId: string): string {
    return this.userNames[userId] || 'Yükleniyor...';
  }
}
