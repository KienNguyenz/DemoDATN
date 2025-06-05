import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatInputModule, RouterModule, MatIconModule, MatSnackBarModule, CommonModule,ReactiveFormsModule],
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

  ngOnInit(): void {
    // Lấy token từ URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });

    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Validator kiểm tra password có khớp không
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  resetPassword() {
    if (this.form.valid) {
      const data = { 
        email: this.route.snapshot.queryParams['email'] || '',
        password: this.form.value.password, 
        confirmPassword: this.form.value.confirmPassword,
        token: decodeURIComponent(this.token.trim()) 
      };

      this.authService.resetPassword(data).subscribe({
        next: () => {
          this.matSnackBar.open('Mật khẩu đã được đổi thành công!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log('Error Response:', error);
          this.matSnackBar.open(error.error?.message || 'Lỗi khi đặt lại mật khẩu', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
          });
        }
      });
    }
  }
}
