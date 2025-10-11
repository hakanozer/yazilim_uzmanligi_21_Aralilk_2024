// comments.component.ts
import { Component, inject, input, OnInit, signal } from "@angular/core";
import { CommentService } from "../../services/comment-service";
import { AuthService } from "../../services/auth-service";
import { CommentModel, CommentWithUserModel } from "../../models/Comment";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-comments",
  imports: [CommonModule, FormsModule],
  templateUrl: "./comments.html"
})
export class Comments implements OnInit {
  newComment: string = "" //signals ile ngmodel 2-way bağlantıda sorun olduğu için basit property kullanıldı.
  readonly courseId = input.required<number>();
  readonly isEnrolled = input<boolean>(false);
  readonly commentService = inject(CommentService);
  readonly auth = inject(AuthService);
  readonly comments = signal<CommentWithUserModel[]>([]);
  readonly loading = signal(false);
  readonly adding = signal(false);
  readonly deletingId = signal<number | null>(null); // Silinen yorumun ID'si
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.loading.set(true);
    this.error.set(null);
    this.commentService.getCommentsByCourseId(this.courseId()).subscribe({
      next: (comments) => {
        this.comments.set(comments); //userla beraber geliyor
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Yorumlar yüklenemedi.");
        this.loading.set(false);
      },
    });
  }

  addComment() {
    if (!this.newComment.trim()) return;
    const user = this.auth.user();
    if (!user) return;
    this.adding.set(true);
    this.error.set(null);

    const dto = {
      courseId: this.courseId(),
      userId: user.id,
      date: new Date().toISOString(),
      text: this.newComment.trim(),
    };

    this.commentService.addComment(dto).subscribe({
      next: (createdComment) => {
        //json-server-authta comment içine user nesnesi gömmek doğru bir davranış değil.
        //Kendi backendimiz ile çalışsaydık her comment içine user'ı ekler, aşağıdaki gibi uğraşlar vermezdik.
        const commentWithUser : CommentWithUserModel = {
        ...createdComment,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role
        }
      }; //user dahil edilmiş commenti elde ettik. authservisten gelen user bilgisini ekledik commente.
        this.comments.update(list => [commentWithUser, ...list]); //comment signalini güncelliyoruz. En yeni en üstte görünür
        this.newComment = ""; //commenti sıfırlıyoruz.
        this.adding.set(false);
      },
      error: () => {
        this.error.set("Yorum gönderilirken hata oluştu.");
        this.adding.set(false);
      }
    });
  }


  // Silme fonksiyonu
  deleteComment(commentId: number) {
    this.deletingId.set(commentId); //sadece silinen yorumun butonunu kilitlemek için
    this.error.set(null);

    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        // Yorumu listeden kaldır
        this.comments.update(list => list.filter(c => c.id !== commentId)); //listeden filtreleyerek güncelle
        this.deletingId.set(null);
      },
      error: () => {
        this.error.set("Yorum silinirken hata oluştu.");
        this.deletingId.set(null);
      }
    });
  }

  // Kullanıcının kendi yorumu mu kontrolü
  isOwnComment(comment: CommentModel): boolean {
    const user = this.auth.user();
    return user ? comment.userId === user.id : false;
  }
  
}