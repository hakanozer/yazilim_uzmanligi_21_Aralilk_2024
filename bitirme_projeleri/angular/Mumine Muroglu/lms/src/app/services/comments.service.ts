import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment, ICommentCreate } from '../models/IComment';
import { userUrl } from '../utils/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {}

  // İlgili kursa ait yorumları getiren metod
  getCommentsByCourse(courseId: string): Observable<IComment[]> {
    const url = `${userUrl.comments}?courseId=${courseId}`;
    return this.http.get<IComment[]>(url);
  }

  // Yorum ekleme metodu
  addComment(commentData: ICommentCreate): Observable<IComment> {
    return this.http.post<IComment>(userUrl.comments,commentData)
  }
}
