import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [MatToolbarModule, MatMenuModule,MatSnackBarModule, CommonModule,MatButtonModule, MatIconModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  constructor(private router: Router,  private viewportScroller: ViewportScroller) {}
  scrollToAnchor(sectionId: string): void {
    this.router.navigate(['/about-us'], { fragment: sectionId }).then(() => {
      this.viewportScroller.scrollToAnchor(sectionId); // Cuộn đến phần tử với ID tương ứng
    });
  }
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  fadeState: string = 'fade-in';
  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  stories = [
    {
      name: 'KHUẤT THỊ PHỤNG',
      subtitle: 'U50, hành trình giảm 10kg trong 100 ngày',
      image: 'assets/About-us/khuatthiphung1.jpg',
      alt: 'Khuatthiphung',
      content: [
        ' Mình 49 tuổi, từng mổ gối vì rách sụn chêm và vặn xoắn dây chằng. Áp lực cuộc sống và sức khỏe kém sau phẫu thuật đã khiến mình mất ngủ trường kỳ. Vì uống thuốc ngủ, tất cả quần áo trong tủ đồ chật ních không mặc được, cân nặng mình tăng vùn vụt từ 57 lên 64kg.',
        '<strong>Hành trình tìm lại sức khỏe</strong>',
        '- Mình đến Elite và bắt đầu tập luyện, nhưng sức yếu và khả năng tập trung giảm nên tự tập luyện rất khó với mình. Trong hành trình này, mình đã gặp thầy Nguyễn Thanh Hà, được thầy động viên và đồng hành tập luyện.',
        '- Nhờ sự kiên nhẫn của thầy và sự thay đổi chất lượng giấc ngủ; trong 𝟏𝟎𝟎 𝐧𝐠𝐚̀𝐲 𝐥𝐢𝐞̂𝐧 𝐭𝐮̣𝐜, mình không nghỉ buổi nào, dù nắng mưa hay bất cứ lý do gì, mỗi ngày mình đều tiêu tốn từ 700 calo đến 1000 calo vào các hoạt động thể thao.',
        '<strong>Sau 100 ngày tập luyện, vài điều mình nhận ra được đó là:</strong>',
        '- Mục đích đi tập của mình đơn giản là để ngủ được. Nhưng hóa ra khi mình tập trung vào yếu tố cốt lõi là sức khỏe bên trong, thì vẻ đẹp bên ngoài sẽ là phần thưởng tất yếu. Cách duy nhất để giảm được 10kg nhưng đặc biệt cơ tăng, mỡ giảm, không mất nước, không rụng tóc, không bị nhăn da do giảm cân đột ngột… Giảm cân mà khỏe lên, thì chỉ có tập luyện và thay đổi cách ăn uống, sinh hoạt.',
        '- Tập luyện chưa bao giờ là dễ dàng, đặc biệt với những người ở độ tuổi như mình.',
        '- Để đạt được điều gì thì cần đầu tư cả về thời gian, ý chí và phải có sự trợ giúp từ người có chuyên môn. Tìm lại giấc ngủ và giảm cân thành công là nhờ phần rất lớn ở thầy Nguyễn Thanh Hà. Cảm ơn các bạn nhân viên Elite vô cùng thân thiện, nhiệt tình. Cảm ơn đội ngũ PT luôn sẵn sàng hỗ trợ mình những lúc cần.',

      ],
    },
    {
      name: 'NGUYỄN QUANG LÂM',
      subtitle: 'Tình trạng sức khỏe xuống dốc ở tuổi 70',
      image: 'assets/About-us/quanglam.jpg',
      alt: 'QuangLam',
      content: [
        '<strong>Tình trạng sức khỏe xuống dốc ở tuổi 70 </strong>',
        '- Ở độ tuổi gần 70, sức khỏe của chú Lâm có biểu hiện xuống dốc trầm trọng và nhanh chóng. Đến thời điểm hiện tại, chú đã bị thoái hóa đốt sống ngực, cổ, khớp gối, thoát vị L4, L5 và đau nhức tê bì vùng xương cụt. Điều này khiến việc đi lại và vận động của chú gặp khá nhiều khó khăn, dẫn đến cơ thể luôn đau nhức và mỏi mệt, đêm ngủ không ngon giấc. ',
        '<strong>Hành trình tìm lại sức khỏe</strong>',
        '-Chú Lâm tình cờ bén duyên với Elite cũng như anh Ngô Hoàng - Ken sau khi tham gia một buổi trị liệu với các bạn PT của chương trình CE. Với tình hình sức khỏe hiện tại, chú Lâm chia sẻ rằng bản thân mình chỉ mong muốn có thể đi bộ khoảng 100m mà không bị đau nhức, mỏi mệt vì bây giờ cơ thể chú gặp rất nhiều bất lợi khi di chuyển, đặc biệt việc leo thang bộ gần như là không thể.',
        '-Hiểu được tình trạng sức khỏe của chú Lâm lúc bấy giờ, anh Hoàng Ken đã có một buổi trò chuyện và trao đổi ngắn giúp chú hiểu rõ hơn về giá trị của việc luyện tập trong quá trình cải thiện cơ thể mỗi ngày.',
        '<strong>Sự kiên trì sẽ tạo ra điều kì diệu</strong>',
        '-Nhờ kiên trì tập luyện mà sau khoảng 45 ngày, các vấn đề mong muốn về sức khỏe của chú Lâm đã được cải thiện đáng kể. Giờ đây chú đã di chuyển linh hoạt và dễ dàng hơn, đôi khi còn có thể chạy nhanh cũng như leo cầu thang bộ mà không sợ bị đau mỏi xương khớp. Bên cạnh đó, anh Hoàng Ken còn kết hợp đa dạng các bài tập liên quan đến phối hợp vận động để giúp chú Lâm loại bỏ bớt các vấn đề bệnh lý về tim mạch và tăng sức bền cho cơ thể.',
      ],
    },
  ];

  currentIndex = 0;

  get currentStory() {
    return this.stories[this.currentIndex];
  }

  ngOnInit() {
    setInterval(() => {
      this.changeStory();
    }, 5000); // 5 giây tự động chuyển câu chuyện
  }

  changeStory() {
    this.fadeState = 'fade-out'; // Bắt đầu hiệu ứng mờ dần
    setTimeout(() => {
      this.nextStory(); // Chuyển câu chuyện khi hiệu ứng fade-out hoàn thành
      this.fadeState = 'fade-in'; // Chuyển lại trạng thái fade-in sau đó
    }, 500); // Đợi 500ms để hoàn tất hiệu ứng mờ dần trước khi chuyển story
  }

  nextStory() {
    this.currentIndex = (this.currentIndex + 1) % this.stories.length;
  }

  previousStory() {
    this.currentIndex = (this.currentIndex - 1 + this.stories.length) % this.stories.length;
  }
}
