import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tin-tuc',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tin-tuc.component.html',
  styleUrl: '../new.component.css'
})
export class TinTucComponent {
  authService = inject(AuthService)
  // ngAfterViewInit(): void {
  //   // Sau khi Angular render xong DOM, lắng nghe sự kiện keyup trong trường hợp Enter
  //   const input = document.getElementById('searchInput') as HTMLInputElement;
  //   input?.addEventListener('keyup', (event) => {
  //     if (event.key === 'Enter') {
  //       input.blur();
  //     }
  //   });
  // }

  // filterNews(event?: any): void {
  //   const filter = event?.target.value.toLowerCase() || '';
  //   const newsItems = document.querySelectorAll('#newsContainer');

  //   // Duyệt từng mục tin tức trong DOM
  //   newsItems.forEach((item: any) => {
  //     const text = item.querySelector('b').innerText.toLowerCase();
  //     item.style.display = text.includes(filter) ? '' : 'none';
  //   });
  // }

}
