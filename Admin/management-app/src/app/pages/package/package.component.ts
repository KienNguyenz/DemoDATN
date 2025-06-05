// src/app/pages/packages/package.component.ts
import { Component, OnInit } from '@angular/core';
import { ShareModule } from '../../ShareModule';
import { Package, PackageService } from '../../services/package.service';
import { Branch, BranchService } from '../../services/branch.service';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-package',
  standalone: true,
  imports: [
    ShareModule,
  ],
  templateUrl: './package.component.html',
  styleUrls: ['../../app.component.scss']
})
export class PackageComponent implements OnInit {
  packages: Package[] = [];
  filtered: Package[] = [];
  searchValue = '';

  branches: Branch[] = [];
  selectedBranch: number | null = null;
  statusOptions: { label: string; value: boolean }[] = [
    { label: 'Hoạt động', value: true },
    { label: 'Ngưng hoạt động', value: false }]
  // pagination
  pageIndex = 1;
  pageSize = 10;
  get pagedPackages(): Package[] {
    const start = (this.pageIndex - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  isModalVisible = false;
  isAddMode = true;
  editingItem: Package = {
    id: 0,
    packageName: '',
    price: 0,
    duration: '',
    branchId: 0,
    describe: '',
    isActive: true
  };

  constructor(private svc: PackageService,
    private branchSvc: BranchService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
     this.branchSvc.getBranchs().subscribe(bs => {
      this.branches = bs;
      if (this.branches.length > 0 && this.selectedBranch === null) {
        this.selectedBranch = this.branches[0].id;
      }
    });
    this.load();
  }

  private load(): void {
    this.svc.getAll().subscribe(list => {
      this.packages = list;
      this.applyFilters();
    });
  }

  private applyFilters(): void {
    let result = [...this.packages];

    // filter theo branch nếu chọn
    if (this.selectedBranch !== null) {
      result = result.filter(p => p.branchId === this.selectedBranch);
    }

    // filter theo tên gói
    const kw = this.searchValue.trim().toLowerCase();
    if (kw) {
      result = result.filter(p =>
        p.packageName.toLowerCase().includes(kw)
      );
    }

    this.filtered = result;
    this.pageIndex = 1;
  }

  // handlers
  search(): void {
    this.applyFilters();
  }

  onBranchChange(id: number | null): void {
    this.selectedBranch = id;
    this.applyFilters();
  }

  openCreateModal(): void {
    this.isAddMode = true;
    this.editingItem = { id: 0, packageName: '', price: 0, duration: '', branchId: 0, describe: '', isActive: true };
    this.isModalVisible = true;
  }

  edit(pkg: Package): void {
    this.isAddMode = false;
    this.editingItem = { ...pkg };
    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  handleOk(): void {
    if (this.isAddMode) {
      this.svc.create(this.editingItem).subscribe(() => {
        this.load(); this.isModalVisible = false;
        this.msg.success('Thêm gói tập luyện thành công');
      });
    } else {
      this.svc.update(this.editingItem.id, this.editingItem).subscribe(() => {
        this.load(); this.isModalVisible = false;
        this.msg.success('Sửa thông tin thành công');
      });
    }
  }

  deletePackage(id: number): void {
    this.svc.delete(id).subscribe({
      next: () => {
        this.load();
        this.msg.success('Xoá thành công');
      },
      error: err => {
        console.error(err);
        this.msg.error('Không thể xoá');
      }
    });
  }
}
