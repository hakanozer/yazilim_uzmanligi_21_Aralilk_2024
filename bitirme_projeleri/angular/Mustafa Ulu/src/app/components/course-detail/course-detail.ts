import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CourseService } from '../../services/course.service';
import { LessonService, Lesson } from '../../services/lesson.service';
import { EnrollmentService } from '../../services/enrollment';
import { AuthService } from '../../services/auth.service';
import { CommentService } from '../../services/comment';
import { UserService } from '../../services/user';

import { Course } from '../../models/course';
import { Comments } from '../../models/comments';

type Role = 'student' | 'instructor' | '';
type CommentVM = Comments & { userName: string };

/** Silme onay dialogu */
@Component({
  standalone: true,
  selector: 'app-confirm-delete-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog">
      <h2 class="dialog__title">
        <mat-icon color="warn">warning</mat-icon>
        Yorumu Sil
      </h2>

      <p class="dialog__text">Bu yorumu silmek istediğine emin misin?</p>

      <div class="dialog__actions">
        <button mat-stroked-button [mat-dialog-close]="false">Vazgeç</button>
        <button mat-flat-button color="warn" [mat-dialog-close]="true">
          <mat-icon>delete</mat-icon>
          Sil
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog { padding: 8px 4px 2px; max-width: 520px; }
      .dialog__title { display:flex; align-items:center; gap:10px; margin:0 0 10px; font-size:18px; font-weight:800; }
      .dialog__text { margin:0 0 14px; opacity:.9; line-height:1.4; }
      .dialog__actions { display:flex; justify-content:flex-end; gap:10px; }
    `,
  ],
})
export class ConfirmDeleteDialogComponent {
  data = inject(MAT_DIALOG_DATA) as any;
}

@Component({
  standalone: true,
  selector: 'app-course-detail',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,

    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,

    ConfirmDeleteDialogComponent,
  ],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.scss',
})
export class CourseDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private courseService = inject(CourseService);
  private lessonService = inject(LessonService);
  private enrollmentService = inject(EnrollmentService);
  private authService = inject(AuthService);
  private commentService = inject(CommentService);
  private userService = inject(UserService);

  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);

  course?: Course;

  // ✅ string id destek
  courseId: string | number = '';

  userId = 0;
  role: Role = '';

  isEnrolled = false;

  lessons: Lesson[] = [];
  isLoadingLessons = false;

  comments: CommentVM[] = [];
  newComment = '';

  isLoadingComments = false;
  isSending = false;
  isEnrolling = false;
  deletingId: string | number | null = null;

  ngOnInit(): void {
    const user =
      (this.authService as any).getCurrentUser?.() ??
      (this.authService as any).getCurrentUser?.call(this.authService);

    this.userId = Number(user?.id ?? 0);
    this.role = (user?.role as Role) ?? '';

    this.route.paramMap.subscribe((p) => {
      const raw = p.get('id');
      if (!raw) {
        this.router.navigate(['/courses']);
        return;
      }

      this.courseId = raw;

      this.loadCourse();
      this.loadComments();
      this.checkEnrollment(); // burada dersleri de tetikleyeceğiz
    });
  }

  private toast(msg: string): void {
    this.snack.open(msg, 'Tamam', { duration: 2500 });
  }

  loadCourse(): void {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (c: Course) => (this.course = c),
      error: () => {
        this.toast('Kurs bulunamadı.');
        this.router.navigate(['/courses']);
      },
    });
  }

  loadLessons(): void {
    // öğrenci enrolled değilse gösterme (istersen kaldırırız)
    if (this.role === 'student' && !this.isEnrolled) {
      this.lessons = [];
      return;
    }

    this.isLoadingLessons = true;

    this.lessonService.getByCourse(this.courseId).subscribe({
      next: (list) => (this.lessons = list ?? []),
      error: () => {
        this.lessons = [];
        this.toast('Dersler yüklenemedi.');
      },
      complete: () => (this.isLoadingLessons = false),
    });
  }

  loadComments(): void {
    this.isLoadingComments = true;

    (this.commentService as any).getByCourse(this.courseId).subscribe({
      next: (comments: Comments[]) => {
        this.userService.getUsers().subscribe({
          next: (users: any[]) => {
            this.comments = (comments ?? []).map((c: any) => ({
              ...c,
              userName: users.find((u) => String(u.id) === String(c.userId))?.name ?? 'User',
            }));
            this.isLoadingComments = false;
          },
          error: () => {
            this.comments = (comments ?? []).map((c: any) => ({ ...c, userName: 'User' }));
            this.isLoadingComments = false;
          },
        });
      },
      error: () => {
        this.comments = [];
        this.isLoadingComments = false;
      },
    });
  }

  checkEnrollment(): void {
    if (!this.userId) {
      this.isEnrolled = false;
      this.lessons = [];
      return;
    }

    // instructor dersleri görsün
    if (this.role === 'instructor') {
      this.isEnrolled = true;
      this.loadLessons();
      return;
    }

    (this.enrollmentService as any).getEnrollment(this.userId, this.courseId).subscribe({
      next: (e: any[]) => {
        this.isEnrolled = (e?.length ?? 0) > 0;
        this.loadLessons(); // ✅ enrollment sonucu gelince dersleri çek
      },
      error: () => {
        this.isEnrolled = false;
        this.lessons = [];
      },
    });
  }

  enroll(): void {
    if (this.role !== 'student') return;
    if (!this.userId) return;

    this.isEnrolling = true;

    (this.enrollmentService as any).enroll(this.userId, this.courseId).subscribe({
      next: () => {
        this.isEnrolled = true;
        this.toast('Kursa kaydolundu.');
        this.loadLessons(); // ✅ kaydolunca dersleri getir
      },
      error: () => this.toast('Kayıt işlemi başarısız.'),
      complete: () => (this.isEnrolling = false),
    });
  }

  addComment(): void {
    if (!this.userId) return;
    if (this.role !== 'student') return;
    if (!this.isEnrolled) return;

    const text = this.newComment.trim();
    if (!text) return;

    this.isSending = true;

    (this.commentService as any)
      .add({
        courseId: this.courseId,
        userId: this.userId,
        text,
        date: new Date().toISOString().split('T')[0],
      })
      .subscribe({
        next: () => {
          this.newComment = '';
          this.toast('Yorum eklendi.');
          this.loadComments();
        },
        error: () => this.toast('Yorum eklenemedi.'),
        complete: () => (this.isSending = false),
      });
  }

  canDelete(c: Comments): boolean {
    if (this.role === 'instructor') return true;
    return String((c as any).userId) === String(this.userId);
  }

  confirmDelete(id: any, _userName?: string): void {
    const ref = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '520px',
      data: {},
    });

    ref.afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;
      this.deleteComment(id);
    });
  }

  deleteComment(id: any): void {
    this.deletingId = id;

    this.commentService.delete(id).subscribe({
      next: () => {
        this.toast('Yorum silindi.');
        this.loadComments();
      },
      error: () => this.toast('Silme işlemi başarısız.'),
      complete: () => (this.deletingId = null),
    });
  }
}
