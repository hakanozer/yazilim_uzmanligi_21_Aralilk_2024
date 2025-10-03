import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BackgroundItem } from "../../components/background-item/background-item";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
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

readonly form = this

}
