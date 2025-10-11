import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api } from '../../services/api';
import { IUser } from '../../models/IUser';
import { IEnrollment } from '../../models/IEnrollment';
import { Course } from '../../models/ICourse';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './student.html',
  styleUrls: ['./student.css']
})
export class Student implements OnInit {
  user: IUser | null = null;
  userForm: FormGroup;
  enrollments: IEnrollment[] = [];
  courses: Course[] = [];

  constructor(
    private api: Api,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    const userId = Number(localStorage.getItem("userId") || 0)
    if (userId) {
      this.loadUser(userId);
      this.loadEnrollments(userId)
    }
  }

  loadUser(id: number) {
    this.api.userProfile(id).subscribe({
      next: (u) => {
        this.user = u;
        this.userForm.patchValue(u)
        this.cdr.detectChanges()
      }
    });
  }

  updateUser() {
    if (!this.user) return;
    const updatedUser: IUser = {
      ...this.user,
      ...this.userForm.value
    };

    this.api.updateUser(this.user.id, updatedUser).subscribe({
      next: () => {
        alert("Profil bilgileri güncellendi!")
        this.user = updatedUser;
      }
    });
  }

  loadEnrollments(userId: number) {
    this.api.getEnrollmentsByUser(userId).subscribe({
      next: (enrolls) => {
        this.enrollments = enrolls
        // her enrollment için kurs bilgisi çek
        this.enrollments.forEach(en => {
          this.api.getCourseById(en.courseId).subscribe({
            next: (c) => { this.courses.push(c); this.cdr.detectChanges() 

            }
          })
        })
      }
    })
  }

  selectCourse: Course | null = null
selectEnrollment: IEnrollment | null = null

fncSelectCourse(course: Course) {
  this.selectCourse = course;
  const userId = Number(localStorage.getItem('userId'));

  this.api.getEnrollmentsByUser(userId).subscribe(enrollments => {
    this.selectEnrollment = enrollments.find(e => e.courseId === course.id) || null
    this.cdr.detectChanges(); // template güncellenmesi için
  })
}

}
