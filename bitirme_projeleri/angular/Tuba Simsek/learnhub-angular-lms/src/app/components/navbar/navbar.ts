import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit  } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Util } from '../../utils/util';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule],
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
    const answer = confirm('Are you sure logout?') //confirm: Kullanıcıya bir onay penceresi açar. Eğer kullanıcı "OK" butonuna basarsa true, "Cancel" butonuna basarsa false döner.
      this.api.userLogout()
      this.router.navigate(['/login']);
  }



  sendSearch() {
    this.router.navigate(['search'], {queryParams: {q: this.q}})
  }

}
