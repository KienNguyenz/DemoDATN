import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
declare const FB: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, RouterLink, MatIconModule, MatSnackBarModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);
  http = inject(HttpClient);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // Khởi tạo Facebook SDK
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '643475595073375', // 🔹 Thay thế bằng Facebook App ID của bạn
        cookie: true,
        xfbml: true,
        version: 'v17.0'
      });
    };

    // Tải SDK Facebook
    let script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  login() {
    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        this.matSnackBar.open(response.message, 'Close', {
          duration: 3000,
          horizontalPosition: 'center'
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.matSnackBar.open(error.error.message, 'Close', {
          duration: 3000,
          horizontalPosition: 'center'
        });
      }
    });
  }

  loginWithFacebook() {
    FB.login((response: any) => {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;

        // Gửi token Facebook lên backend
        this.http.post('https://localhost:7045/api/auth/facebook', { token: accessToken }).subscribe({
          next: (res: any) => {
            this.matSnackBar.open('Login successful!', 'Close', {
              duration: 3000,
              horizontalPosition: 'center'
            });
            localStorage.setItem('jwt', res.token);
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.matSnackBar.open('Facebook login failed!', 'Close', {
              duration: 3000,
              horizontalPosition: 'center'
            });
          }
        });
      }
    }, { scope: 'public_profile,email' });
  }
}
