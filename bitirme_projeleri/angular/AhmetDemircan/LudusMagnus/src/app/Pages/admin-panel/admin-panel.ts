import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IUser } from '../../models/IUser';
import { ICourses} from '../../models/Icourses';
import { IComment } from '../../models/IComment';
import { IEnroll } from '../../models/IEnroll';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs'; //Angular'da birden fazla asenkron işlemi aynı anda başlatıp, tüm işlemlerin tamamlanmasını bekledikten sonra sonuçlarını tek bir grup olarak işlemek için kullanılan bir RxJS operatörüdür.

@Component({
  selector: 'app-admin-panel',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanel implements OnInit {

  isLoading = false;
  allUsers: IUser[] = [];
  allCourses: ICourses[] = [];
  allComments: IComment[] = [];
  allEnrollments: IEnroll[] = [];
  
  // İstatistikler
  totalUsers = 0;
  totalStudents = 0;
  totalTeachers = 0;
  totalCourses = 0;
  totalRevenue = 0;
  courseStats: any[] = [];
  topInstructors: any[] = [];
  
  // Seçili kullanıcı ve kurs
  selectedUser: IUser | null = null;
  selectedCourse: ICourses | null = null;
  
  // Active tab
  activeTab = 'users';
  
  // Filtrelenen kullanıcılar (geçerli yönetici hariç filterler)
  filteredUsers: IUser[] = [];
  
  // Teachers yönetimi
  allTeachers: IUser[] = [];
  filteredTeachers: IUser[] = [];
  teacherSearchTerm = '';
  teacherStatusFilter = 'all'; // 'all', 'active', 'inactive'

  constructor(
    private router: Router, 
    private api: Api, 
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Admin yetkisi kontrolü
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/unauthorized']);
      return;
    }
    
    this.loadAllData();
  }

  // tüm datayı alır
  loadAllData(): void {
    this.isLoading = true;
    
    forkJoin({ //birden fazla asenkron işlemi aynı anda başlatıp, tüm işlemlerin tamamlanmasını bekledikten sonra sonuçlarını tek bir grup olarak işlemek için kullanılan bir RxJS operatörü.
      users: this.api.getUsers(),
      courses: this.api.getCourses(),
      comments: this.api.getAllComments(),
      enrollments: this.api.getEnrollments()
    }).subscribe({
      next: (data) => {
        this.allUsers = this.sanitizeUserPasswords(data.users);
        this.filterUsersForAdmin();
        this.loadTeachers();
        this.allCourses = data.courses;
        this.allComments = data.comments;
        this.allEnrollments = data.enrollments;
        
        this.calculateStatistics();
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.isLoading = false;
      }
    });
  }

  // admin hariç datayaı filtereleyen fonksiyon
  filterUsersForAdmin(): void {
    const currentUser = this.authService.getCurrentUser();
    this.filteredUsers = this.allUsers.filter(user => 
      !(currentUser && user.id === currentUser.id && user.role === 'admin')
    );
  }

  // öğretmenler kısmını yükler
  loadTeachers(): void {
    this.allTeachers = this.allUsers.filter(user => user.role === 'teacher');
    this.filterTeachers();
  }

  // öğretmenleri raytinge göre filtreler
  filterTeachers(): void {
    let filtered = this.allTeachers;
    
    // öğretmenlerde arama yapar
    if (this.teacherSearchTerm) {
      const searchTerm = this.teacherSearchTerm.toLowerCase();
      filtered = filtered.filter(teacher => 
        teacher.name.toLowerCase().includes(searchTerm) ||
        teacher.email.toLowerCase().includes(searchTerm)
      );
    }
    
    // satatü filtresi
    if (this.teacherStatusFilter !== 'all') {
      const isActive = this.teacherStatusFilter === 'active';
      filtered = filtered.filter(teacher => teacher.isActive === isActive);
    }
    
    this.filteredTeachers = filtered;
  }

  // öğretmen ara
  onTeacherSearch(): void {
    this.filterTeachers();
  }

  // öğretenleri statüye göre çek
  onTeacherStatusFilter(): void {
    this.filterTeachers();
  }

  // Öğretmen durumunu değiştir
  toggleTeacherStatus(teacherId: string): void {
    const teacher = this.allTeachers.find(t => t.id === teacherId);
    if (teacher) {
      teacher.isActive = !teacher.isActive;
      this.api.updateUser(teacherId, teacher).subscribe({
        next: () => {
          console.log('Teacher status updated successfully');
          this.filterTeachers();
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Error updating teacher status:', err);
          // Hata durumunda değişikliği geri al
          teacher.isActive = !teacher.isActive;
        }
      });
    }
  }

  // Güvenlik için kullanıcı parolalarını temizle
  sanitizeUserPasswords(users: IUser[]): IUser[] {
    return users.map(user => ({
      ...user,
      password: '***********' // şifreyi admin dahi göremez
    }));
  }

  // İstatistikleri hesapla
  calculateStatistics(): void {
    // Kullanıcı istatistikleri
    this.totalUsers = this.allUsers.length;
    this.totalStudents = this.allUsers.filter(u => u.role === 'student').length;
    this.totalTeachers = this.allUsers.filter(u => u.role === 'teacher').length;
    
    // Kurs istatistikleri
    this.totalCourses = this.allCourses.length;
    this.totalRevenue = this.allCourses.reduce((sum, course) => 
      sum + (course.price * course.enrolledStudents), 0);
    
    // Kurs başına öğrenci sayısı
    this.courseStats = this.allCourses.map(course => ({
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      enrolledStudents: course.enrolledStudents,
      price: course.price,
      revenue: course.price * course.enrolledStudents,
      rating: course.rating
    }));
    
    // En beğenilen eğitmenler (rating'e göre)
    this.calculateTopInstructors();
  }

  // En beğenilen eğitmenleri hesapla
  calculateTopInstructors(): void {
    const instructorStats = new Map();
    
    this.allCourses.forEach(course => {
      if (!instructorStats.has(course.instructor)) {
        instructorStats.set(course.instructor, {
          name: course.instructor,
          totalCourses: 0,
          totalStudents: 0,
          totalRevenue: 0,
          averageRating: 0,
          ratings: []
        });
      }
      
      const stats = instructorStats.get(course.instructor);
      stats.totalCourses++;
      stats.totalStudents += course.enrolledStudents;
      stats.totalRevenue += course.price * course.enrolledStudents;
      stats.ratings.push(course.rating);
    });
    
    // Ortalama rating hesapla ve sırala
    this.topInstructors = Array.from(instructorStats.values())
      .map(instructor => ({
        ...instructor,
        averageRating: instructor.ratings.reduce((a: number, b: number) => a + b, 0) / instructor.ratings.length
      }))
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5); // Top 5 eğitmen
  }

  // Tüm kullanıcıları admine göster
  getAllUsers(): void {
    this.api.getUsers().subscribe({
      next: (users) => {
        this.allUsers = this.sanitizeUserPasswords(users);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Kullanıcı verileri alınırken bir hata oluştu:', err);
      }
    });
  }

  // Seçilen kullanıcıyı ve verilerini sil
  DeleteUser(userId: string): void {
    if (!userId) return;
    
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      this.api.deleteUser(userId).subscribe({
        next: () => {
          this.allUsers = this.allUsers.filter(u => u.id !== userId);
          this.calculateStatistics();
          console.log('Kullanıcı başarıyla silindi');
          this.cd.detectChanges
        },
        error: (err) => {
          console.error('Kullanıcı silinirken hata oluştu:', err);
        }
      });
    }
  }

  // Seçilen kullanıcıyı düzenle
  EditUser(user: IUser): void {
    this.selectedUser = { ...user };
    // Modal veya edit form açılabilir
  }

  // Kullanıcı güncelleme
   updateUser(updatedUser: IUser): void {
     if (!updatedUser.id) return;
     this.api.updateUser(updatedUser.id, updatedUser).subscribe({
      next: (user) => {
        const index = this.allUsers.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.allUsers[index] = this.sanitizeUserPasswords([user])[0];
        }
        this.selectedUser = null;
        this.calculateStatistics();
      },
      error: (err) => {
        console.error('Kullanıcı güncellenirken hata oluştu:', err);
      }
    });
  }

  // Seçilen öğretmene ait kursları düzenle, sil
  EditCourse(course: ICourses): void {
    this.selectedCourse = { ...course };
    // Kurs düzenleme sayfasına yönlendir
    this.router.navigate(['/edit-course', course.id]);
  }

  // Kurs silme
  deleteCourse(courseId: string): void {
    if (!courseId) return;
    
    if (confirm('Bu kursu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      this.api.deleteCursus(courseId).subscribe({
        next: () => {
          this.allCourses = this.allCourses.filter(c => c.id !== courseId);
          this.calculateStatistics();
          console.log('Kurs başarıyla silindi');
          this.cd.detectChanges
        },
        error: (err: any) => {
           console.error('Kurs silinirken hata oluştu:', err);
        }
      });
    }
  }



  // Kullanıcı rolünü değiştir admin hariç
     changeUserRole(userId: string, newRole: 'admin' | 'teacher' | 'student' ): void {
       // Prevent admin role assignment
       if (newRole === 'admin') {
         console.error('Cannot assign admin role');
         return;
       }
       
       const user = this.allUsers.find(u => u.id === userId);
       if (user) {
         user.role = newRole;
         this.updateUser(user);
         this.filterUsersForAdmin(); // Refresh filtered list
         this.loadTeachers(); // Refresh teachers list if role changed
       }
     }

    // Kullanıcı rolünü güncelle (HTML'den çağrılır)
      updateUserRole(userId: string, newRole: string): void {
        this.changeUserRole(userId, newRole as 'admin' | 'teacher' | 'student' );
      }

     // Rol değişikliği olay işleyicisi
      onRoleChange(event: Event, userId: string): void {
        const target = event.target as HTMLSelectElement;
        if (target && target.value) {
          this.changeUserRole(userId, target.value as 'admin' | 'teacher' | 'student' );
        }
      }

  // Kurs durumunu değiştir (aktif/pasif)
   toggleCourseStatus(courseId: string): void {
     const course = this.allCourses.find(c => c.id === courseId);
     if (course) {
       course.isActive = !course.isActive;
       this.api.updateCourses(courseId, course).subscribe({
         next: () => {
           console.log('Kurs durumu güncellendi');
         },
         error: (err: any) => {
            console.error('Kurs durumu güncellenirken hata oluştu:', err);
         }
       });
     }
   }

   // Kurs ID'sine göre kurs bul
   getCourseById(courseId: string): ICourses | undefined {
     return this.allCourses.find(c => c.id === courseId);
   }

   // Kurs ID'sine göre düzenleme
   editCourseById(courseId: string): void {
     const course = this.getCourseById(courseId);
     if (course) {
       this.EditCourse(course);
     }
   }
 }
