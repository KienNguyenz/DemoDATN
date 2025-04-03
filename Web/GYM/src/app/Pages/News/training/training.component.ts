import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,NgxPaginationModule],
  templateUrl: './training.component.html',
  styleUrl: '../new.component.css'
})
export class TrainingComponent {
    pagedNewsList = [
      {
        image: 'http://127.0.0.1:9000/gym/assets/Training/ava1.jpg',
        title: 'COUPLE YOGA – SỨC MẠNH CỦA SỰ ĐỒNG HÀNH',
        routerLink: '/news/train1'
      },
      {
        image: 'http://127.0.0.1:9000/gym/assets/Training/Bộ 10 ảnh web Bơi-17.jpg',
        title: 'GỢI Ý TOP CÁC BỂ BƠI NƯỚC MẶN 5 SAO Ở HÀ NỘI',
        routerLink: '/news/train2'
      },
      {
        image: 'http://127.0.0.1:9000/gym/assets/Training/Bộ 10 ảnh web Bơi-19.jpg',
        title: 'BỂ BƠI NƯỚC MẶN ELITE FITNESS CÓ ĐẠT CHUẨN QUỐC TẾ?',
        routerLink: '/news/train3'
      },
      {
        image: 'http://127.0.0.1:9000/gym/assets/Training/Bộ 10 ảnh web Bơi-18.jpg',
        title: 'ELITE FITNESS SỞ HỮU BỂ BƠI NƯỚC MẶN HIỆN ĐẠI NHẤT',
        routerLink: '/news/train4'
      },
      {
        image: 'http://127.0.0.1:9000/gym/assets/Training/Bộ 10 ảnh web Bơi-16.jpg',
        title: 'BƠI BỂ NƯỚC MẶN Ở ĐÂU TỐT NHẤT?',
        routerLink: '/news/train1'
      },
      {
        image: 'http://127.0.0.1:9000/gym/assets/Training/Bộ 10 ảnh web Bơi-20.jpg',
        title: 'BỂ BƠI NƯỚC MẶN: 10 BỂ BƠI ĐẸP VÀ TỐT NHẤT HIỆN NAY',
        routerLink: '/news/train1'
      },
      {
        image: 'http://127.0.0.1:9000/gym/assets/Training/Bộ 10 ảnh web Bơi-15.jpg',
        title: 'TOP CÁC BỂ BƠI NƯỚC MẶN HIỆN ĐẠI NHẤT Ở HÀ NỘI',
        routerLink: '/news/train1'
      },
      {
        image: 'http://127.0.0.1:9000/gym/assets/Training/Bộ 10 ảnh web Bơi-12.jpg',
        title: 'BỂ BƠI NƯỚC MẶN VÀ BỂ BƠI THƯỜNG CÓ GÌ KHÁC NHAU?',
        routerLink: '/news/train1'
      },
      {
        image: 'http://127.0.0.1:9000/gym/assets/Training/Bộ 10 ảnh web Bơi-11.jpg',
        title: 'BỂ BƠI NƯỚC MẶN LÀ GÌ? LỢI ÍCH SỨC KHỎE KHÔNG PHẢI AI CŨNG BIẾT',
        routerLink: '/news/train1'
      },
      {
        image: 'http://127.0.0.1:9000/gym/assets/Training/ảnh_Viber_2024-04-09_10-21-47-071.jpg',
        title: 'MẠNH MẼ TRONG THẾ GIỚI YOGA STICK',
        routerLink: '/news/train1'
      }
    ];
  
    currentPage = 1;
  
    setPage(page: number) {
      this.currentPage = page;
    }
  }
  

