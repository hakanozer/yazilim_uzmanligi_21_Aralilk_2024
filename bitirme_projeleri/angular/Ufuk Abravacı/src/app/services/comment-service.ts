import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CommentCreateDTO, CommentModel, CommentWithUserModel } from '../models/Comment';
import { endpoints } from '../utils/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  readonly http = inject(HttpClient)

  addComment(comment: CommentCreateDTO){
    return this.http.post<CommentModel>(endpoints.comments.add, comment)
  }
  getCommentsByCourseId(courseId: number) {
    return this.http.get<CommentWithUserModel[]>(endpoints.comments.byCourseIdwithUser(courseId)) //user ile birlikte geitiriyoruz. _expand sayesinde
  }
  deleteComment(id: number) {
    return this.http.delete(endpoints.comments.delete(id))
  }
}
