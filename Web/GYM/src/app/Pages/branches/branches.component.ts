import { Component } from '@angular/core';
import { Branch, BranchService } from '../../services/branch.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../app.routes';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css'
})
export class BranchesComponent {
  branch: Branch | null = null;  // Lưu trữ thông tin chi nhánh

  constructor(
    private route: ActivatedRoute,
    private branchService: BranchService
  ) {}

  ngOnInit(): void {
    // Lấy ID từ URL, ví dụ: /branch/1 -> id = 1
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam; // Ép kiểu string -> number
      this.branchService.getBranch(id).subscribe({
        next: (data: Branch) => {
          this.branch = data;
        },
        error: (err) => {
          console.error('Lỗi lấy dữ liệu chi nhánh:', err);
        }
      });
    }
  }
}
