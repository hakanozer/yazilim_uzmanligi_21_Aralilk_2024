import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { JsonPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ TitleCasePipe],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  user: any= {
email: "",
id: 0,
name: "",
password: "",
role: "",
lessons: [],
courses: [],

  };

  constructor(private api: Api, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
      this.getUserProfile();
  }

  async getUserProfile() {
    await this.api.userProfileSync().subscribe({
      next: (value: any) => {
        this.user.id = Number(value.id) || 0;
        this.user.name = value.name || "";
        this.user.password = value.password || "";
        this.user.email = value.email || "";
        this.user.courses = value.courses || [];
        this.user.lessons = value.lessons || [];
        this.user.role = value.role || "user";
        setTimeout(() => {
          this.cdr.detectChanges();
        },);
      },
      error: (err) => {
        console.error('Profil bilgisi alınamadı', err);
      }
    });

  }
}
