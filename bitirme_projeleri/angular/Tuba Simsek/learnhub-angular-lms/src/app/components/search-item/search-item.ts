import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-item',
  imports: [FormsModule],
  templateUrl: './search-item.html',
  styleUrl: './search-item.css'
})
export class SearchItemComponent implements OnInit {

  searchClean: any[] = []

  searchControl = new FormControl('')
  isLoading = false
  searchResults: any[] = []
  http: any

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(query => {
      if (query) {
        this.search(query)
      }else{
        this.searchClean = []
      }
    })
  }
  search(query: string): void  {
    this.isLoading = true
    const params = new HttpParams().set('query', query)

    this.http.get('/api/search', { params })
      .subscribe(
        (Response: any) => {
          this.searchResults = Response.results
          this.isLoading = false
        },
        (error: any) => {
          this.searchResults = []
          this.isLoading = false
        }
      )
  }

}

