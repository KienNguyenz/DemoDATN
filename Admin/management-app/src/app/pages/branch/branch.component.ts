// src/app/pages/branch/branch.component.ts
import { Component, OnInit } from '@angular/core';
import { BranchService, Branch } from '../../services/branch.service';
import { EmployeeService, Employee } from '../../services/employees.service';
import { ShareModule } from '../../ShareModule';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [ShareModule, CommonModule, FormsModule],
  templateUrl: './branch.component.html',
  styleUrls: ['../../app.component.scss']
})
export class BranchComponent implements OnInit {
  branches: Branch[] = [];
  filteredBranches: Branch[] = [];
  employees: Employee[] = [];
  searchValue: string = '';
  isEditVisible = false;
  editingBranch: Branch | null = null;
  isAddMode = false;
  selectedManagerId: number | null = null;
  selectedManagerPhone: string = '';
  managerOptions: { label: string; value: number }[] = [];
  statusOptions: { label: string; value: boolean }[] = [
    { label: 'Hoạt động', value: true },
    { label: 'Ngưng hoạt động', value: false }]

  constructor(
    private branchService: BranchService,
    private employeeService: EmployeeService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    // GET /api/Branch (AllowAnonymous) – không cần token
    this.branchService.getBranchs().subscribe((branches) => {
      this.branches = branches;
      this.filteredBranches = branches;

      // GET employees (có thể bảo vệ hoặc không tùy bạn)
      this.employeeService.getAllEmployees().subscribe((employees) => {
        this.employees = employees;
        this.managerOptions = this.employees
          .filter(e => e.role === 'Club Manager')
          .map(e => ({ label: e.name, value: e.id }));
      });
    });
  }

  getBranchMemberCount(branchId: number): number {
    return this.employees.filter(emp => emp.branchId === branchId).length;
  }

  getBranchManagerName(branchId: number): string {
    const manager = this.employees.find(emp => emp.branchId === branchId && emp.role === 'Club Manager');
    return manager?.name || '--';
  }

  getBranchManagerPhone(branchId: number): string {
    const manager = this.employees.find(emp => emp.branchId === branchId && emp.role === 'Club Manager');
    return manager?.phoneNumber || '--';
  }

  search(): void {
    const keyword = this.searchValue.toLowerCase();
    this.filteredBranches = this.branches.filter(branch =>
      branch.name.toLowerCase().includes(keyword) ||
      branch.address.toLowerCase().includes(keyword)
    );
  }

  private getNextId(): number {
    if (this.branches.length === 0) {
      return 1;
    }
    return Math.max(...this.branches.map(b => b.id)) + 1;
  }

  openCreateModal(): void {
    this.isAddMode = true;
    const next = this.getNextId();
    this.editingBranch = {
      id: next,
      name: '',
      address: '',
      hotline: '',
      zalolink: '',
      imageUrl: '',
      description: '',
      isActive: true,
    };
    this.isEditVisible = true;
  }

  editBranch(branch: Branch): void {
    this.isAddMode = false;
    this.editingBranch = { ...branch };

    const manager = this.employees.find(
      emp => emp.branchId === branch.id && emp.role === 'Club Manager'
    );
    this.selectedManagerId = manager?.id ?? null;
    this.selectedManagerPhone = manager?.phoneNumber ?? '';
    this.isEditVisible = true;
  }

  handleEditOk(): void {
    if (!this.editingBranch) return;

    if (this.isAddMode) {
      // POST /api/Branch (cần JWT để gán CreateBy)
      this.branchService.createBranch(this.editingBranch).subscribe({
        next: () => {
          this.loadBranches();
          this.isEditVisible = false;
          this.msg.success('Thêm chi nhánh thành công');
        },
        error: err => {
          console.error(err);
          this.msg.error('Không thể thêm chi nhánh: ' + err.message);
        }
      });
    } else {
      // PUT /api/Branch/{id} (cần JWT để gán UpdateBy)
      this.branchService.updateBranch(this.editingBranch.id, this.editingBranch).subscribe({
        next: () => {
          this.loadBranches();
          this.isEditVisible = false;
          this.msg.success('Sửa chi nhánh thành công');
        },
        error: err => {
          console.error(err);
          this.msg.error('Không thể sửa chi nhánh: ' + err.message);
        }
      });
    }
  }

  handleEditCancel(): void {
    this.isEditVisible = false;
    this.editingBranch = null;
  }

  deleteBranch(branchId: number): void {
    this.branchService.deleteBranch(branchId).subscribe({
      next: () => {
        this.loadBranches();
        this.msg.success('Xoá thành công');
      },
      error: err => {
        console.error(err);
        this.msg.error('Không thể xoá chi nhánh: ' + err.message);
      }
    });
  }
}
