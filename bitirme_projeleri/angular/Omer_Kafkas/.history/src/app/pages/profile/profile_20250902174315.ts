import { Component } from '@angular/core';
import { BackgroundItem } from "../../components/background-item/background-item";

@Component({
  selector: 'app-profile',
  imports: [BackgroundItem],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  user: unknown = undefined;
  profilePhoto: string;

  constructor() {
    this.profilePhoto = (this.user as { profilePhoto?: string })?.profilePhoto || 'assets/logo.png';
  }
}
