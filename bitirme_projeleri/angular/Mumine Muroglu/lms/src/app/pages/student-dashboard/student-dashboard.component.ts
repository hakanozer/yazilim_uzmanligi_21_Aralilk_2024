import { Component } from '@angular/core';
import { IUser } from '../../models/IUser';
import { ICourse } from '../../models/ICourses';
import { AuthService } from '../../services/auth.service';
import { EnrollmentsService } from '../../services/enrollments.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';

@Component({
  selector: 'app-student-dashboard',
  imports: [RouterLink, FormsModule,UserProfileComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {
  user: IUser | null = null;
  enrolledCourses: ICourse[] = [];
  role: string | null = localStorage.getItem('userRole');

  constructor(private authService: AuthService,private enrollmentsService: EnrollmentsService) {

  const userId = localStorage.getItem('userId');

  if (userId) {
    // Kullanıcı bilgilerini çek
    this.authService.userProfileSync().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: () => console.error('Kullanıcı bilgisi alınamadı')
    });

    // Kayıtlı kursları çek
    this.enrollmentsService.getCoursesByStudentId(userId).subscribe({
      next: (value) => {
        this.enrolledCourses = value;
      },
      error: (err) => {
        console.error("Kurslar alınamadı:", err);
      }
    });
  } else {
    console.error("Geçersiz kullanıcı ID");
  }
}

 
}