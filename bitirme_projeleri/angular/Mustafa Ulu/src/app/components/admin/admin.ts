import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss'],
})
export class AdminComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
