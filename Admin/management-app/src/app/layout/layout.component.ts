import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ShareModule } from '../ShareModule';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  selectedKey = 'dashboard';
  fullName = '';
  email = '';

  constructor(private router: Router, private authService: AuthService) {
    const user = this.authService.getUserDetail();
    if (user) {
      this.fullName = user.fullName;
      this.email = user.email;
    }

    // Cập nhật key menu khi điều hướng
    this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event) => {
      const currentPath = event.urlAfterRedirects.split('/')[1];
      this.selectedKey = currentPath || 'dashboard';
    });
  }

  onMenuClick(event: any) {
    this.selectedKey = event.key;
  }

  goToProfile() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
