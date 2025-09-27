import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Api } from '../../services/api';
import { IEnroll } from '../../models/IEnroll';  
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/IUser';
import { ICourses } from '../../models/Icourses';
import { forkJoin, of } from 'rxjs'; 

@Component({
  selector: 'app-enroll-Course',
  imports: [RouterModule, CommonModule],
  templateUrl: './enroll-Course.html',
  styleUrl: './enroll-Course.css'
})
export class EnrollCourse implements OnInit {
  courseId: string | null = null;
  selectedCourse: ICourses | null = null;
  currentUser: IUser | null = null;
  isAlreadyEnrolled: boolean = false;
  isLoading: boolean = false;
  enrollmentMessage: string = '';
  isEnrolling: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: Api,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // URL'den kurs ID'sini al
    this.courseId = this.route.snapshot.paramMap.get('id');
    
    if (!this.courseId) {
      this.enrollmentMessage = 'Invalid course ID!';
      return;
    }

    // Kullanıcı giriş kontrolü
    if (this.authService.isLoggedIn()) {
      this.currentUser = this.authService.getCurrentUser();
      this.loadCourseAndCheckEnrollment();
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Kurs bilgilerini yükle ve kayıt durumunu kontrol et
  loadCourseAndCheckEnrollment(): void {
    this.isLoading = true;
    
    forkJoin({
      course: this.api.getCoursesById(this.courseId!),
      enrollments: this.currentUser?.id ? this.api.getUserEnrollments(this.currentUser.id) : of([]) // .toString() kaldırıldı
    }).subscribe({
      next: (data) => {
        this.selectedCourse = data.course;
        
        // Kullanıcının bu kursa kayıtlı olup olmadığını kontrol et
        this.isAlreadyEnrolled = data.enrollments.some(
          (enrollment: IEnroll) => enrollment.courseId === this.courseId
        );
        
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Veri yüklenirken hata oluştu:', error);
        this.enrollmentMessage = 'Error occured during loading course data';
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  // Kursa kayıt ol
  enrollToCourse(): void {
    if (!this.currentUser || !this.currentUser.id) {
      this.enrollmentMessage = 'User information not found!';
      return;
    }
  
    this.isEnrolling = true;
    this.enrollmentMessage = '';
  
    // Yeni kayıt objesi oluştur
    const newEnrollment: IEnroll = {
      id: Date.now().toString(), // Basit ID üretimi
      userId: this.currentUser.id, // .toString() kaldırıldı
      courseId: this.courseId!, 
      enrolledAt: new Date().toISOString()
    };
  
    // Kayıt işlemini gerçekleştir
    this.api.addEnrollment(newEnrollment).subscribe({
      next: (enrollment) => {
        console.log('Kayıt başarılı:', enrollment);
        this.isAlreadyEnrolled = true;
        this.enrollmentMessage = 'Successfully enrolled to the course!';
        this.isEnrolling = false;
        
        // Kullanıcının courseIds listesini güncelle (opsiyonel)
        // enrollToCourse metodu iptal edildi
        // this.updateUserCourseIds();
        
        // Ve updateUserCourseIds metodunun tamamını silin (120-142. satırlar)
        this.updateUserCourseIds();
        
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Kayıt işlemi başarısız:', error);
        this.enrollmentMessage = 'Error occured during enrollment to the course.';
        this.isEnrolling = false;
        this.cd.detectChanges();
      }
    });
  }

  // Kullanıcının courseIds listesini güncelle (opsiyonel)
  private updateUserCourseIds(): void {
    if (!this.currentUser || !this.currentUser.id || !this.courseId) {
      return;
    }
  
    // Kullanıcının mevcut kurs ID'lerini al
    const currentCourseIds = this.currentUser.courseIds || [];
    
    // Yeni kurs ID'sini ekle (eğer zaten yoksa)
    if (!currentCourseIds.includes(this.courseId)) {
      const updatedCourseIds = [...currentCourseIds, this.courseId];
      
      const updatedUser: IUser = {
        ...this.currentUser,
        courseIds: updatedCourseIds
      };
  
      // Kullanıcı bilgilerini güncelle
      this.api.updateUser(this.currentUser.id, updatedUser).subscribe({ // .toString() kaldırıldı
        next: (response) => {
          console.log('User course IDs updated:', response);
          this.currentUser = response;
          // localStorage'ı güncelle
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('currentUser', JSON.stringify(response));
          }
        },
        error: (error) => {
          console.error('Error updating user course IDs:', error);
        }
      });
    }
  }

  // Kayıttan çık
  unenrollFromCourse(): void {
    if (!this.currentUser || !this.currentUser.id) {
      this.enrollmentMessage = 'User information not found!';
      return;
    }
  
    this.isEnrolling = true;
    this.enrollmentMessage = '';
  
    // Kullanıcının bu kurstaki kaydını bul
    this.api.getUserEnrollments(this.currentUser.id).subscribe({ // .toString() kaldırıldı
      next: (enrollments) => {
        const enrollment = enrollments.find(e => e.courseId === this.courseId);
        
        if (enrollment) {
          // Kaydı sil
          this.api.removeEnrollment(enrollment.id).subscribe({
            next: () => {
              console.log('Kayıt silindi');
              this.isAlreadyEnrolled = false;
              this.enrollmentMessage = 'Successfully unenrolled from the course!';
              this.isEnrolling = false;
              this.cd.detectChanges();
            },
            error: (error) => {
              console.error('Kayıt silinirken hata:', error);
              this.enrollmentMessage = 'Error occured during unenrolling from the course.';
              this.isEnrolling = false;
              this.cd.detectChanges();
            }
          });
        }
      },
      error: (error) => {
        console.error('Kayıtlar alınırken hata:', error);
        this.isEnrolling = false;
        this.cd.detectChanges();
      }
    });
  }

  // Kurslar sayfasına geri dön
  goBack(): void {
    this.router.navigate(['/Courses']); // Kurslar sayfasına yönlendir
  }
}

  