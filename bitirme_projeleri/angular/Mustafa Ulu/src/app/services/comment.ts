import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comments } from '../models/comments';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private api = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {}

  getByCourse(courseId: number): Observable<Comments[]> {
    return this.http.get<Comments[]>(`${this.api}?courseId=${courseId}`);
  }

  add(payload: Omit<Comments, 'id'>): Observable<Comments> {
    return this.http.post<Comments>(this.api, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
