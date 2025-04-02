import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { accountDetail } from '../../interfaces/account-detail';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountDetail!: accountDetail | null;

  constructor(private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.getAccountDetail().subscribe({
        next: (res) => {
          this.accountDetail = res;
        },
        error: (err) => {
          console.error('Không lấy được thông tin user:', err);
          // Chuyển về home hoặc login
          this.router.navigate(['/']);
        }
      });
    }
  }
  get fullName(): string {
    return this.accountDetail ? `${this.accountDetail.lastName} ${this.accountDetail.firstName}`.trim() : '';
  }

  set fullName(value: string) {
    if (this.accountDetail) {
      if (value.endsWith(' ')) {
        return;
      }
      const parts = value.split(/\s+/);
      const firstName = parts.pop() ?? '';
      const lastName = parts.join(' ');
      this.accountDetail.firstName = firstName;
      this.accountDetail.lastName = lastName;
    }
  }


  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.accountDetail) {
          this.accountDetail.picture = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSave(): void {
    if (this.accountDetail) {
      this.authService.updateAccountDetail(this.accountDetail).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            alert('Lưu thành công!');
            window.location.href = '/'
          } else {
            alert('Lưu thất bại: ' + res.message);
            window.location.href = '/'
          }
        },
        error: (err) => {
          console.error('Lỗi cập nhật:', err);
          alert('Có lỗi khi cập nhật!');
          window.location.href = '/'
        }
      });
    }
  }

  onCancel(): void {
    // Không lưu, chỉ chuyển hướng về trang Home
    this.router.navigate(['/']);
  }
}
