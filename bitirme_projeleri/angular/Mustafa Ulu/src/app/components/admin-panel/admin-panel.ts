import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';
import { CourseService } from '../../services/course.service';
import { LessonService, Lesson } from '../../services/lesson.service';
import { Course } from '../../models/course';

@Component({
  standalone: true,
  selector: 'app-confirm-lesson-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog">
      <h2 class="dialog__title">
        <mat-icon color="warn">warning</mat-icon>
        Silme Onayı
      </h2>

      <p class="dialog__text">
        <b>{{ data.title }}</b> dersini silmek istediğine emin misin?
      </p>

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
      .dialog__title { display:flex; align-items:center; gap:10px; margin:0 0 10px; font-size:18px; font-weight:700; }
      .dialog__text { margin:0 0 14px; opacity:.9; line-height:1.4; }
      .dialog__actions { display:flex; justify-content:flex-end; gap:10px; }
    `,
  ],
})
export class ConfirmLessonDialogComponent {
  data = inject(MAT_DIALOG_DATA) as { title: string };
}

@Component({
  standalone: true,
  selector: 'app-confirm-course-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog">
      <h2 class="dialog__title">
        <mat-icon color="warn">warning</mat-icon>
        Kursu Sil
      </h2>

      <p class="dialog__text">
        <b>{{ data.title }}</b> kursunu silmek istediğine emin misin?
      </p>

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
      .dialog__title { display:flex; align-items:center; gap:10px; margin:0 0 10px; font-size:18px; font-weight:700; }
      .dialog__text { margin:0 0 14px; opacity:.9; line-height:1.4; }
      .dialog__actions { display:flex; justify-content:flex-end; gap:10px; }
    `,
  ],
})
export class ConfirmCourseDialogComponent {
  data = inject(MAT_DIALOG_DATA) as { title: string };
}

@Component({
  standalone: true,
  selector: 'app-create-course-dialog',
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  template: `
    <h2 mat-dialog-title>Yeni Kurs Oluştur</h2>

    <mat-dialog-content class="dlg">
      <mat-form-field appearance="outline" class="w-100">
        <mat-label>Kurs Başlığı</mat-label>
        <input matInput [(ngModel)]="title" />
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-100">
        <mat-label>Açıklama</mat-label>
        <textarea matInput rows="4" [(ngModel)]="description"></textarea>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-stroked-button mat-dialog-close>İptal</button>
      <button
        mat-flat-button
        color="primary"
        [disabled]="!title.trim()"
        [mat-dialog-close]="{ title: title.trim(), description: description.trim() }"
      >
        <mat-icon>add</mat-icon>
        Oluştur
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .dlg { display:grid; gap:12px; }
      .w-100 { width:100%; }
    `,
  ],
})
export class CreateCourseDialogComponent {
  title = '';
  description = '';
}

@Component({
  standalone: true,
  selector: 'app-admin-panel',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,

    ConfirmLessonDialogComponent,
    ConfirmCourseDialogComponent,
    CreateCourseDialogComponent,
  ],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.scss'], // ✅ styleUrl değil
})
export class AdminPanelComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private courseService = inject(CourseService);
  private lessonService = inject(LessonService);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);

  courses: Course[] = [];
  lessons: Lesson[] = [];

  // ✅ FIX: Tek tip yapıyoruz (number). 0 = seçilmedi.
  selectedCourseId: number = 0;

  newLessonTitle = '';
  newLessonVideoUrl = '';

  isLoading = false;
  isSaving = false;

  deletingLessonId: string | number | null = null;
  isDeletingCourse = false;

  ngOnInit(): void {
    if (this.auth.getRole() !== 'instructor') {
      this.router.navigate(['/courses']);
      return;
    }
    this.loadCourses();
  }

  private toast(message: string): void {
    this.snack.open(message, 'Tamam', { duration: 2500 });
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (list: Course[]) => {
        this.courses = list ?? [];

        // ✅ FIX: seçili kurs artık yoksa sıfırla
        const exists = this.courses.some((c: any) => Number(c.id) === Number(this.selectedCourseId));
        if (!exists) {
          this.selectedCourseId = 0;
          this.lessons = [];
        }
      },
      error: () => {
        this.courses = [];
        this.toast('Kurslar yüklenemedi.');
      },
    });
  }

  openCreateCourse(): void {
    const ref = this.dialog.open(CreateCourseDialogComponent, { width: '520px' });

    ref.afterClosed().subscribe((res: { title: string; description: string } | undefined) => {
      if (!res) return;

      const title = res.title.trim();
      const description = (res.description ?? '').trim();
      if (!title) return;

      const user = (this.auth as any).getCurrentUser?.() ?? null;
      const instructorId = Number(user?.id ?? 0) || 0;

      this.courseService.addCourse({ title, description, instructorId }).subscribe({
        next: () => {
          this.toast('Kurs oluşturuldu.');
          this.loadCourses();
        },
        error: () => this.toast('Kurs oluşturulamadı.'),
      });
    });
  }

  loadLessons(): void {
    // ✅ FIX: 0 iken istek atma
    if (this.selectedCourseId === 0) {
      this.lessons = [];
      return;
    }

    this.isLoading = true;

    this.lessonService.getByCourse(this.selectedCourseId).subscribe({
      next: (list) => (this.lessons = list ?? []),
      error: () => {
        this.lessons = [];
        this.toast('Dersler yüklenemedi.');
      },
      complete: () => (this.isLoading = false),
    });
  }

  createLesson(): void {
    if (this.selectedCourseId === 0) return;

    const title = this.newLessonTitle.trim();
    const videoUrl = this.newLessonVideoUrl.trim();
    if (!title || !videoUrl) {
      this.toast('Başlık ve URL boş olamaz.');
      return;
    }

    this.isSaving = true;

    // ✅ FIX: courseId number gitsin (db.json örneğin de böyle)
    this.lessonService
      .add({
        courseId: this.selectedCourseId as any,
        title,
        videoUrl,
      })
      .subscribe({
        next: () => {
          this.newLessonTitle = '';
          this.newLessonVideoUrl = '';
          this.toast('Ders eklendi.');
          this.loadLessons();
        },
        error: () => this.toast('Ders eklenemedi.'),
        complete: () => (this.isSaving = false),
      });
  }

  confirmDeleteLesson(id: string | number | undefined, title: string): void {
    if (id === undefined || id === null) return;

    const ref = this.dialog.open(ConfirmLessonDialogComponent, {
      width: '520px',
      data: { title },
    });

    ref.afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;
      this.deleteLesson(id);
    });
  }

  private deleteLesson(id: string | number): void {
    this.deletingLessonId = id;

    this.lessonService.delete(id).subscribe({
      next: () => {
        this.toast('Ders silindi.');
        this.loadLessons();
      },
      error: () => this.toast('Silme işlemi başarısız.'),
      complete: () => (this.deletingLessonId = null),
    });
  }

  confirmDeleteCourse(): void {
    // ✅ FIX: 0 iken asla silmeye çalışma
    if (this.selectedCourseId === 0) return;

    const selected = this.courses.find((c: any) => Number(c.id) === Number(this.selectedCourseId));
    const title = selected?.title ?? 'Seçili Kurs';

    const ref = this.dialog.open(ConfirmCourseDialogComponent, {
      width: '520px',
      data: { title },
    });

    ref.afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;
      this.deleteCourse();
    });
  }

  private deleteCourse(): void {
    if (this.selectedCourseId === 0) return;

    this.isDeletingCourse = true;

    // ✅ FIX: deleteCourse’a NUMBER gönder
    const idToDelete = Number(this.selectedCourseId);

    this.courseService.deleteCourse(idToDelete).subscribe({
      next: () => {
        this.toast('Kurs silindi.');
        this.selectedCourseId = 0;
        this.lessons = [];
        this.loadCourses();
      },
      error: (e) => {
        console.error(e);
        this.toast('Kurs silinemedi. Console hatasına bak.');
      },
      complete: () => (this.isDeletingCourse = false),
    });
  }

  clearForm(): void {
    this.newLessonTitle = '';
    this.newLessonVideoUrl = '';
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
