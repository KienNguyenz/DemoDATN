import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-new1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new1.component.html',
  styleUrl: './new1.component.css'
})
export class New1Component {
  authService = inject(AuthService)
  
}
