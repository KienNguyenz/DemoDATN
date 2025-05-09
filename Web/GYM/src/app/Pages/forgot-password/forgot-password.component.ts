import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MatInputModule, RouterLink, MatIconModule, MatSnackBarModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  fb = inject(FormBuilder);
  form!: FormGroup;

  sendResetLink() {
    if (this.form.valid) {
      this.authService.forgotPassword(this.form.value).subscribe({
        next: () => {
          this.matSnackBar.open('Link đặt lại mật khẩu đã được gửi!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'Email không tồn tại hoặc có lỗi xảy ra';
          this.matSnackBar.open(errorMessage, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
          });
        }
      });
    }
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
