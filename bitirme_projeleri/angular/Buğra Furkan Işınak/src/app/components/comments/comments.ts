import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { Api } from '../../services/api';
import { Comment } from '../../models/IComments';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
;

@Component({
  selector: 'app-comments',
  imports: [ FormsModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Comments implements OnInit {
  @Input() product:any;
  commentArr:Comment[] = []
  loading = true
  newComment:any = {
    body: ''
  };
  user:any;

  constructor( private api: Api, private cdr: ChangeDetectorRef ){
     this.api.userProfileSync().subscribe({
      next:(value:any) => {
        this.user = value;
      }
    })
  }


  ngOnInit(): void {
    this.getcomment()
  }

  getcomment(){
     this.api.productComment(1,10,this.product.id).subscribe({
      next: (value:any) => {
        this.commentArr = value.body
        this.loading = false
        this.cdr.detectChanges()
      },
      error: (error) => {
        this.loading = false
        this.cdr.detectChanges()
        alert('Yorumlar yüklenirken bir hata oluştu: ' + error.message)
      }
    })
  }
   addComment(){
    if(this.newComment.body){
      this.newComment.post_id = 1; // Sabit bir postId değeri
      this.newComment.userId = this.user.id; // Kullanıcının ID'si
      this.newComment.name = this.user.name; // Kullanıcının adı
      this.newComment.email = this.user.email; // Kullanıcının emaili
        this.api.addComment(this.newComment).subscribe({
      next:(result:any) => {
         this.commentArr.push(Object.assign({}, this.newComment));
         this.newComment.body = '';
      }
      ,
      error:(err) => {
        alert("Yorum eklenirken bir hata oluştu: " + err.message);
      }
    })

    }
  }

  

}
