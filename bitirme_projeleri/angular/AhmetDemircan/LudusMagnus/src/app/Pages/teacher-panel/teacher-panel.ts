import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TeacherGuard } from '../../guards/teacher.guard';
import { Api } from '../../services/api';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../../models/IUser';
import { ICourses } from '../../models/Icourses';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-panel',
  imports: [RouterLink, CommonModule],
  templateUrl: './teacher-panel.html',
  styleUrl: './teacher-panel.css'
})
export class TeacherPanel implements OnInit {

  InstructorRole = false;
  myCourses: ICourses[] = [];
  isLoading = false;
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);

  constructor(
    private router: Router,
    private teacherGuard: TeacherGuard,
    private cd: ChangeDetectorRef,
    private api: Api,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.AllownavigateToCourses();
    this.loadMyCourses();
  }

  AllownavigateToCourses() {
    if (this.teacherGuard.teacherOrAdminRole) {
      this.InstructorRole = true
      this.cd.detectChanges();
      console.log('Admin veya teacher rolüne sahip')
    } else {
      this.router.navigate(['/unauthorized']);
    }
  }
    // Mevcut kullanıcıyı getir
    getCurrentUser(): IUser | null {
      return this.currentUserSubject.value;
    }

  // Tarafınca oluşturulan kurslar
  getMyCourses() {
    return this.api.getCursusByCreator(this.authService.getCurrentUser()?.id?.toString() || '0');
  }

  // Kursları yükle
  loadMyCourses() {
    this.isLoading = true;
    this.getMyCourses().subscribe({
      next: (courses) => {
        this.myCourses = courses;
        this.isLoading = false;
        this.cd.detectChanges();
        console.log('Eğitmen kursları yüklendi:', courses);
      },
      error: (error) => {
        console.error('Kurslar yüklenirken hata oluştu:', error);
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  // Kursa git
  navigateToCourse(courseId: string) {
    this.router.navigate(['/course-details', courseId]);
  }

  // Kurs düzenle
  editCourse(courseId: string) {
    // Kurs düzenleme sayfasına yönlendir (henüz mevcut değilse oluşturulabilir)
    console.log('Kurs düzenleme:', courseId);//Kurs yakalandı, düzenleme sayfasına yönlendir ve sabah uyanınca bu sayfayı app.routs a eklemeyi unutma yoksa yönlendirmez ve gurad metodu techer olacak ;)
    this.router.navigate(['/edit-course', courseId]);
  }
}
