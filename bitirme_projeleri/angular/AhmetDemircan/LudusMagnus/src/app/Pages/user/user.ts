import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { IUser } from '../../models/IUser';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ICourses } from '../../models/Icourses';
import { ValidationUtils } from '../../Utils/validEmailPassword'; // ValidationUtils import edildi



@Component({
  selector: 'app-user',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User implements OnInit {
  activeSection: string = 'profile';
  currentUser: IUser | null = null;
  isLoading: boolean = true;
  cursusList: ICourses[] = [];
  savedCourses: ICourses[] = []; // Kaydedilmiş kursların detayları

  constructor(private api: Api, public authService: AuthService, private cd: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.isLoading = true;
    const user = this.authService.getCurrentUser();
    
    if (user && user.id) {
      // API'den güncel kullanıcı bilgilerini çek - string ID kullan
      this.api.getUser(user.id).subscribe({ // + operatörünü kaldırdık
        next: (userData) => {
          this.currentUser = userData;
          this.loadSavedCourses();
          this.isLoading = false;
          console.log('Kullanıcı bilgileri yüklendi:', userData);
          this.cd.detectChanges();
        },
        error: (error) => {
          console.error('Kullanıcı bilgileri yüklenirken hata:', error);
          this.currentUser = user;
          this.isLoading = false;
        }
      });
    } else {
      console.error('Kullanıcı giriş yapmamış');
      this.isLoading = false;
      this.router.navigate(['/unauthorized']);
    }
  }

  // Kaydedilmiş kursların detaylarını yükle
  loadSavedCourses(): void {
    if (this.currentUser?.savedCourses && this.currentUser.savedCourses.length > 0) {
      this.savedCourses = [];
      
      // Her kurs ID'si için kurs detaylarını çek
      this.currentUser.savedCourses.forEach(courseId => {
        this.api.getCoursesById(courseId).subscribe({
          next: (course) => {
            this.savedCourses.push(course);
            this.cd.detectChanges();
          },
          error: (error) => {
            console.error(`Kurs ${courseId} yüklenirken hata:`, error);
          }
        });
      });
    }
  }

  // Kurs detay sayfasına git
  navigateToCourseDetail(courseId: string): void {
    this.router.navigate(['/course-details', courseId]);
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  // Form işlemleri için metodlar
  updateProfile(formData: any): void {
    if (this.currentUser && this.currentUser.id) {
      const updatedUser = { ...this.currentUser, ...formData };
      
      this.api.updateUser(this.currentUser.id.toString(), updatedUser).subscribe({
        next: (response) => {
          this.currentUser = response;
          console.log('Profile Update Succeed:', response);
          this.cd.detectChanges();
          alert('Profile updated successfully!');
        },
        error: (error) => {
          console.error('Error occurred during update:', error);
          alert('Profile update failed!');
        }
      });
    }
  }

  changePassword(currentPassword: string, newPassword: string): void {
    // Şifre değiştirme işlemi
    if (!this.currentUser || !this.currentUser.id) {
      alert('User information not found!');
      this.router.navigate(['/not-found']);
      return;
    }
  
    // Mevcut şifrenin doğruluğunu kontrol et
    if (this.currentUser.password !== currentPassword) {
      alert('Current password is incorrect!');
      return;
    }
  
    // Yeni şifre validasyonu ValidationUtils ile merkezi validasyon ile kontrol edildi bu sayede validasyon değişir ise daha kolay değişimi yapılacak.
    const passwordValidation = ValidationUtils.validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      alert(passwordValidation.message);
      return;
    }
  
    // Kullanıcı nesnesini güncelle
    const updatedUser: IUser = {
      ...this.currentUser,//Yeni öğrenim "..."
      password: newPassword
    };
  
    // API'ye güncelleme isteği gönder
    this.api.updateUser(this.currentUser.id, updatedUser).subscribe({
      next: (response) => {
        console.log('Password updated successfully:', response);
        // Mevcut kullanıcı bilgilerini güncelle
        this.currentUser = response;
        // AuthService'deki kullanıcı bilgilerini de güncelle
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(response));
        }
        alert(`Password updated successfully! ${passwordValidation.message}`);
      },
      error: (error) => {
        console.error('Error occurred during password update:', error);
        alert('An error occurred while updating your password!');
      }
    });
  }

  updatePrivacySettings(settings: any): void {
    // Gizlilik ayarları güncelleme
    console.log('Gizlilik ayarları:', settings);
    alert('Privacy settings updated!');
  }

  updateNotificationSettings(settings: any): void {
    // Bildirim ayarları güncelleme
    console.log('Bildirim ayarları:', settings);
    alert('Notification settings updated!');
  }

  getUserInitial(): string {
    if (this.currentUser?.name) {
      return this.currentUser.name.charAt(0).toUpperCase();
    }
    return 'U';
  }

  getUserName(): string {
    return this.currentUser?.name || 'User';
  }

  getUserEmail(): string {
    return this.currentUser?.email || 'user@example.com';
  }

  // Kullanıcının öğretmen veya admin olup olmadığını kontrol et
  isTeacherOrAdmin(): boolean {
    return this.currentUser?.role === 'teacher' || this.currentUser?.role === 'admin';
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  isTeacher(): boolean {
    return this.currentUser?.role === 'teacher';
  }

  // Teacher panel'e yönlendir
  navigateToTeacherPanel(): void {
    this.router.navigate(['/teacher-panel']);
  }

  navigateToAdminPanel(): void {
    this.router.navigate(['/admin-panel']);
  }

  // Kullanıcı profil silme işlemi
  deleteProfile(): void {
    if (!this.currentUser || !this.currentUser.id) {
      alert('User information not found!');
      return;
    }
  
    // Admin kontrolü
    if (this.currentUser.role === 'admin') {
      this.router.navigate(['/unauthorized']);
      return;
    }
  
    // Kullanıcıya uyarı göster
    const confirmDelete = confirm('Danger you about to delete your profile. Are you sure?');
    if (!confirmDelete) {
      return;
    }
  
    // Teacher için kurs kontrolü
    if (this.currentUser.role === 'teacher') {
      this.api.getCursusByCreator(this.currentUser.id).subscribe({
        next: (courses) => {
          if (courses && courses.length > 0) {
            alert('Please fulfill your lessons first');
            return;
          } else {
            this.performDeleteProfile();
          }
        },
        error: (error) => {
          console.error('Kurs kontrolü sırasında hata:', error);
          alert('An error occurred while checking your courses!');
        }
      });
    } else if (this.currentUser.role === 'student') {
      // Student için direkt sil
      this.performDeleteProfile();
    }
  }

  // Profil silme işlemini gerçekleştir
  private performDeleteProfile(): void {
    if (!this.currentUser || !this.currentUser.id) return;
  
    this.api.deleteUser(this.currentUser.id).subscribe({
      next: () => {
        alert('Your profile has been successfully deleted!');
        this.authService.logout();
        this.router.navigate(['/']);
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Profil silme hatası:', error);
        alert('An error occurred while deleting your profile!');
      }
    });
  }
}
