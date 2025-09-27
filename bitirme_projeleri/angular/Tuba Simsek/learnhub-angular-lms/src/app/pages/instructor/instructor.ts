import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { Api } from '../../services/api';
import { Course } from '../../models/ICourse';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

declare var bootstrap: any; // Bootstrap modal kontrolü için

@Component({
  selector: 'app-instructor',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './instructor.html',
  styleUrls: ['./instructor.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class Instructor implements OnInit {
  courses: Course[] = [];
  courseForm!: FormGroup;
  modalTitle = 'Yeni Kurs Ekle';
  editingCourseId: number | null = null;
  

  private page = 1;
  private per_page = 50;

  constructor(private api: Api, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadCourses();

    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.min(0)],
      image: ['https://via.placeholder.com/240x135']
    });
  }

  loadCourses() {
    const instructorId = Number(localStorage.getItem('userId')) || 0;
    this.api.getAllCourses(this.page, this.per_page).subscribe({
      next: (res: Course[]) => {
        this.courses = res.filter(c => c.instructorId === instructorId);
      },
      error: (err) => console.error('Kurslar yüklenirken hata:', err)
    });
  }

  openAddModal() {
    this.modalTitle = 'Yeni Kurs Ekle';
    this.editingCourseId = null;
    this.courseForm.reset({
      title: '',
      description: '',
      price: 0,
      image: 'https://via.placeholder.com/240x135'
    });
    const modal = new bootstrap.Modal(document.getElementById('courseModal'));
    modal.show();
    
  }

  openEditModal(course: Course) {
    this.modalTitle = 'Kursu Düzenle';
    this.editingCourseId = course.id ?? null;
    this.courseForm.patchValue({
      title: course.title,
      description: course.description,
      price: course.price,
      image: course.image
    });
    const modal = new bootstrap.Modal(document.getElementById('courseModal'));
    modal.show();
  }

  saveCourse() {
    if (this.courseForm.invalid) return;

    const instructorId = Number(localStorage.getItem('userId')) || 0;
    const courseData: Partial<Course> = {
      ...this.courseForm.value,
      instructorId,
      rating: 0,
      students: 0,
      category: 'Uncategorized',
      videoUrl: ''
    };

    if (this.editingCourseId) {
      // update
      this.api.updateCourse(this.editingCourseId, courseData).subscribe({
        next: (res: Course) => {
          const index = this.courses.findIndex(c => c.id === this.editingCourseId);
          if (index > -1) this.courses[index] = res;
          this.closeModal();
          
        },
        error: (err) => console.error('Kurs güncelleme hatası:', err)
      });
    } else {
      // add
      this.api.addCourse(courseData).subscribe({
        next: (res: Course) => {
          this.courses.push(res)
          this.closeModal()
          
        },
        error: (err) => console.error('Kurs ekleme hatası:', err)
      })
    }
  }

  deleteCourse(id: number) {
    if (!confirm('Bu kursu silmek istediğinize emin misiniz?')) return

    this.api.deleteCourse(id).subscribe({
      next: () => this.courses = this.courses.filter(c => c.id !== id),
      error: (err) => console.error('Kurs silme hatası:', err)
    });
  }

  private closeModal() {
    const modalEl = document.getElementById('courseModal')
    const modal = bootstrap.Modal.getInstance(modalEl)
    modal.hide();
  }
}
