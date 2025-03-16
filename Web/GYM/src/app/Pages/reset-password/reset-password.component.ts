import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatInputModule,RouterModule, MatIconModule, MatSnackBarModule, ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  form!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  token: string = '';
  mismatch: any;

  resetPassword() {
    if (this.form.valid) {
      const data = { ...this.form.value, token: this.token };
      this.authService.resetPassword(data).subscribe({
        next: (response) => {
          this.matSnackBar.open(response.message, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.matSnackBar.open(error.error.message, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
          });
        }
      });
    }
  }

  ngOnInit(): void {
    // Lấy token từ URL (thường được gửi qua email)
    this.token = this.route.snapshot.queryParams['token'] || '';

    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator để kiểm tra mật khẩu nhập lại
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { ['mismatch']: true };
  }
  
}
