import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {MatSelectModule } from'@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../../interfaces/validation-error';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatIconModule,MatSnackBarModule, CommonModule, MatInputModule,MatSelectModule,RouterLink, MatMenuModule, MatFormFieldModule, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  registerForm!: FormGroup;
  authService = inject(AuthService);
  passwordHide: boolean = true;
  confirmPasswordHide: boolean = true;
  matSnackbar = inject(MatSnackBar); 
  errors!: ValidationError[];

  register(){
    this.authService.register(this.registerForm.value).subscribe({
      next:(response) =>{
        console.log(response);
        this.matSnackbar.open(response.message, 'Close',{
          duration: 300,
          horizontalPosition: 'center', 
        });
        this.router.navigate(['/login'])
      },
      error: (err:HttpErrorResponse) => {
        if(err!.status == 400){
          this.errors =err!.error;
          this.matSnackbar.open('Validations error', 'Close',{
            duration: 300,
            horizontalPosition: 'center', 
        });
      }
    },
    complete: () => console.log('Register success'),
  });
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      confirmPassword:['', Validators.required],
      phoneNumber:['', Validators.required],
      role: ['Member']
    },
    {
      validators:this.passwordMatchValidator,
    }
  );
  }

    private passwordMatchValidator(control: AbstractControl):{[key:string]:boolean} | null{
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if(password != confirmPassword){
        return {'passwordMismatch': true};
      }
      return null;
    }
}
