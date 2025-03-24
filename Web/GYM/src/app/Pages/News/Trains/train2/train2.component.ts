import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-train2',
  standalone: true,
  imports: [],
  templateUrl: './train2.component.html',
  styleUrl: '../../new.component.css'
})
export class Train2Component {
authService = inject(AuthService)
}
