import { Component } from '@angular/core';

@Component({
  selector: 'app-hope',
  standalone: true,
  imports: [],
  templateUrl: './hope.component.html',
  styleUrl: './hope.component.css'
})
export class HopeComponent {

  // Hàm thay đổi video
  changeVideo(videoSrc: string, title: string, clickedElement: HTMLElement) {
    const videoElement = document.getElementById("mainVideo") as HTMLVideoElement;
    const titleElement = document.getElementById("videoTitle");

    if (videoElement && titleElement) {
      // Thay đổi nguồn video và tiêu đề
      videoElement.src = videoSrc;
      titleElement.textContent = title;

      // Xóa class 'active' khỏi tất cả các phần tử video-item
      const videoItems = document.querySelectorAll('.video-item');
      videoItems.forEach(item => item.classList.remove('active'));

      // Thêm class 'active' cho video đang được chọn
      clickedElement.classList.add('active');
    }
  }
}