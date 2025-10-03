import { Component, inject } from '@angular/core';
import { BackgroundItem } from "../../components/background-item/background-item";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [BackgroundItem],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  private auth = inject(AuthService);
  profilePhoto: string;

  constructor() {
    const user = this.auth.currentUser();
    this.profilePhoto = (user as { profilePhoto?: string })?.profilePhoto || 'assets/logo.png';
  }
}
