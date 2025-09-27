import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { users } from '../../models/user';
import { Course } from '../../models/Course';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: users | null = null;
  userCourses: Course[] = [];
  isLoading: boolean = true;
  commentTexts: { [courseId: number]: string } = {}; // Comment metinleri için
  
  // Eğitmen için yeni kurs formu
  showAddCourseForm: boolean = false;
  newCourse: any = {
    coursesTitle: '',
    icon: '',
    description: '',
    Instructor: '',
    InstructorId: ''
  };

  // Düzenleme için
  editingCourse: Course | null = null;
  editCourse: any = {};

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.apiService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.loadUserCourses();
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
        this.isLoading = false;
      }
    });
  }

  loadUserCourses(): void {
    if (!this.currentUser) return;

    if (this.currentUser.type === 'student') {
      // Öğrenci için kayıtlı kursları getir
      this.apiService.getStudentCourses().subscribe({
        next: (courses) => {
          this.userCourses = courses;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading student courses:', error);
          this.isLoading = false;
        }
      });
    } else if (this.currentUser.type === 'instructor') {
      // Eğitmen için oluşturduğu kursları getir
      this.apiService.getInstructorCourses(this.currentUser.id).subscribe({
        next: (courses) => {
          this.userCourses = courses;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading instructor courses:', error);
          this.isLoading = false;
        }
      });
    }
  }

  // Eğitmen fonksiyonları
  toggleAddCourseForm(): void {
    this.showAddCourseForm = !this.showAddCourseForm;
    if (this.showAddCourseForm) {
      this.newCourse = {
        coursesTitle: '',
        icon: '',
        description: '',
        Instructor: this.currentUser?.name + ' ' + this.currentUser?.surname,
        InstructorId: this.currentUser?.id
      };
    }
  }

  addCourse(): void {
    if (!this.newCourse.coursesTitle || !this.newCourse.description) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }

    this.apiService.createCourse(this.newCourse).subscribe({
      next: (course) => {
        this.userCourses.push(course);
        this.showAddCourseForm = false;
        this.newCourse = {
          coursesTitle: '',
          icon: '',
          description: '',
          Instructor: '',
          InstructorId: ''
        };
        alert('Kurs başarıyla eklendi!');
      },
      error: (error) => {
        console.error('Error adding course:', error);
        alert('Kurs eklenirken hata oluştu!');
      }
    });
  }

  startEditCourse(course: Course): void {
    this.editingCourse = course;
    this.editCourse = { ...course };
  }

  updateCourse(): void {
    if (!this.editCourse.coursesTitle || !this.editCourse.description) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }

    this.apiService.updateCourse(this.editCourse.id, this.editCourse).subscribe({
      next: (updatedCourse) => {
        const index = this.userCourses.findIndex(c => c.id === updatedCourse.id);
        if (index !== -1) {
          this.userCourses[index] = updatedCourse;
        }
        this.editingCourse = null;
        this.editCourse = {};
        alert('Kurs başarıyla güncellendi!');
      },
      error: (error) => {
        console.error('Error updating course:', error);
        alert('Kurs güncellenirken hata oluştu!');
      }
    });
  }

  cancelEdit(): void {
    this.editingCourse = null;
    this.editCourse = {};
  }

  deleteCourse(courseId: number): void {
    if (confirm('Bu kursu silmek istediğinizden emin misiniz?')) {
      this.apiService.deleteCourse(courseId).subscribe({
        next: () => {
          this.userCourses = this.userCourses.filter(c => c.id !== courseId);
          alert('Kurs başarıyla silindi!');
        },
        error: (error) => {
          console.error('Error deleting course:', error);
          alert('Kurs silinirken hata oluştu!');
        }
      });
    }
  }

  // Öğrenci için ilerleme hesaplama (basit örnek)
  getCourseProgress(course: Course): number {
    // Kurs ID'sine göre sabit bir ilerleme döndürüyoruz
    // Gerçek uygulamada bu bilgi veritabanından gelecek
    const progressMap: { [key: number]: number } = {
      1: 75,
      2: 60,
      3: 90,
      4: 45,
      5: 80
    };
    
    return progressMap[course.id] || 50; // Varsayılan %50
  }

  // Öğrenci için kurstan çıkma
  unenrollFromCourse(courseId: number): void {
    if (confirm('Bu kurstan çıkmak istediğinizden emin misiniz?')) {
      this.apiService.unenrollCourse(courseId).subscribe({
        next: (response: any) => {
          if (response.success) {
            alert('Kurstan başarıyla çıktınız!');
            this.loadUserCourses(); // Kurs listesini yenile
          } else {
            alert('Hata: ' + response.message);
          }
        },
        error: (error: any) => {
          console.error('Error unenrolling from course:', error);
          alert('Kurstan çıkarken bir hata oluştu!');
        }
      });
    }
  }

  // Comment ekleme fonksiyonu
  addComment(courseId: number, comment: string): void {
    if (!comment || comment.trim() === '') {
      alert('Lütfen bir yorum yazın!');
      return;
    }

    this.apiService.addComment(courseId, comment.trim()).subscribe({
      next: (response: any) => {
        if (response.success) {
          alert('Yorumunuz başarıyla eklendi!');
          // Comment input'unu temizle
          this.commentTexts[courseId] = '';
        } else {
          alert('Yorum eklenirken bir hata oluştu!');
        }
      },
      error: (error: any) => {
        console.error('Error adding comment:', error);
        alert('Yorum eklenirken bir hata oluştu!');
      }
    });
  }

  // Kurs detaylarını görme fonksiyonu
  viewCourseDetails(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }
}
