import { Component, inject, signal, computed, effect } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchService, GlobalSearchResult } from '../../services/search.service';
import { Api } from '../../api';

@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  private route = inject(ActivatedRoute);
  private searchService = inject(SearchService);
  private api = inject(Api);

  query = signal('');
  results = signal<GlobalSearchResult[]>([]);
  loading = signal(false);

  constructor(){
    effect(() => {
      const qp = this.route.snapshot.queryParamMap.get('q') || '';
      if(qp !== this.query()){
        this.query.set(qp);
        this.run(qp);
      }
    });
  }

  private run(q: string){
    const val = q.trim();
    if(!val){
      this.results.set([]);
      return;
    }
    this.loading.set(true);
    this.searchService.search(val).subscribe(r => {
      this.results.set(r);
      this.loading.set(false);
    });
  }

  grouped = computed(() => {
    const groups: Record<string, GlobalSearchResult[]> = {};
    for(const r of this.results()){
      groups[r.type] = groups[r.type] || [];
      groups[r.type].push(r);
    }
    return groups;
  });
  kinds = computed(() => Object.keys(this.grouped()));
}
