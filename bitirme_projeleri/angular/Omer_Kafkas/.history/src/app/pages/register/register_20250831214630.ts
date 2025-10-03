import { Component } from '@angular/core';
import { BackgroundItem } from "../../components/background-item/background-item";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, BackgroundItem],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: changede
})
export class Register {
form: any;
submit: any;

}
