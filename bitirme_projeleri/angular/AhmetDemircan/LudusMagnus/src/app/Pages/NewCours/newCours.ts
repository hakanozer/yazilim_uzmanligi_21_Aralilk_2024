import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Api } from '../../services/api';
import { ICourses } from '../../models/Icourses';
import { AuthService } from '../../services/auth.service';
import { TeacherGuard } from '../../guards/teacher.guard';

@Component({
  selector: 'app-new-cours',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './newCours.html',
  styleUrl: './newCours.css'
})
export class newCours implements OnInit {
  
  // Form modeli
  formModel = {
    id: '',
    createdById: 0,
    title: '',
    description: '',
    duration: '',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    instructor: '',
    price: 0,
    category: '',
    rating: 0
  };

  isCreating: boolean = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(
    private api: Api,
    private router: Router,
    private authService: AuthService,
    private teacherGuard: TeacherGuard
  ) {}

  ngOnInit(): void {
    // Yetki kontrolü
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && (currentUser.role === 'teacher' || currentUser.role === 'admin')) {
      this.formModel.instructor = currentUser.name;
    }
    else {
      this.router.navigate(['/unauthorized']);
      alert('Only teachers and admins can create courses.');
    }
  }

  // Yeni kurs oluştur
  createNewCourse() {
    if (!this.validateForm()) {
      return;
    }

    this.isCreating = true;
    this.message = '';
    
    const newCourse: Omit<ICourses, 'id'> = {
      title: this.formModel.title,
      createdById: this.authService.getCurrentUser()?.id || '', // number'dan string'e değiştirildi
      description: this.formModel.description,
      duration: this.formModel.duration,
      level: this.formModel.level,
      instructor: this.formModel.instructor,
      price: this.formModel.price,
      category: this.formModel.category,
      rating: this.formModel.rating,
      isActive: true,
      createdAt: new Date().toISOString(),
      enrolledStudents: 0
    };
    
    this.api.addCourse(newCourse as ICourses).subscribe({
      next: (addedCourse: ICourses) => {
        console.log('Yeni kurs oluşturuldu:', addedCourse);
        this.message = 'Course successfully created!';
        this.messageType = 'success';
        this.resetForm();
        this.isCreating = false;
        
        // 2 saniye sonra Course sayfasına yönlendir
        setTimeout(() => {
          this.router.navigate(['/Courses']);
        }, 2000);
      },
      error: (error) => {
        console.error('Yeni kurs oluşturulurken hata oluştu:', error);
        this.message = 'An error occured during createing a course!';
        this.messageType = 'error';
        this.isCreating = false;
      }
    });
  }
  
  // Form doğrulama
  validateForm(): boolean {
    if (!this.formModel.title.trim()) {
      this.message = 'curs title is required!';
      this.messageType = 'error';
      return false;
    }
    if (!this.formModel.description.trim()) {
      this.message = 'curs description is required!';
      this.messageType = 'error';
      return false;
    }
    if (!this.formModel.instructor.trim()) {
      this.message = 'instructor is required!';
      this.messageType = 'error';
      return false;
    }
    if (this.formModel.price < 0) {
      this.message = 'price is required and must be positive!';
      this.messageType = 'error';
      return false;
    }
    return true;
  }
  
  // Form temizle
  resetForm() {
    this.formModel = {
      id: '',
      createdById: 0,
      title: '',
      description: '',
      duration: '',
      level: 'beginner',
      instructor: '',
      price: 0,
      category: '',
      rating: 0
    };
  }

  // Geri dön
  goBack() {
    this.router.navigate(['/cursus']);
  }

  //string instructor name
  //getInstructorName(): string {
  //  return this.authService.getCurrentUser()?.name || 'Unknown';
  //}
}