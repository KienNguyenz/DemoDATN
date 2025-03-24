import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-train1',
  standalone: true,
  imports: [],
  templateUrl: './train1.component.html',
  styleUrl: '../../new.component.css'
})
export class Train1Component {
authService = inject(AuthService)
}
