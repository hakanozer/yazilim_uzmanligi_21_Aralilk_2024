import { Component } from '@angular/core';
import { BackgroundItem } from "../../components/background-item/background-item";

@Component({
  selector: 'app-profile',
  imports: [BackgroundItem],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
profilePhoto = this.user?.profilePhoto || 'assets/logo.png';
  user: any;

}
