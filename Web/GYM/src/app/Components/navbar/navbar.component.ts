import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { accountDetail } from '../../interfaces/account-detail';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,RouterLink, MatMenuModule,MatSnackBarModule, CommonModule,MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  accountDetail!: accountDetail | null;
  
    constructor(private authService: AuthService,
      private router: Router
    ) {}
  matSnackBar = inject(MatSnackBar);
  ngOnInit(): void {
    this.authService.getAccountDetail().subscribe({
      next: (res) => {
        this.accountDetail = res;
      },
      error: (err) => {
        console.error('Không lấy được thông tin user:', err);
        // Chuyển về home hoặc login
        this.router.navigate(['/']);
      }
    });
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout = () => {
    this.authService.logout();
    this.matSnackBar.open('Logout Success', "Close", {
      duration: 3000,
      horizontalPosition: 'center',
    });
    this.router.navigate(['/login']);
  }
}
