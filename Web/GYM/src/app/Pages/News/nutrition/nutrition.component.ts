import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nutrition',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nutrition.component.html',
  styleUrl: '../new.component.css'
})
export class NutritionComponent {

}
