import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Util } from '../../utils/util';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class NavbarComponent implements OnInit {
  
  navbarUserName = ''
  role: string | null = null

  constructor(private authService: AuthService,private router:Router,private cdr:ChangeDetectorRef) {}

   ngOnInit(): void {
      this.role = localStorage.getItem('userRole');
          setTimeout(() => {
              this.navbarUserName = Util.username;
              this.cdr.detectChanges();//UI güncellemesi için
      }, 100); // 100ms sonra username büyük ihtimalle set edilmiş olur
    }

    logout(): void {
    localStorage.clear();
    this.router.navigate(['/'], { replaceUrl: true }); // 🔹 replaceUrl ile geçmiş temizleniyor
    this.cdr.detectChanges();
}

}

