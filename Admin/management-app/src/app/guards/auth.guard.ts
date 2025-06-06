import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUserDetail();
    const roles = user?.roles || [];
    if (roles.includes('Admin')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
