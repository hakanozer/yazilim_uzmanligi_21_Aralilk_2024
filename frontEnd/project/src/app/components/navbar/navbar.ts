import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit  } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Util } from '../../utils/util';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { SearchItemComponent } from "../search-item/search-item";

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, FormsModule, SearchItemComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Navbar implements OnInit {

  q = ''
  navbarUserName = ''
  constructor(private api: Api, 
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.navbarUserName = Util.username
      this.cdr.detectChanges()
    }, 1000);
  }


  logout() {
    const answer = confirm('Are you sure logout?')
    if(answer) {
      this.api.userLogout().subscribe({
        next: (value) => {
          localStorage.removeItem('token')
          window.location.replace('/')
        },
        error: (error) => {

        }
      })
    }
  }


  sendSearch() {
    this.router.navigate(['search'], {queryParams: {q: this.q}})
  }

}
