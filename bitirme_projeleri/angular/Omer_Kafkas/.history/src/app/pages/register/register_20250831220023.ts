import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BackgroundItem } from "../../components/background-item/background-item";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, BackgroundItem],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register {
private fb = inject(FormBuilder)

readonly form = this.fb.group({
  name: ['', [Validators.required,Validators.name, Validators.minLength(1)]],
  surname: ['', [Validators.required, Validators.name, Validators.minLength(1)]],
  email: ['', [Validators.required, Validators.email]]
})

}
