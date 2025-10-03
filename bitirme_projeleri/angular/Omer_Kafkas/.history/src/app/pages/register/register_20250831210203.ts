import { Component } from '@angular/core';
import { BackgroundItem } from "../../components/background-item/background-item";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [BackgroundItem, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
form: any;
submit: any;

}
