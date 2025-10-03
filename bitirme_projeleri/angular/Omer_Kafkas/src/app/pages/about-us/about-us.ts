import { Component, OnInit, inject, signal } from '@angular/core';
import { BackgroundItem } from "../../components/background-item/background-item";
import { CommonModule } from '@angular/common';
import { Api } from '../../api';
import { UserDto } from '../../services/auth.service';



@Component({
  selector: 'app-about-us',
  imports: [BackgroundItem, CommonModule],
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.css']
})
export class AboutUs implements OnInit {
  private api = inject(Api);
  instructors = signal<UserDto[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    // role=instructor param filtrelemesi (json-server destekler)
    this.api.list<UserDto>('users', { role: 'instructor' }).subscribe(list => {
      this.instructors.set(list);
      this.loading.set(false);
    }, _ => this.loading.set(false));
  }
}
