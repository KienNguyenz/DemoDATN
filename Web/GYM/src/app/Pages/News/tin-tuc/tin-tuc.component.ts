import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tin-tuc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tin-tuc.component.html',
  styleUrl: './tin-tuc.component.css'
})
export class TinTucComponent {
  authService = inject(AuthService)
  searchQuery: string = ''; // Lưu chuỗi tìm kiếm từ thanh input
  searchResult: string[] = []; // Lưu kết quả tìm kiếm

  @ViewChild('contentToSearch') contentToSearch!: ElementRef; // Tham chiếu đến phần nội dung HTML

  onSearch() {
    this.searchResult = []; // Reset kết quả tìm kiếm mỗi lần nhấn nút

    const elements = this.contentToSearch.nativeElement.querySelectorAll('p'); // Tìm tất cả các thẻ <p>

    elements.forEach((element: HTMLElement) => {
      if (element.innerText.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        this.searchResult.push(element.innerText); // Thêm các đoạn text khớp vào kết quả
      }
    });
  }
}
