import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Api } from '../../services/api';
import { Comment } from '../../models/IComments';
;

@Component({
  selector: 'app-comments',
  imports: [],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Comments implements OnInit {

  commentArr:Comment[] = []
  loading = true

  constructor( private api: Api, private cdr: ChangeDetectorRef ){
  }


  ngOnInit(): void {
    this.api.productComment(1,10).subscribe({
      next: (value) => {
        this.commentArr = value.data
        this.loading = false
        this.cdr.detectChanges()
      },
      error: (error) => {

      }
    })
  }

  

}
