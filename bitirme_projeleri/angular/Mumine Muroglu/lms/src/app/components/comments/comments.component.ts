import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IComment } from '../../models/IComment';
import { CommentsService } from '../../services/comments.service';
import { IUser } from '../../models/IUser';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comments',
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class CommentsComponent implements OnInit {
     
  @Input() courseId!: string;  // parent (course-detail) sayfasından alınacak

  commentsArr: IComment[] = [];
  newComment: string = '';
  role: string | null = null;
  users: IUser[] = [];  // Kullanıcı isimlerini tutacak

  constructor(
    private commentsService: CommentsService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('userRole');

    // Tüm kullanıcıları çek
    this.authService.getAllUsers().subscribe(users => {
      this.users = users;

      // Yorumları yükle
      if (this.courseId) this.loadComments();
    });
  }

  getUserName(userId: string): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  }


  loadComments(): void {
  this.commentsService.getCommentsByCourse(this.courseId).subscribe({
    next: (comments) => {
      this.commentsArr = comments.map(comment => ({
        ...comment,
        
        authorName: this.getUserName(comment.userId) // Yorum nesnesine 'authorName' ekleniyor
      }));
      
      this.cdr.detectChanges();
    },
    error: (error) => console.error('Yorumlar alınamadı', error)
  });
}

  

  addComment(): void {
  const userId = localStorage.getItem('userId') ?? '';
  if (!this.newComment.trim() || !this.courseId) return;

  const now = new Date().toISOString(); // tarih

  const commentData: Omit<IComment, 'id'> = {
    courseId: this.courseId,
    userId,
    text: this.newComment,
    date: now // JSON Server’a da gönderiyoruz
  };

  this.commentsService.addComment(commentData).subscribe({
    next: (created) => {
      const newCommentWithAuthor = {
        ...created,
        authorName: this.getUserName(created.userId)
      };

      this.commentsArr.push(newCommentWithAuthor);
      this.newComment = '';
      this.cdr.detectChanges();
    },
    error: (err) => console.error('Yorum eklenemedi:', err)
  });
}


}
