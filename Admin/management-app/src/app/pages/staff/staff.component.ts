// src/app/pages/staff/staff.component.ts
import { Component, OnInit } from '@angular/core';
import { ShareModule } from '../../ShareModule';
import { CreateEmployee, Employee, EmployeeService } from '../../services/employees.service';
import { Branch, BranchService } from '../../services/branch.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [
    ShareModule,
  ],
  templateUrl: './staff.component.html',
  styleUrls: ['../../app.component.scss']
})
export class StaffComponent implements OnInit {
  staff: Employee[] = [];
  branches: Branch[] = [];
  filteredStaff: Employee[] = [];
  searchValue = '';
  selectedBranch: number | null = null;
  pageIndex = 1;
  pageSize = 10;
  statusOptions: { label: string; value: boolean }[] = [
    { label: 'Hoạt động', value: true },
    { label: 'Ngưng hoạt động', value: false }]

  get pagedStaff(): Employee[] {
    const start = (this.pageIndex - 1) * this.pageSize;
    return this.filteredStaff.slice(start, start + this.pageSize);
  }

  // trạng thái modal
  isModalVisible = false;
  isAddMode = true;

  // KHỞI TẠO luôn để không bị undefined
  editingEmployee: Employee = {
    id: 0,
    name: '',
    address: '',
    branchId: 0,
    birthday: new Date(),
    phoneNumber: '',
    gender: '',
    nickName: '',
    role: '',
    describe: '',
    strength: '',
    pictureUrl: '',
    isActive: true,

  };
  private getNextId(): number {
    if (this.staff.length === 0) {
      return 1;
    }
    return Math.max(...this.staff.map(b => b.id)) + 1;
  }
  constructor(private employeeService: EmployeeService,
    private branchService: BranchService,
    private msg: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.branchService.getBranchs().subscribe(list => {
      this.branches = list;
    });
    this.loadStaff();
  }

  private loadStaff(): void {
    this.employeeService.getAllEmployees().subscribe(list => {
      this.staff = list;
      this.applyFilters();
      this.pageIndex = 1;
    });
  }

  private applyFilters(): void {
    let result = [...this.staff];

    // 1) filter theo branch nếu đã chọn
    if (this.selectedBranch !== null) {
      result = result.filter(emp => emp.branchId === this.selectedBranch);
    }

    // 2) filter theo keyword
    // const kw = this.searchValue.trim().toLowerCase();
    // if (kw) {
    //   result = result.filter(emp =>
    //     emp.name.toLowerCase().includes(kw) ||
    //     (emp.role  ?? '').toLowerCase().includes(kw) ||
    //     emp.address.toLowerCase().includes(kw)
    //   );
    // }
    const kw = this.searchValue.trim().toLowerCase();
    if (kw) {
      result = result.filter(emp =>
        emp.name.toLowerCase().includes(kw)
        || emp.role?.toLowerCase().includes(kw)
      );
    }
    this.filteredStaff = result;
    this.pageIndex = 1;
  }

  /** Khi searchValue thay đổi */
  search(): void {
    this.applyFilters();
  }

  /** Khi chọn chi nhánh mới */
  onBranchChange(id: number | null): void {
    this.selectedBranch = id;
    this.applyFilters();
  }

  openCreateModal(): void {
    this.isAddMode = true;
    const next = this.getNextId();
    // reset form về object rỗng
    this.editingEmployee = {
      id: next,
      name: '',
      address: '',
      branchId: 1,
      birthday: new Date(),
      phoneNumber: '',
      gender: '',
      nickName: '',
      role: '',
      describe: '',
      strength: '',
      pictureUrl: '',
      isActive: true,
    };
    this.isModalVisible = true;
  }

  editStaff(emp: Employee): void {
    this.isAddMode = false;
    this.editingEmployee = { ...emp }; // clone để safe cancel
    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  handleOk(): void {
    if (this.isAddMode) {
      // 1) Lấy tất cả giá trị từ editingEmployee
      const e = this.editingEmployee;

      // 2) Tạo DTO chuyển birthday sang chuỗi "YYYY-MM-DD"
      const dto: CreateEmployee = {
        name: e.name,
        nickName: e.nickName,
        describe: e.describe,
        strength: e.strength,
        role: e.role,
        // chuyển Date -> ISO -> lấy phần trước dấu 'T'
        birthday: e.birthday.toISOString().substring(0, 10),
        gender: e.gender,
        address: e.address,
        phoneNumber: e.phoneNumber,
        pictureUrl: e.pictureUrl,
        branchId: e.branchId,
        isActive: e.isActive,
      };

      console.log('Gửi DTO lên API:', dto);    // kiểm tra trước khi post

      this.employeeService.createEmployee(dto)
        .subscribe({
          next: () => {
            this.loadStaff();
            this.isModalVisible = false;
            this.msg.success('Thêm nhân viên thành công');
          },
          error: err => {
            console.error('Lỗi khi POST:', err);
            this.msg.error('Không thể thêm nhân viên: ' + err.message);
          }
        });
    } else {
      this.employeeService
        .updateEmployee(this.editingEmployee.id, this.editingEmployee)
        .subscribe(() => {
          this.loadStaff();
          this.isModalVisible = false;
          this.msg.success('Sửa thông tin nhân viên thành công');
        });
    }
  }
  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.loadStaff();
        this.msg.success('Xoá thành công');
      },
      error: err => {
        console.error(err);
        this.msg.error('Không thể xoá');
      }
    });
  }

}
