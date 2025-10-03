import { Component, inject, signal, effect, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SearchService, GlobalSearchResult } from '../../services/search.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  readonly auth = inject(AuthService);
  private router = inject(Router);
  private searchService = inject(SearchService);

  query = signal('');
  private input$ = new Subject<string>();
  results = signal<GlobalSearchResult[]>([]);
  open = signal(false);
  searching = signal(false);

  constructor(){
    // stream
    this.input$
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        switchMap(q => {
          const val = q.trim();
            if(!val){
              this.searching.set(false);
              return of<GlobalSearchResult[]>([]);
            }
            this.searching.set(true);
            return this.searchService.search(val);
        })
      )
      .subscribe(res => {
        this.results.set(res.slice(0,8));
        this.open.set(res.length>0);
        this.searching.set(false);
      });
  }

  onInput(v: string){
    this.query.set(v);
    this.input$.next(v);
  }

  goToFull(){
    const q = this.query().trim();
    if(!q) return;
    this.open.set(false);
    this.router.navigate(['/search'], { queryParams: { q } });
  }

  navigate(r: GlobalSearchResult){
    this.open.set(false);
    if(r.type === 'course' || r.relatedCourseId){
      this.router.navigate(['/courses', r.relatedCourseId || r.id]);
    } else if(r.type==='user') {
      // kullanıcı profili desteği yok: ileride eklenebilir
    }
  }
  // template can call auth.currentUser() to get the current user signal value
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  labelOf(type: string){
    switch(type){
      case 'course': return 'Kurs';
      case 'lesson': return 'Ders';
      case 'comment': return 'Yorum';
      case 'user': return 'Kullanıcı';
      default: return type;
    }
  }
}
