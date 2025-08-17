import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Api } from '../../services/api';
import { SingleUser } from '../../models/IUsers';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-users',
  imports: [FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Users implements OnInit {

  userArr:SingleUser[] = []
  selectUser:SingleUser | null = null 

  constructor(private api: Api, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.api.users(1, 10).subscribe({
      next: (value) => {
        this.userArr = value.data
        if (value.data.length > 0) {
          this.selectUser = value.data[0]
        }
      },
      error: (error) => {

      },
      complete: () => {
        this.cdr.detectChanges()
      }
    })
  }

  fncSelectUser(user: SingleUser) {
    this.selectUser = user
  }

}
