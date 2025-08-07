import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Util } from '../../utils/util';
import { Api } from '../../services/api';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Navbar implements OnInit {

  navbarUserName = ''
  constructor(private api: Api, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.navbarUserName = Util.username
      this.cdr.detectChanges()
    }, 1000);
  }


 
}



