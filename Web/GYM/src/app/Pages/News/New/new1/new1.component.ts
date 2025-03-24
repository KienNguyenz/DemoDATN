import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new1',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './new1.component.html',
  styleUrl: '../../new.component.css'
})
export class New1Component {
  authService = inject(AuthService)
  
}
