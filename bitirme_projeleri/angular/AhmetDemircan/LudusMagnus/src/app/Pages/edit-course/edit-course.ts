import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Api } from '../../services/api';
import { ICourses } from '../../models/Icourses';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-course',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.css'
})
export class EditCourse implements OnInit {
  
  // Form modeli
  formModel = {
    id: '',
    createdById: '',
    title: '',
    description: '',
    duration: '',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    instructor: '',
    price: 0,
    category: '',
    rating: 0,
    isActive: true,
    createdAt: '',
    enrolledStudents: 0
  };

  courseId: string = '';
  isLoading: boolean = true;
  isUpdating: boolean = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  originalCourse: ICourses | null = null;

  constructor(
    private api: Api,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Route parametresinden kurs ID'sini al
    this.courseId = this.route.snapshot.paramMap.get('id') || '';//yeni öğrenim snapshot: Rotanın o anki anlık durumunu temsil eder. Parametreleri almak için kullanılır.
    //paramMap: URL'deki parametreleri içeren bir harita sağlar. 'id' parametresini almak için kullanılır. snapshot: url nin durumunu al, paramMap: içindeki parametreleri al
    if (this.courseId) {
      this.loadCourse();
    } else {
      this.message = 'Course ID not found!';
      console.error('Kurs ID bulunamadı!');
      this.messageType = 'error';
      this.router.navigate(['/not-found']);
      //console.log('courseId:', this.courseId);
      this.isLoading = false;
    }
  }

  // Kursu yükle
  loadCourse() {
    this.isLoading = true;
    this.api.getCoursesById(this.courseId).subscribe({
      next: (course: ICourses) => {
        console.log('Yüklenen kurs:', course);
        this.originalCourse = course;
        this.formModel = {
          id: course.id,
          createdById: course.createdById,
          title: course.title,
          description: course.description,
          duration: course.duration,
          level: course.level,
          instructor: course.instructor,
          price: course.price,
          category: course.category,
          rating: course.rating,
          isActive: course.isActive,
          createdAt: course.createdAt,
          enrolledStudents: course.enrolledStudents
        };
        this.isLoading = false;
        
        // Yetki kontrolü - sadece kurs sahibi veya admin düzenleyebilir
        const currentUser = this.authService.getCurrentUser();
        if (currentUser && 
            (currentUser.id !== course.createdById && currentUser.role !== 'admin')) {
          this.message = 'You do not have permission to edit this course!';
          this.messageType = 'error';
          console.log('Kullanıc:' , currentUser);
          setTimeout(() => {
            this.router.navigate(['/unauthorized']);
          }, 2000);
        }
      },
      error: (error) => {
        console.error('Kurs yüklenirken hata oluştu:', error);
        this.message = 'An error occurred while loading the course!';
        this.messageType = 'error';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  // Kursu güncelle
  updateCourse() {
    if (!this.validateForm()) {
      return;
    }

    this.isUpdating = true;
    this.message = '';
    
    const updatedCourse: ICourses = {
      id: this.formModel.id,
      createdById: this.formModel.createdById,
      title: this.formModel.title,
      description: this.formModel.description,
      duration: this.formModel.duration,
      level: this.formModel.level,
      instructor: this.formModel.instructor,
      price: this.formModel.price,
      category: this.formModel.category,
      rating: this.formModel.rating,
      isActive: this.formModel.isActive,
      createdAt: this.formModel.createdAt,
      enrolledStudents: this.formModel.enrolledStudents
    };
    
    this.api.updateCourses(this.courseId, updatedCourse).subscribe({
      next: (updated: ICourses) => {
        console.log('Kurs güncellendi:', updated);
        this.message = 'Course updated successfully!';
        this.messageType = 'success';
        this.isUpdating = false;
        
        // 2 saniye sonra Courses sayfasına yönlendir
        setTimeout(() => {
          this.router.navigate(['/Courses']);
        }, 2000);
      },
      error: (error) => {
        console.error('Kurs güncellenirken hata oluştu:', error);
        this.message = 'An error occurred while updating the course!';
        this.messageType = 'error';
        this.isUpdating = false;
      }
    });
  }
  
  // Form doğrulama
  validateForm(): boolean {
    if (!this.formModel.title.trim()) {
      this.message = 'Course title is required!';
      this.messageType = 'error';
      return false;
    }
    if (!this.formModel.description.trim()) {
      this.message = 'Course description required!';
      this.messageType = 'error';
      return false;
    }
    if (!this.formModel.instructor.trim()) {
      this.message = 'Instructor name is required!';
      this.messageType = 'error';
      return false;
    }
    if (this.formModel.price < 0) {
      this.message = 'Price must be a positive value!';
      this.messageType = 'error';
      return false;
    }
    return true;
  }
  
  // Değişiklikleri iptal et
  cancelChanges() {
    if (this.originalCourse) {
      this.formModel = {
        id: this.originalCourse.id,
        createdById: this.originalCourse.createdById,
        title: this.originalCourse.title,
        description: this.originalCourse.description,
        duration: this.originalCourse.duration,
        level: this.originalCourse.level,
        instructor: this.originalCourse.instructor,
        price: this.originalCourse.price,
        category: this.originalCourse.category,
        rating: this.originalCourse.rating,
        isActive: this.originalCourse.isActive,
        createdAt: this.originalCourse.createdAt,
        enrolledStudents: this.originalCourse.enrolledStudents
      };
      this.message = 'Changes canceled.';
      this.messageType = 'success';
    }
  }

  // Geri dön
  goBack() {
    this.router.navigate(['/teacher-panel']);
  }

  // Kursu sil
  deleteCourse() {
    if (confirm('Bu kursu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      this.api.deleteCursus(this.courseId).subscribe({
        next: () => {
          this.message = 'Course deleted successfully!';
          this.messageType = 'success';
          setTimeout(() => {
            this.router.navigate(['/cursus']);
          }, 1500);
        },
        error: (error) => {
          console.error('An error occurred while deleting the course:', error);
          this.message = 'An error occurred while deleting the course!';
          this.messageType = 'error';
        }
      });
    }
  }
}
