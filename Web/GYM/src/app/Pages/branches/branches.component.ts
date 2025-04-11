import { Component, OnInit } from '@angular/core';
import { Branch, BranchService } from '../../services/branch.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../../services/employees.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// Định nghĩa model cho video với vị trí hiển thị
export interface BranchVideo {
  videoUrl: string;
  position: 'top' | 'middle' | 'bottom';
}
export interface Employee {
  branchId: number;
  name: string;
  gender: string;
  nickname?: string;
  role?: string;
  describe?: string;
  strength?: string;
  pictureUrl?: string;
  // Bạn có thể bổ sung thêm các trường khác như birthday, gender,…
}


@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
  branch: Branch | null = null; // Thông tin chi nhánh
  employees: Employee[] = [];
  branchMapUrl: SafeResourceUrl = "";
  // Carousel ảnh
  carouselImages: { url: string; title: string }[] = [];
  currentIndex = 0;
  // Mảng video của branch (nếu lấy từ mapping)
  branchVideos: BranchVideo[] = [];

  // Mapping ảnh theo ID branch (nếu API không trả về mảng ảnh)
  gymAmenitiesImages: string[] = [];

  private branchMapMapping: { [branchId: number]: string } = {
    1: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.222111902922!2d105.82570037508195!3d21.063789280594367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aaf884c54d49%3A0xd8939cc34782d7f9!2zRWxpdGUgRml0bmVzcyBYdcOibiBEaeG7h3U!5e0!3m2!1svi!2s!4v1744188377846!5m2!1svi!2s",
    2: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5318698669507!2d105.84756627508042!3d21.011394280633585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8b0f0e5c15%3A0x71cb7aee6c1d8716!2sElite%20Fitness%20Vincom%20B%C3%A0%20Tri%E1%BB%87u!5e0!3m2!1svi!2s!4v1744188436015!5m2!1svi!2s",
    3: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.2331833710496!2d105.80669427508067!3d21.023353780624632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab689f627bdd%3A0x14eb245fefe79a98!2sElite%20Fitness%20Vincom%20Nguy%E1%BB%85n%20Ch%C3%AD%20Thanh!5e0!3m2!1svi!2s!4v1744188497319!5m2!1svi!2s",
    4: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.657292521216!2d105.82952687508022!3d21.00637038063733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac7e54c8c827%3A0x1771fade75c742a3!2zRWxpdGUgRml0bmVzcyBWaW5jb20gUGjhuqFtIE5n4buNYyBUaOG6oWNo!5e0!3m2!1svi!2s!4v1744188520872!5m2!1svi!2s"
    // Thêm các mapping khác nếu cần
  };

  private gymAmenitiesMapping: { [branchId: number]: { url: string; title: string }[] } = {
    1: [
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/1.jpg', title: 'Khu vực lễ tân và quầy khăn - Reception and towels area' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/2.jpeg', title: 'Sảnh và khu vực chờ sang trọng - Luxurious lobby and lounge area' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/3.jpeg', title: 'iMac và Wifi miễn phí - Free iMac and Wifi' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/4.jpeg', title: 'Khu vực Cardio với hệ thống máy Technogym thế hệ mới nhất - Cardio area with the latest generation of Technogym machines' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/5.jpg', title: 'Máy Cardio tích hợp internet, truyền hình cáp, kết nối tai nghe bluetooth và sạc không dây - Cardio machine with integrated internet, cable TV, bluetooth headset connection and wireless charging' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/6.jpg', title: 'Lồng bát giác MMA - MMA Octagon cage' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/7.jpg', title: 'Khu vực tạ với hệ thống máy Technogym mới nhất - Weights area with a wide range of latest Technogym machine' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/8.jpg', title: 'Khu vực tạ với hệ thống máy Technogym mới nhất - Weights area with a wide range of latest Technogym machine' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/9.jpg', title: 'Tạ đơn khối lượng từ 2kg đến 40kg - Dumbbells from 2kg to 40kg' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/10.jpg', title: 'Đường chạy bộ và xe trượt tuyết - Gym Running and Sled Track' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/11.jpg', title: 'Dàn máy Queenax và khu vực tập chức năng - Queenax and Functional training area' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/12.jpg', title: 'Khu vực giãn cơ và trị liệu - Stretching and therapy area' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/13.jpg', title: 'Phòng tập GroupX với hệ thống âm thanh ánh sáng chuẩn Quốc Tế, đa dạng các lớp học đăng ký bản quyền của Lesmills - GroupX studio with international standard sound and light system, a variety of classes registered with Lesmills copyright' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/14.jpg', title: 'Phòng tập Yoga bao trùm bởi không gian xanh - Yoga studio surrounded by green yoga studio surrounded by green and fresh space' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/15.jpg', title: 'Phòng đạp xe với trang thiết bị hiện đại nhất - Cycling studio with the most modern equipment' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/16.jpg', title: 'Hệ thống tủ an toàn riêng biệt cho các vật dụng có giá trị, tích hợp sạc điện thoại và camera theo dõi - Separated safety box for valuables, integrated phone charger and surveillance camera' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/17.jpg', title: 'Bàn trang điểm - Vanity area' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/20.jpg', title: 'Hệ thống nước uống tinh khiết được trang bị quanh CLB - Purified drinking water system available around the club' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/19.jpg', title: 'Bể bơi bốn mùa với công nghệ lọc nước hiện đại - Heated swimming pool with modern water purification technology' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/18.jpg', title: 'Khu vực thư giãn tại bể bơi - Relaxing area at the swimming pool' },
    ],
    2: [
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/BaTrieu/BT/1.jpg', title: '' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/BaTrieu/BT/2.jpg', title: '' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/BaTrieu/BT/3.jpg', title: '' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/BaTrieu/BT/4.jpg', title: '' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/BaTrieu/BT/5.jpg', title: '' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/BaTrieu/BT/6.jpg', title: '' },
    ],
    
    3: [
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/NTThanh/10.jpg', title: 'Welcom to Elite' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/NTThanh/9.jpg', title: 'Quầy lễ tân' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/NTThanh/1.jpg', title: 'Cycling - Đốt cháy năng lượng, tăng sức mạnh đôi chân' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/NTThanh/3.jpg', title: 'Phòng tập view triệu đô' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/NTThanh/2.jpg', title: 'Tường leo núi cao 7m' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/NTThanh/4.jpg', title: 'Phòng tập view triệu đô' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/NTThanh/5.jpg', title: 'Bể bơi bốn mùa đạt tiêu chuẩn' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/NTThanh/6.jpg', title: 'Locker luôn được giữ gìn sạch đẹp' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/NTThanh/7.jpg', title: 'Phòng tập view triệu đô' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/NTThanh/8.jpg', title: 'Lồng boxing lớn nhất hệ thống' },
    ],
    4: [
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/PNThach/1.jpg', title: 'Bể sục nóng thư giãn sau buổi tập - Hot jacuzzi to relax after training' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/PNThach/2.jpg', title: 'Bể bơi bốn mùa với công nghệ lọc nước hiện đại - Heated swimming pool with modern water purification technology' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/PNThach/3.jpg', title: 'Phòng tập yoga view toàn thành phố - Yoga studio with city view' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/PNThach/4.jpg', title: 'Phòng tập yoga view toàn thành phố - Yoga studio with city view' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/PNThach/5.jpg', title: 'Dàn máy Queenax và khu vực tập chức năng - Queenax and Functional training area' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/PNThach/6.jpg', title: 'Lồng bát giác MMA - MMA Octagon cage' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/PNThach/7.jpg', title: 'Lồng bát giác MMA - MMA Octagon cage' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/PNThach/8.jpg', title: 'Khu vực tạ tập tạ rời đầy đủ thiết bị - Weightlifting area with full equipment' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/PNThach/9.jpg', title: 'Tạ đơn khối lượng từ 2kg đến 40kg - Dumbbells from 2kg to 40kg' },
      { url: 'http://127.0.0.1:9000/gym/assets/Clubs/PNThach/10.jpg', title: 'Khu vực tạ máy với hệ thống máy Technogym mới nhất - Weights area with a wide range of latest Technogym machine' },
    ],

  };
  
  // Mapping video theo ID branch (nếu API không trả về mảng video)
  branchVideoMapping: { [key: number]: BranchVideo[] } = {
    1: [
      { videoUrl: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/vid1.mp4', position: 'top' },
      { videoUrl: 'http://127.0.0.1:9000/gym/assets/Clubs/XuanDieu/Ultilities/vid2.mp4', position: 'middle' },
    ],
    2: [
      { videoUrl: 'http://127.0.0.1:9000/gym/assets/Clubs/BaTrieu/vid1.mp4', position: 'top' },
      // { videoUrl: 'http://127.0.0.1:9000/gym/assets/Branch2/video_bottom.mp4', position: 'bottom' }
    ],
    3: [
      { videoUrl: 'http://127.0.0.1:9000/gym/assets/Clubs/NTThanh/vid1.mp4', position: 'top' },
      { videoUrl: 'http://127.0.0.1:9000/gym/assets/Clubs/NTThanh/vid2.mp4', position: 'middle' },
    ],
    4: [
      { videoUrl: 'http://127.0.0.1:9000/gym/assets/Clubs/PNThach/vid1.mp4', position: 'top' },
      { videoUrl: 'http://127.0.0.1:9000/gym/assets/Clubs/PNThach/vid2.mp4', position: 'middle' },
    ],
  };

  constructor(
    private route: ActivatedRoute,
    private branchService: BranchService,
    private employeeService: EmployeeService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    // Lấy ID branch từ URL, ví dụ: /branch/1
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.branchService.getBranch(id).subscribe({
        next: (data: Branch) => {
          this.branch = data;
          // Gán carouselImages nếu có mapping (hoặc lấy từ API)
          if (this.branch && this.gymAmenitiesMapping[this.branch.id]) {
            this.carouselImages = this.gymAmenitiesMapping[this.branch.id];
          }
          const url = this.branchMapMapping[id] || "";
          this.branchMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          // Gán branchVideos nếu có mapping
          if (this.branch && this.branchVideoMapping[this.branch.id]) {
            this.branchVideos = this.branchVideoMapping[this.branch.id];
          }
        },
        error: (err) => {
          console.error('Lỗi lấy dữ liệu chi nhánh:', err);
        }
      });
      this.employeeService.getEmployeesByBranch(id).subscribe({
        next: (data: Employee[]) => {
          this.employees = data;
        },
        error: (err) => {
          console.error('Lỗi lấy danh sách nhân viên:', err);
        }
      });
    }
  }

  // Hàm chuyển ảnh trong carousel
  prevImage() {
    if (this.carouselImages.length) {
      this.currentIndex = (this.currentIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
    }
  }

  nextImage() {
    if (this.carouselImages.length) {
      this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
    }
  }

  goToImage(i: number) {
    this.currentIndex = i;
  }

  // Hàm helper lấy video theo vị trí (trả về video hoặc undefined)
  getVideoByPosition(position: 'top' | 'middle' | 'bottom'): BranchVideo | undefined {
    return this.branchVideos.find(v => v.position === position);
  }
}
