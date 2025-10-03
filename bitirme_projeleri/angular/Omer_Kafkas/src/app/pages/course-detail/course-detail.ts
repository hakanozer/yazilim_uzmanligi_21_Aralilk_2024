import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Api } from '../../api';
import { AuthService } from '../../services/auth.service';
import { UserLookupService } from '../../services/user-lookup.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrls: ['./course-detail.css']
})
export class CourseDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(Api);
  private auth = inject(AuthService);
  private userLookup = inject(UserLookupService);

  data = this.route.snapshot.data['detail'] as any;
  course = signal<any | null>(this.data?.course ?? null);
  lessons = signal<any[]>(this.data?.lessons ?? []);
  comments = signal<any[]>(this.data?.comments ?? []);
  newComment = signal('');
  posting = signal(false);
  private userMap = signal<Record<string, string>>({});

  ngOnInit(): void {
    this.userLookup.getAllMap().pipe(take(1)).subscribe({
      next: map => { if(map && Object.keys(map).length){ this.userMap.set(map); this.decorateExistingComments(); } },
      error: () => {}
    });
  }

  private decorateExistingComments() {
    const map = this.userMap();
    const updated = this.comments().map(c => ({ ...c, authorName: map[c.userId] || c.userId }));
    this.comments.set(updated);
  }

  isStudent = computed(() => this.auth.currentUser()?.role === 'student');
  canComment = computed(() => !!this.auth.currentUser() && this.isStudent());

  addComment() {
    if (!this.canComment() || !this.course() || !this.newComment().trim()) return;
    const user = this.auth.currentUser();
    if (!user) return;
    this.posting.set(true);
    const payload = {
      courseId: this.course().id,
      userId: user.id,
      text: this.newComment().trim(),
      createdAt: new Date().toISOString()
    };
    this.api.post<any>('comments', payload).subscribe({
      next: saved => {
        const map = this.userMap();
  const uid = String(user.id);
  const fallback = [user.name, user.surname].filter(Boolean).join(' ').trim();
  const authorName = map[uid] || fallback || uid;
        this.comments.set([{ ...saved, authorName }, ...this.comments()]);
        this.newComment.set('');
        this.posting.set(false);
      },
      error: () => this.posting.set(false)
    });
  }
}
