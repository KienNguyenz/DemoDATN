import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './training.component.html',
  styleUrl: '../new.component.css'
})
export class TrainingComponent {

}
