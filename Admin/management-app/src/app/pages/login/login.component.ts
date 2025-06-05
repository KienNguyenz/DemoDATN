import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShareModule } from '../../ShareModule';

declare const FB: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ShareModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  hide = true;
  form!: FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private matSnackBar = inject(MatSnackBar);
  private router = inject(Router);
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    if ((window as any).FB) {
      this.initializeFacebookSDK();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.onload = () => this.initializeFacebookSDK();
    document.body.appendChild(script);
  }

  initializeFacebookSDK() {
    FB.init({
      appId: '643475595073375',
      cookie: true,
      xfbml: true,
      version: 'v17.0'
    });
  }

  login() {
    if (this.form.invalid) return;
    this.loading = true;

    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        this.loading = false;

        if (response.isSuccess && response.token) {
          const user = this.authService.getUserDetail();
          const roles = user?.roles || [];

          if (roles.includes('Admin')) {
            this.matSnackBar.open('Đăng nhập thành công!', 'Đóng', { duration: 3000 });
            this.router.navigate(['/']);
          } else {
            this.authService.logout();
            this.matSnackBar.open('Bạn không có quyền truy cập!', 'Đóng', { duration: 3000 });
          }
        } else {
          this.matSnackBar.open(response.message || 'Đăng nhập thất bại!', 'Đóng', {
            duration: 3000
          });
        }
      },
      error: (error) => {
        this.loading = false;
        this.matSnackBar.open(error.error?.message || 'Đăng nhập thất bại!', 'Đóng', {
          duration: 3000
        });
      }
    });
  }

  loginWithFacebook() {
    FB.login((response: any) => {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;
        this.http.post(`${this.authService.apiUrl}auth/facebook`, { token: accessToken }).subscribe({
          next: (res: any) => {
            const jwtToken = res.token;
            localStorage.setItem('token', jwtToken);

            const user = this.authService.getUserDetail();
            const roles = user?.roles || [];

            if (roles.includes('Admin')) {
              this.matSnackBar.open('Đăng nhập Facebook thành công!', 'Đóng', { duration: 3000 });
              this.router.navigate(['/']);
            } else {
              this.authService.logout();
              this.matSnackBar.open('Bạn không có quyền truy cập!', 'Đóng', { duration: 3000 });
            }
          },
          error: () => {
            this.matSnackBar.open('Đăng nhập Facebook thất bại!', 'Đóng', { duration: 3000 });
          }
        });
      }
    }, { scope: 'public_profile,email' });
  }
}
