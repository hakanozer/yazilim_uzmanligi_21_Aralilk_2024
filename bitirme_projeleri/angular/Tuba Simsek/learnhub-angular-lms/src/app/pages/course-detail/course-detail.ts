
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';
import { Course } from '../../models/ICourse';
import { ILesson } from '../../models/ILesson';
import { IComment } from '../../models/IComment';
import { IEnrollment } from '../../models/IEnrollment';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-detail.html',
  styleUrls: ['./course-detail.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CourseDetail implements OnInit {
  commentForm: FormGroup;
  course: Course | null = null;
  lessons: ILesson[] = [];
  comments: IComment[] = [];
  stars: number[] = [];


  constructor(
    private route: ActivatedRoute,
    private api: Api,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(300)]]
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id'])
      if (!Number.isNaN(id) && id > 0) {
        this.loadCourse(id)
        this.loadLessons(id)
        this.loadComments(id)
      } else {
        alert("Not found course: " + params['id'])
        this.router.navigate(['/courses'])
      }
    });
  }

  loadCourse(id: number) {
    this.api.getCourseById(id).subscribe({
      next: (value) => {
        this.course = value
        this.countStars(value.rating)
        this.cdr.detectChanges()
      },
      error: () => {
        alert("Course not found: " + id)
        this.router.navigate(['/courses'])
      }
    });
  }

  loadLessons(courseId: number) {
    this.api.getLessonsByCourse(courseId).subscribe({
      next: (data) => { this.lessons = data; this.cdr.detectChanges(); }
    });
  }

  loadComments(courseId: number) {
    this.api.getCommentsByCourse(courseId).subscribe({
      next: (data) => { this.comments = data; this.cdr.detectChanges(); }
    });
  }

  countStars(rating: number) {
    const arr: number[] = []
    const tamSayi = Math.floor(rating)
    const yarimSayi = Math.ceil(rating - tamSayi)
    const bosSayi = 5 - (tamSayi + yarimSayi)
    for (let i = 0; i < tamSayi; i++) arr.push(1)
    if (yarimSayi > 0) arr.push(0.5)
    for (let i = 0; i < bosSayi; i++) arr.push(0)
    this.stars = arr;
  }

  submitComment() {
    if (!this.course) return;

    const userId = Number(localStorage.getItem('userId') || 0)
    if (!userId) {
      alert("Yorum yapabilmek için giriş yapmalısınız.")
      return;
    }
    
    const user = JSON.parse(localStorage.getItem("user") || "{}")

    const newComment: IComment = {
      id: 0, // json-server otomatik atayacak
      courseId: this.course.id,
      userId: userId,
      text: this.commentForm.value.text,
      date: new Date().toISOString().split('T')[0]
    };

    this.api.addComment(newComment).subscribe({
      next: (comment: any) => {
        this.comments.push(comment as IComment); // sayfaya anında ekle
        this.commentForm.reset()
        this.cdr.detectChanges()
      },
      error: (err) => console.error(err)
    });
  }

 // kursa kayıt ol 
enrollToCourse() {
  if (!this.course) return;

  const userId = Number(localStorage.getItem('userId') || 0);
  if (!userId) {
    alert("Kursa kayıt olabilmek için giriş yapmalısınız.");
    return;
  }

  const newEnrollment: IEnrollment = {
    id: 0, // json-server otomatik atar
    userId: userId,
    courseId: this.course.id,
    date: new Date().toISOString().split('T')[0],
    status: "Devam Ediyor",
    progress: 0
  };

  this.api.addEnrollment(newEnrollment).subscribe({
    next: () => {
      alert("Kursa başarıyla kaydoldunuz!");
    },
    error: (err) => console.error("Enrollment hatası:", err)
  });
}

}
