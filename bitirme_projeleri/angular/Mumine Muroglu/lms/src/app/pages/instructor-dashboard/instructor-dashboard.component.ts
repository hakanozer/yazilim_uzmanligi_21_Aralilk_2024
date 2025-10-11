import { Component } from '@angular/core';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { ICourse } from '../../models/ICourses';
import { CoursesService } from '../../services/courses.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [UserProfileComponent, RouterLink, FormsModule],
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent {
  instructorId: string = localStorage.getItem('userId') ?? ''; // 🔹 merkezi ID alma
  coursesArr: ICourse[] = [];
  showDropdown = false;
  newCourseTitle = '';
  newCourseDescription = '';

constructor(private coursesService: CoursesService) {
    this.loadCourses();
  }

  loadCourses() {
    this.coursesService.getCourserByInstructor(this.instructorId).subscribe({
      next: (value) => {
        this.coursesArr = value;
        console.log('Kurslar:', value);
      },
      error: (err) => {
        console.error('Kurslar alınamadı:', err);
      }
    });
  }

  addCourse() {
  if (!this.newCourseTitle.trim()) return;

  const newCourse: Omit<ICourse, 'id'> = {   // id yok, JSON-server atıyor
    instructorId: this.instructorId,
    title: this.newCourseTitle,
    description: this.newCourseDescription,
    lessons: []
  };

  this.coursesService.addCourse(newCourse).subscribe({
    next: (createdCourse) => {
      this.coursesArr.push(createdCourse); 
      this.newCourseTitle = '';
      this.newCourseDescription = '';
      this.showDropdown = false;
    },
    error: (err) => console.error('Kurs eklenirken hata oluştu:', err)
  });
}
 deleteCourse(courseId: string) {
    if (!confirm('Bu kursu silmek istediğinize emin misiniz?')) return;

    this.coursesService.deleteCourse(courseId).subscribe({
      next: () => {
        this.coursesArr = this.coursesArr.filter(course => course.id !== courseId);
      },
      error: (err) => console.error('Kurs silinirken hata oluştu:', err)
    });
  } 

}
