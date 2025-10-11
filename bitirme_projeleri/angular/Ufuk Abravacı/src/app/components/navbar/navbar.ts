import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth-service";

@Component({
  selector: "app-navbar",
  imports: [RouterModule],
  templateUrl: "./navbar.html",
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  auth = inject(AuthService);
  userName = this.auth.user()?.fullName;
  userEmail = this.auth.user()?.email
  userId = this.auth.user()?.id
}
