// src/app/components/member/member.component.ts
import { Component, OnInit } from '@angular/core';
import { ShareModule } from '../../ShareModule';
import { Member, MemberService } from '../../services/member.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Branch, BranchService } from '../../services/branch.service';
import { Package, PackageService } from '../../services/package.service';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './member.component.html',
  styleUrls: ['../../app.component.scss']
})
export class MemberComponent implements OnInit {
  members: Member[] = [];
  filteredMembers: Member[] = [];
  searchValue = '';
  branches: Branch[] = [];
  packages: Package[] = [];
  selectedBranch: number | null = null;
  packageOptions: { label: string; value: number; branchId: number }[] = [];
  pageIndex = 1;
  pageSize = 10;
  statusOptions: { label: string; value: boolean }[] = [
    { label: 'Hoạt động',      value: true  },
    { label: 'Ngưng hoạt động', value: false }
  ];
  get pagedMember(): Member[] {
    const start = (this.pageIndex - 1) * this.pageSize;
    return this.filteredMembers.slice(start, start + this.pageSize);
  }

  isModalVisible = false;
  isAddMode = true;

  // Khởi tạo để không bị undefined
  editingMember: Member = {
    id:            0,
    firstName:     '',
    lastName:      '',
    email:         '',
    birthday:      new Date(),
    gender:        '',
    address:       '',
    phoneNumber:   '',
    packageId:     null,
    picture:       '',
    branchId:      1,
    isActive:      false,
    createDate:    null,
    updateDate:    null,
    dueDate: null
  };

  constructor(
    private memberService: MemberService,
    private branchService: BranchService,
    private packageService: PackageService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
     this.branchService.getBranchs().subscribe(bs => {
      this.branches = bs;
      if (this.branches.length > 0 && this.selectedBranch === null) {
        this.selectedBranch = this.branches[0].id;
      }
    });

    // Load tất cả gói
    this.packageService.getAll().subscribe(pkgs => {
      this.packages = pkgs;
      this.packageOptions = pkgs.map(p => ({
        label: p.packageName,
        value: p.id,
        branchId: p.branchId
      }));
    });

    this.loadMembers();
  }

  private loadMembers(): void {
    this.memberService.getAll().subscribe(list => {
      // 1) parse birthday, createDate, updateDate về Date object
      // 2) sort theo id tăng dần
      this.members = list
        .map(m => ({
          ...m,
          birthday:    m.birthday   ? new Date(m.birthday)   : null,
          createDate:  m.createDate ? new Date(m.createDate) : null,
          updateDate:  m.updateDate ? new Date(m.updateDate) : null,
          dueDate:    m.dueDate    ? new Date(m.dueDate)    : null
        }))
        .sort((a, b) => a.id - b.id);

      this.filteredMembers = [...this.members];
      this.applyFilters();
      this.pageIndex = 1;
    });
  }

  private applyFilters(): void {
    let result = [...this.members];

    // 1) filter theo branch nếu đã chọn
    if (this.selectedBranch !== null) {
      result = result.filter(mem => mem.branchId === this.selectedBranch);
    }
    // 2) filter theo tìm kiếm (firstName, lastName, email)
    const kw = this.searchValue.trim().toLowerCase();
    if (kw) {
      result = result.filter(mem =>
        (mem.firstName   .toLowerCase().includes(kw)) ||
        (mem.lastName    .toLowerCase().includes(kw)) ||
        (mem.email       .toLowerCase().includes(kw))
      );
    }

    this.filteredMembers = result;
    this.pageIndex = 1;
  }

  onBranchChange(id: number | null): void {
    this.selectedBranch = id;
    this.applyFilters();
  }

  getBranchName(id: number | null): string {
    const b = this.branches.find(x => x.id === id);
    return b ? b.name : '';
  }

  getPackageName(id: number | null): string {
    const p = this.packages.find(x => x.id === id);
    return p ? p.packageName : '';
  }

  getPackageDuration(id: number | null): string {
    const p = this.packages.find(x => x.id === id);
    return p ? p.duration : '';
  }

  search(): void {
    this.applyFilters();
  }

  /** Lấy ID tiếp theo */
  private getNextId(): number {
    if (!this.members.length) return 1;
    return Math.max(...this.members.map(m => m.id)) + 1;
  }

  openCreateModal(): void {
    this.isAddMode = true;
    const next = this.getNextId();
    this.editingMember = {
      id:            next,
      firstName:     '',
      lastName:      '',
      email:         '',
      birthday:      new Date(),
      gender:        '',
      address:       '',
      phoneNumber:   '',
      packageId:     null,
      picture:       '',
      branchId:      1,
      isActive:      false,
      createDate:    null,
      updateDate:    null,
      dueDate: null
    };
    this.isModalVisible = true;
  }

  editMember(m: Member): void {
    this.isAddMode = false;
    this.editingMember = {
      ...m,
      birthday:   m.birthday   ? new Date(m.birthday)   : null,
      createDate: m.createDate ? new Date(m.createDate) : null,
      updateDate: m.updateDate ? new Date(m.updateDate) : null
    };
    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  handleOk(): void {
    if (this.isAddMode) {
      this.memberService.create(this.editingMember).subscribe(() => {
        this.loadMembers();
        this.isModalVisible = false;
        this.msg.success('Thêm khách hàng thành công');
      }, (err) => {
        // Có thể hiển thị lỗi server trả về (nếu thiếu packageId)
        this.msg.error('Không thể thêm. Vui lòng kiểm tra lại.');
      });
    } else {
      this.memberService.update(this.editingMember.id, this.editingMember)
        .subscribe(() => {
          this.loadMembers();
          this.isModalVisible = false;
          this.msg.success('Sửa thông tin khách hàng thành công');
        }, (err) => {
          this.msg.error('Không thể cập nhật. Vui lòng kiểm tra lại.');
        });
    }
  }

  deleteMember(id: number): void {
    this.memberService.delete(id).subscribe({
      next: () => {
        this.loadMembers();
        this.msg.success('Xoá thành công');
      },
      error: err => {
        console.error(err);
        this.msg.error('Không thể xoá');
      }
    });
  }

 onPackageChange(packageId: number | null): void {
    if (packageId === null) {
      // Nếu bỏ chọn gói, reset dueDate về null
      this.editingMember.dueDate = null;
      return;
    }
    // Tìm gói tương ứng trong this.packages
    const p = this.packages.find(x => x.id === packageId);
    if (p && p.duration) {
      // Giả sử p.duration = "30 ngày", "365 ngày",… => ta lấy phần số trước khi gặp ký tự không phải số
      // Sử dụng parseInt, parseInt sẽ đọc cho đến khi gặp ký tự không phải số rồi dừng
      const days = parseInt(p.duration, 10);
      if (!isNaN(days) && days > 0) {
        // Tính dueDate = ngày hiện tại + days
        const now = new Date();
        const due = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
        this.editingMember.dueDate = due;
      } else {
        // Nếu không parse được số hợp lệ, gán null
        this.editingMember.dueDate = null;
      }
    } else {
      // Nếu không tìm thấy p, hoặc p.duration trống, gán null
      this.editingMember.dueDate = null;
    }
  }

  // Lấy mảng packageOptions đã lọc theo branchId của editingMember
  get filteredPackageOptions(): { label: string; value: number; branchId: number }[] {
    if (this.editingMember.branchId === null) {
      return [];
    }
    return this.packageOptions.filter(opt =>
      opt.branchId === this.editingMember.branchId
    );
  }
}
