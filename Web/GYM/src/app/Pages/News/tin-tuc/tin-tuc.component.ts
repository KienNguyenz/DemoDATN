import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-tin-tuc',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,NgxPaginationModule],
  templateUrl: './tin-tuc.component.html',
  styleUrl: '../new.component.css'
})
export class TinTucComponent {
  currentPage = 1;

  pagedNewsList = [
    {
      image: 'http://127.0.0.1:9000/gym/assets/News/Nhung-ly-do-ban-nen-tap-thu-les-mills-body-pump-ngay-hom-nay-01.jpg',
      title: 'Những lý do bạn nên tập thử Les Mills body pump ngay hôm nay.',
      routerLink: '/news/news1'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/News/ban-co-biet-les-mills-body-pump-giup-co-the-deo-dai-hon-01.jpg',
      title: 'Bạn có biết LES Mills body pump giúp cơ thể dẻo dai hơn.',
      routerLink: '/news/news2'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/News/ly-do-les-mills-body-attack-la-bai-tap-hoan-hao-de-phat-trien-co-bap-toan-dien-01.jpg',
      title: 'Lý do Les Mills body attack là bài tập hoàn hảo để phát triển cơ bắp toàn diện.',
      routerLink: '/news/news3'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/News/nhung-tac-dong-tich-cuc-den-suc-khoe-khi-tap-les-mills-body-combat-01.jpg',
      title: 'Những tác động tích cực đến sức khoẻ khi tập Les Mills body combat.',
      routerLink: '/news/news4'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/News/tai-sao-les-mills-body-attack-la-bo-mon-giup-cai-thien-suc-ben-tim-mach-01.jpg',
      title: 'Tại sao Les Mills body attack là bộ môn giúp cải thiện sức bền tim mạch.',
      routerLink: '/news/news5'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/News/tap-les-mills-body-combat-co-the-dot-bao-nhieu-calo-moi-buoi-su-that-bat-ngo-01.jpg',
      title: 'Tập Les Mills body combat có thể đốt bao nhiêu calo mỗi buổi, sự thật bất ngờ.',
      routerLink: '/news/news6'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/News/tap-les-mills-body-pump-co-giup-tang-co-khong-cach-toi-uu-hoa-ket-qua-01.jpg',
      title: 'Tập Les Mills body pump có giúp tăng cơ không? Cách tối ưu hoá kết quả.',
      routerLink: '/news/news7'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/News/tap-les-mills-body-pump-co-loi-ich-gi-nhung-ly-do-ban-nen-bat-dau-ngay-hom-nay-01.jpg',
      title: 'Tập Les Mills body pump có lợi ích gì? Những lý do bạn nên bắt đầu ngay hôm nay.',
      routerLink: '/news/news8'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/News/tap-les-mills-body-pump-o-dau-de-dat-hieu-qua-toi-uu-01.jpg',
      title: 'Tập Les Mills body pump ở đâu để đạt hiệu quả tối ưu?',
      routerLink: '/news/news9'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/News/AVA WEB_Mahadetox.jpg',
      title: 'Demo',
      routerLink: '/news/news10'
    }
  ];
  setPage(page: number): void {
    this.currentPage = page; // Cập nhật trang hiện tại
  }
}
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


