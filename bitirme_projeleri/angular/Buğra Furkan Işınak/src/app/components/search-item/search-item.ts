import { Component, input, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Search } from '../../models/ISearch';

@Component({
  selector: 'app-search-item',
  imports: [RouterModule],
  templateUrl: './search-item.html',
  styleUrl: './search-item.css'
})

export class SearchItemComponent { 

  @Input()
  item:Search | null = null

}