import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-nutrition',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './nutrition.component.html',
  styleUrl: '../new.component.css'
})
export class NutritionComponent {
  currentPage = 1;

  nutritionNewsList = [
    {
      image: 'http://127.0.0.1:9000/gym/assets/Nutrition/nutrition1/Web yoga.jpg',
      title: 'CHƯƠNG TRÌNH YOGA 7 NGÀY DÀNH CHO BỆNH NHÂN COVID VÀ PHỤC HỒI SAU COVID',
      routerLink: '/news/nutrition1'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/Nutrition/nutri2.jpg',
      title: 'TÁC HẠI NẾU BẠN BƠI LỘI KHÔNG ĐÚNG CÁCH',
      routerLink: '/news/nutrition2'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/Nutrition/fun fact tieu duong-avt web 3.png',
      title: '5 fun facts về bệnh tiểu đường bạn chưa từng biết',
      routerLink: '/news/nutrition3'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/Nutrition/ava4.jpg',
      title: 'Giải mã lý do tại sao bạn luôn thấy đói dù đã ăn rất nhiều',
      routerLink: '/news/nutrition4'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/Nutrition/ava5.jpg',
      title: 'Top 10 thực phẩm nguy hiểm mà hầu như ai cũng ăn',
      routerLink: '/news/nutrition5'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/Nutrition/Ava6.jpg',
      title: 'Thực đơn giúp nàng hết tự ti ngực lép',
      routerLink: '/news/nutrition6'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/Nutrition/ava-07.jpg',
      title: 'Keto Diet - Bật mí thực đơn low carb lý tưởng giúp bạn giảm mỡ thần kỳ',
      routerLink: '/news/nutrition7'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/Nutrition/Ava8.jpg',
      title: '10 nguyên tắc sống "không bệnh tật" của TS BS người Nhật Hiroma Shinya',
      routerLink: '/news/nutrition8'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/Nutrition/how to age well_ava9.jpg',
      title: 'Hãy chống lão hóa theo cách ưu tú nhất mà bạn có thể',
      routerLink: '/news/nutrition9'
    },
    {
      image: 'http://127.0.0.1:9000/gym/assets/Nutrition/banner_ava10.jpg',
      title: '5 đồ uống giải nhiệt mùa hè kiểu Gymmer',
      routerLink: '/news/nutrition10'
    }
  ];

  setPage(page: number): void {
    this.currentPage = page;
  }
}
