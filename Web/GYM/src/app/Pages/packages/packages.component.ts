import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BranchService, Branch } from '../../services/branch.service';
import { PackageService, Package } from '../../services/package.service';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [ CommonModule, FormsModule, HttpClientModule ],
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']  // nếu cần custom CSS
})
export class PackagesComponent implements OnInit {
  branches: Branch[] = [];
  packages: Package[] = [];
  filteredPackages: Package[] = [];

  selectedBranchId: number | null = null;
  selectedPackageId: number | null = null;

  constructor(
    private branchService: BranchService,
    private packageService: PackageService
  ) {}

  ngOnInit(): void {
    // Lấy danh sách chi nhánh
    this.branchService.getBranchs().subscribe({
      next: data => this.branches = data,
      error: err => console.error('Lỗi khi load branches', err)
    });

    // Lấy danh sách tất cả gói
    this.packageService.getAll().subscribe({
      next: data => this.packages = data,
      error: err => console.error('Lỗi khi load packages', err)
    });
  }

  // Khi thay đổi branch, lọc lại packages
  onBranchChange(): void {
    if (this.selectedBranchId != null) {
      this.filteredPackages = this.packages.filter(
        pkg => pkg.branchId === this.selectedBranchId
      );
    } else {
      this.filteredPackages = [];
    }
    this.selectedPackageId = null;
  }

  // Chọn gói (mỗi lần chỉ 1 gói)
  onPackageSelect(id: number): void {
    this.selectedPackageId = this.selectedPackageId === id ? null : id;
  }

  // Xử lý thanh toán
  pay(): void {
    if (!this.selectedPackageId) {
      alert('Vui lòng chọn 1 gói đăng ký trước khi thanh toán');
      return;
    }
    const pkg = this.filteredPackages.find(p => p.id === this.selectedPackageId);
    // TODO: tích hợp với payment gateway
    console.log('Thanh toán gói:', pkg);
    alert(`Bạn đã chọn gói "${pkg?.packageName}", giá ${pkg?.price} VND`);
  }
}
