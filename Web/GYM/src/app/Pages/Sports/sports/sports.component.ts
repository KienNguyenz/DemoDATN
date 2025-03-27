import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterModule],
  templateUrl: './sports.component.html',
  styleUrl: './sports.component.css'
})
export class SportsComponent {
constructor(private router: Router,  private viewportScroller: ViewportScroller) {}
  scrollToAnchor(sectionId: string): void {
    this.router.navigate(['/sports'], { fragment: sectionId }).then(() => {
      this.viewportScroller.scrollToAnchor(sectionId); // Cuộn đến phần tử với ID tương ứng
    });
  }
}
