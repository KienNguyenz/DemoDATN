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
    ShareModule, // Giả sử bạn đã export đủ từ đây
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
        this.matSnackBar.open(response.message, 'Đóng', { duration: 3000 });

        const user = this.authService.getUserDetail();
        const role = user?.roles?.[0];
        this.router.navigate(['/']);
        // Điều hướng dựa theo vai trò
        // if (role === 'Admin') {
        //   this.router.navigate(['/admin']);
        // } else {
        //   this.router.navigate(['/']);
        // }
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

        this.http.post('https://localhost:7045/api/auth/facebook', { token: accessToken }).subscribe({
          next: (res: any) => {
            this.matSnackBar.open('Login thành công!', 'Đóng', { duration: 3000 });
            localStorage.setItem('token', res.token);
            this.router.navigate(['/']);
          },
          error: () => {
            this.matSnackBar.open('Đăng nhập Facebook thất bại!', 'Đóng', { duration: 3000 });
          }
        });
      }
    }, { scope: 'public_profile,email' });
  }
}
