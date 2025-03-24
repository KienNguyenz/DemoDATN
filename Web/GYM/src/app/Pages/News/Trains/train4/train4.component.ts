import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-train4',
  standalone: true,
  imports: [],
  templateUrl: './train4.component.html',
  styleUrl: '../../new.component.css'
})
export class Train4Component {
authService = inject(AuthService)
}
