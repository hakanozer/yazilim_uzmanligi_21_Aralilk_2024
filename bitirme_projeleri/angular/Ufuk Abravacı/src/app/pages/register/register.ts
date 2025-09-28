import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  inject,
  signal,
} from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../services/auth-service";
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Navbar],
  templateUrl: "./register.html",
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  readonly http = inject(HttpClient);
  readonly router = inject(Router);
  readonly message = signal<string | null>(null);
  readonly isSuccess = signal(false);
  readonly isLoading = signal(false);
  readonly auth = inject(AuthService)

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) return;
    this.isLoading.set(true);
    const payload = {
    email: formData.value.email,
    password: formData.value.password,
    fullName: formData.value.fullName,
    role: formData.value.role
  };
    this.auth.register(payload).subscribe({
      next: (res) => {
        //Kayıt başarılı olursa otomatik olarak login olduk.
        this.auth.login(res)
        this.isSuccess.set(true);
        this.message.set(
          "✅ Kayıt başarılı! Anasayfaya yönlendiriliyorsunuz..."
        );
        this.router.navigate(["/"]);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isSuccess.set(false);
        const backendMessage = err?.error || "Kayıt başarısız! Tekrar deneyin.";
        this.message.set(`❌ ${backendMessage}`);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
