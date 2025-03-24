import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-train3',
  standalone: true,
  imports: [],
  templateUrl: './train3.component.html',
  styleUrl: '../../new.component.css'
})
export class Train3Component {
authService = inject(AuthService)
}
