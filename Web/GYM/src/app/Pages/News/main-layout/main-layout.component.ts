import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterLink, CommonModule,RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
authService = inject(AuthService)
  ngAfterViewInit(): void {
    // Sau khi Angular render xong DOM, lắng nghe sự kiện keyup trong trường hợp Enter
    const input = document.getElementById('searchInput') as HTMLInputElement;
    input?.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        input.blur();
      }
    });
  }
  filterNews(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    const filter = inputElement.value.toLowerCase();
    const newsItems = document.querySelectorAll('#newsContainer');

    // Duyệt qua tất cả các mục tin tức
    newsItems.forEach((item: any) => {
      const text = item.querySelector('b').innerText.toLowerCase();
      item.style.display = text.includes(filter) ? '' : 'none'; // Hiển thị hoặc ẩn dựa vào nội dung tìm kiếm
    });
  }
}