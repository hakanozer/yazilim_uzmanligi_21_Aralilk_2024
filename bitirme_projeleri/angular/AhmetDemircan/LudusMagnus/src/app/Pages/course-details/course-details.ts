import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Api } from '../../services/api';
import { ICourses } from '../../models/Icourses';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { IComment, createEmptyComment } from '../../models/IComment';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-course-details',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css'
})
export class CourseDetails implements OnInit {
  details: ICourses = {} as ICourses;
  comments: IComment[] = [];
  courseId: string | null = null;
  isLoading: boolean = true;
  isLoadingComments: boolean = false;
  userId: string | null = null;
  savedCurs: boolean = false;
  
  // Yorum formu için değişkenler
  showCommentForm: boolean = false;
  newComment: IComment = createEmptyComment();
  editingComment: IComment | null = null;
  isSubmittingComment: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private api: Api,
    private cd: ChangeDetectorRef,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    //console.log('Course ID:', this.courseId);
    this.userId = this.authService.getCurrentUser()?.id || null;
    //console.log('User ID:', this.userId);
    this.isSaved();
    
    if (this.courseId) {
      // String ID'yi direkt kullan, number'a çevirmeye gerek yok
      this.loadCourseDetails(this.courseId);
      this.loadComments(this.courseId);
    }
  }

  // loadCourseDetails metodunu da güncelleyelim
  loadCourseDetails(id: string): void {
    //this.isLoading = true;
    this.api.getCoursesById(id).subscribe({
      next: (course) => {
        this.details = course;
        this.isLoading = false;
        this.cd.detectChanges();
        console.log('Kurs detayları yüklendi:', course);
      },
      error: (error) => {
        console.error('Kurs detayları yüklenirken hata oluştu:', error);
        this.isLoading = false;
        this.cd.detectChanges();
      },
      complete: () => {
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  loadComments(courseId: string): void {
    this.isLoadingComments = true;
    this.api.getCommentsByCourseId(courseId).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.isLoadingComments = false;
        this.cd.detectChanges();
        console.log('Yorumlar yüklendi:', comments);
      },
      error: (error) => {
        console.error('Yorumlar yüklenirken hata oluştu:', error);
        this.isLoadingComments = false;
        this.cd.detectChanges();
      }
    });
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0); // 5 elemanlı bir boş dizi ilk başta tanımlanmamış elemanları vardır.
  }// fill metodu ile 0'ları doldurduk ve map ile elemanları dizide bulunduğu konum ile gelen değer karşılaştırılır eğer değer 0. eleman ile kıyaslanır ise 
  // gelen değer 1 olsun 0. eleman doldurulur gibi...

  save(): void {
    //console.log('Kurs ID:', this.courseId);
    //console.log('user ID:', this.userId);
  if(this.savedCurs){
    const confirmDelete = confirm('Are you sure you want to delete this course from your saved list?');
    if(confirmDelete){
      //console.log('Kurs silindi:', this.courseId);
      this.api.removeCourse(this.userId!, this.courseId!).subscribe({
        next: (response) => {
          //console.log('Kurs silindi:', response);
          this.savedCurs = false;
          this.cd.detectChanges();
        },
        error: (error) => {
          console.error('Kurs silinirken hata oluştu:', error);
        }
      });
    }else{
      console.log('Kurs silme işlemi iptal edildi');
    }
  }
    else if (this.courseId && this.userId) {
      this.api.saveCourse(this.userId, this.courseId).subscribe({
        next: (response) => {
          console.log('Kurs kaydedildi:', response);
          this.savedCurs = true;
          this.cd.detectChanges();
          // Kaydetme işlemi başarılı, kullanıcıya bildirim gösterilebilir
          alert('curs saved!');
        },
        error: (error) => {
          console.error('Kurs kaydedilirken hata oluştu:', error);
          // Kaydetme işlemi başarısız, kullanıcıya hata bildirimi gösterilebilir
          alert('curs save failed!');
          this.cd.detectChanges();
        }
      });
    } else {
      console.error('Kurs ID veya Kullanıcı ID eksik');
      alert('Please login!');
      this.cd.detectChanges();
    }
  }

  //save control kurs giriş yapmış kullanıcının savedcurs kısmında kyıtlı mı?
  isSaved(): void {
    if (this.userId) {
      this.api.getUser(this.userId).subscribe({
        next: (user) => {
          console.log('User details:', user);
          if (user.savedCourses?.includes(this.courseId!)) {
            this.savedCurs = true;
            //console.log('Kurs zaten kaydedilmiş');
            this.cd.detectChanges();
          } else {
            this.savedCurs = false;
            //console.log('Kurs kaydedilmemiş');
          }
        }
      })
    }
  }

  // Yorum formu göster/gizle
  toggleCommentForm(): void {
    if (!this.authService.isLoggedIn()) {
      alert('You must be logged in to comment!');
      return;
    }
    this.showCommentForm = !this.showCommentForm;
    if (this.showCommentForm) {
      this.resetCommentForm();
    }
  }

  // Yorum formu sıfırla
  resetCommentForm(): void {
    this.newComment = createEmptyComment();
    this.newComment.courseId = this.courseId!;
    this.newComment.userId = this.userId!;
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.newComment.userName = currentUser.name;
      this.newComment.userEmail = currentUser.email;
    }
    this.editingComment = null;
  }

  // Yorum ekle
  submitComment(): void {
    if (!this.newComment.comment.trim() || this.newComment.rating < 1 || this.newComment.rating > 5) {
      alert('Please enter a valid comment and rating (1-5)!');
      return;
    }

    this.isSubmittingComment = true;
    
    if (this.editingComment) {
      // Düzenleme modu
      this.api.updateComment(this.editingComment.id, this.newComment).subscribe({
        next: (updatedComment) => {
          const index = this.comments.findIndex(c => c.id === updatedComment.id);
          if (index !== -1) {
            this.comments[index] = updatedComment;
          }
          this.resetCommentForm();
          this.showCommentForm = false;
          this.isSubmittingComment = false;
          this.cd.detectChanges();
          alert('Your comment has been updated successfully!');
        },
        error: (error) => {
          console.error('Yorum güncellenirken hata oluştu:', error);
          this.isSubmittingComment = false;
          alert('An error occurred while updating the comment!');
        }
      });
    } else {
      // Yeni yorum ekleme
      const commentToAdd = {
        courseId: this.newComment.courseId,
        userId: this.newComment.userId,
        userName: this.newComment.userName,
        userEmail: this.newComment.userEmail,
        rating: this.newComment.rating,
        comment: this.newComment.comment,
        createdAt: new Date().toISOString(),
        isApproved: true
      };
      
      this.api.addComment(commentToAdd as IComment).subscribe({
        next: (addedComment) => {
          this.comments.push(addedComment);
          this.resetCommentForm();
          this.showCommentForm = false;
          this.isSubmittingComment = false;
          this.cd.detectChanges();
          alert('Your comment has been added successfully!');
        },
        error: (error) => {
          console.error('Yorum eklenirken hata oluştu:', error);
          this.isSubmittingComment = false;
          alert('An error occurred while adding a comment!');
        }
      });
    }
  }

  // Yorum düzenle
  editComment(comment: IComment): void {
    this.editingComment = comment;
    this.newComment = { ...comment };
    this.showCommentForm = true;
    this.cd.detectChanges();
  }

  // Yorum sil
  deleteComment(comment: IComment): void {
    if (confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      this.api.deleteComment(comment.id).subscribe({
        next: () => {
          this.comments = this.comments.filter(c => c.id !== comment.id);
          this.cd.detectChanges();
          alert('Comment deleted successfully!');
        },
        error: (error) => {
          console.error('Yorum silinirken hata oluştu:', error);
          alert('An error occurred while deleting the comment!');
        }
      });
    }
  }

  // Kullanıcının kendi yorumu mu kontrol et
  isUserComment(comment: IComment): boolean {
    return this.userId === comment.userId;
  }

  // Yorum düzenleme iptal et
  cancelEdit(): void {
    this.resetCommentForm();
    this.showCommentForm = false;
  }
}
