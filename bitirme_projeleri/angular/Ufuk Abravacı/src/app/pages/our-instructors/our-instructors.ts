import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { UserService } from "../../services/user-service";
import { PublicUser } from "../../models/User";
import { RouterLink } from "@angular/router";
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: "app-our-instructors",
  imports: [RouterLink, Navbar],
  templateUrl: "./our-instructors.html",
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OurInstructors implements OnInit {
  readonly userService = inject(UserService);
  readonly instructors = signal<PublicUser[]>([]);
  readonly error = signal<string | null>(null);
  readonly loading = signal(false);
  readonly page = signal(1);
  readonly limit = signal(9);
  readonly total = signal(0);
  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.limit()))
  );
  ngOnInit(): void {
    this.fetchInstructors();
  }

  fetchInstructors() {
    this.loading.set(true);
    this.userService.getInstructors(this.page(), this.limit()).subscribe({
      next: (res) => {
        this.instructors.set(res.data);
        this.total.set(res.total);
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Öğretmen listesi getirilirken bir hata oluştu.");
        this.loading.set(false);
      },
    });
  }

  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update((p) => p + 1);
      this.fetchInstructors();
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
      this.fetchInstructors();
    }
  }
}
