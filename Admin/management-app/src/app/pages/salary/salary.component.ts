import { Component, OnInit } from '@angular/core';
import { ShareModule } from '../../ShareModule';
import { Employee, EmployeeService } from '../../services/employees.service';
import { Branch, BranchService } from '../../services/branch.service';
import { SalaryService, EmployeeMonthlySalaryDto } from '../../services/salary.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RevenueLogService, CreateRevenueLogDTO } from '../../services/revenue-log.service';
import { PackageService, Package } from '../../services/package.service';

interface EmployeeSalaryView {
  id: number;
  name: string;
  role?: string;
  branchId: number;
  workingDaysInMonth: number;
  salaryInMonth: number;
  isActive: boolean;
  packageId: number | null; // Mỗi nhân viên có packageId
}

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './salary.component.html',
  styleUrls: ['../../app.component.scss']
})
export class SalaryComponent implements OnInit {
  allEmployees: Employee[] = [];
  allBranches: Branch[] = [];
  allPackages: Package[] = [];
  allMonthlySalaries: EmployeeMonthlySalaryDto[] = [];

  employeesView: EmployeeSalaryView[] = [];
  filteredView: EmployeeSalaryView[] = [];

  selectedDate: Date = new Date();
  currentMonth = this.selectedDate.getMonth() + 1;
  currentYear = this.selectedDate.getFullYear();

  selectedBranch: number | null = null;
  searchValue = '';

  pageIndex = 1;
  pageSize = 10;

  isModalVisible = false;
  editingItem: EmployeeSalaryView | null = null;

  constructor(
    private employeeSvc: EmployeeService,
    private branchSvc: BranchService,
    private packageSvc: PackageService,
    private salarySvc: SalaryService,
    private revenueLogSvc: RevenueLogService,
    private notif: NzNotificationService
  ) {}

  ngOnInit(): void {
    // 1) Load danh sách chi nhánh
    this.branchSvc.getBranchs().subscribe({
      next: bs => this.allBranches = bs,
      error: () => this.notif.error('Lỗi', 'Không tải được danh sách chi nhánh')
    });

    // 2) Load danh sách package
    this.packageSvc.getAll().subscribe({
      next: pkgs => this.allPackages = pkgs,
      error: () => this.notif.error('Lỗi', 'Không tải được danh sách gói')
    });

    // 3) Load nhân viên + lương tháng
    this.loadAllData();
  }

  loadAllData(): void {
    this.employeeSvc.getAllEmployees().subscribe({
      next: emps => {
        this.allEmployees = emps;
        this.salarySvc.getAllMonthlySalaries().subscribe({
          next: salaries => {
            this.allMonthlySalaries = salaries;
            this.mergeData();
            this.applyFilters();
          },
          error: () => this.notif.error('Lỗi', 'Không tải được dữ liệu lương tháng')
        });
      },
      error: () => this.notif.error('Lỗi', 'Không tải được danh sách nhân viên')
    });
  }

  mergeData(): void {
    const month = this.currentMonth;
    const year = this.currentYear;
    const salariesThisMonth = this.allMonthlySalaries.filter(ms =>
      ms.month === month && ms.year === year
    );

    this.employeesView = this.allEmployees.map(emp => {
      // Mỗi Employee có packageId
      const pkgId = (emp as any).packageId ?? null;

      // Tìm bản ghi salary tháng này cho nhân viên
      const found = salariesThisMonth.find(ms => ms.employeeId === emp.id);
      return {
        id: emp.id,
        name: emp.name,
        role: emp.role,
        branchId: emp.branchId,
        workingDaysInMonth: found ? found.workingDays : 0,
        salaryInMonth: found ? found.salaryAmount : 0,
        isActive: emp.isActive,
        packageId: pkgId
      };
    });
  }

  applyFilters(): void {
    let result = [...this.employeesView];
    if (this.selectedBranch !== null) {
      result = result.filter(e => e.branchId === this.selectedBranch);
    }
    const kw = this.searchValue.trim().toLowerCase();
    if (kw) {
      result = result.filter(e =>
        e.name.toLowerCase().includes(kw) ||
        (e.role ?? '').toLowerCase().includes(kw)
      );
    }
    this.filteredView = result;
    this.pageIndex = 1;
  }

  search(): void {
    this.applyFilters();
  }

  onBranchChange(id: number | null): void {
    this.selectedBranch = id;
    this.applyFilters();
  }

  onMonthChange(date: Date): void {
    if (!date) return;
    this.selectedDate = date;
    this.currentMonth = date.getMonth() + 1;
    this.currentYear = date.getFullYear();
    this.mergeData();
    this.applyFilters();
  }

  get pagedEmployees(): EmployeeSalaryView[] {
    const start = (this.pageIndex - 1) * this.pageSize;
    return this.filteredView.slice(start, start + this.pageSize);
  }

  edit(item: EmployeeSalaryView): void {
    this.editingItem = { ...item };
    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.editingItem = null;
  }

  /**
   * Tính lương dự kiến
   */
  getPreviewSalary(): number {
    if (!this.editingItem) {
      return 0;
    }
    const d = this.editingItem.workingDaysInMonth;
    let val = 0;
    switch (this.editingItem.role) {
      case 'Club Manager':
        val = d * 1000000;
        break;
      case 'Sales Manager':
      case 'Fitness Manager':
        val = d * 600000;
        break;
      case 'PT':
      case 'Receptionist':
        val = d * 300000;
        break;
      default:
        val = 0;
    }
    return val;
  }

  async handleOk(): Promise<void> {
    if (!this.editingItem) return;
    const emp = this.editingItem;
    const empId = emp.id;
    const month = this.currentMonth;
    const year = this.currentYear;
    const newWorkingDays = emp.workingDaysInMonth;
    const newSalaryAmount = this.getPreviewSalary();

    // Tìm salary record hiện tại nếu có
    const existingMs = this.allMonthlySalaries.find(
      ms => ms.employeeId === empId && ms.month === month && ms.year === year
    );

    // Lấy packageId và price của nhân viên
    const pkgId = emp.packageId;
    const pkg = pkgId ? this.allPackages.find(p => p.id === pkgId) : null;
    const packagePrice = pkg ? pkg.price : 0;

    if (existingMs) {
      // Cập nhật lương
      const body = {
        employeeId: empId,
        month: month,
        year: year,
        workingDays: newWorkingDays
      };
      this.salarySvc.getSalaryByEmployeeAndMonth(empId, month, year).subscribe({
        next: msDto => {
          this.salarySvc.updateMonthlySalary(msDto.id, body).subscribe({
            next: () => {
              // Sau khi cập nhật lương thành công, tạo RevenueLog
              const log: CreateRevenueLogDTO = {
                employeeId: empId,
                packageId: pkgId ?? 0,
                price: packagePrice,
                date: new Date() // ngày ghi nhận doanh thu
              };
              this.revenueLogSvc.create(log).subscribe({
                next: () => {
                  this.notif.success('Thành công', 'Cập nhật lương & ghi nhận doanh thu thành công');
                  this.loadAllData();
                  this.isModalVisible = false;
                },
                error: () => {
                  this.notif.error('Lỗi', 'Không thể ghi nhận doanh thu');
                  this.loadAllData();
                  this.isModalVisible = false;
                }
              });
            },
            error: () => {
              this.notif.error('Lỗi', 'Không thể cập nhật lương');
            }
          });
        },
        error: () => {
          this.notif.error('Lỗi', 'Không tìm thấy thông tin lương để cập nhật');
        }
      });
    } else {
      // Tạo mới lương
      const bodyPost = {
        employeeId: empId,
        month: month,
        year: year,
        workingDays: newWorkingDays
      };
      this.salarySvc.createMonthlySalary(bodyPost).subscribe({
        next: () => {
          // Sau khi tạo lương thành công, ghi RevenueLog
          const log: CreateRevenueLogDTO = {
            employeeId: empId,
            packageId: pkgId ?? 0,
            price: packagePrice,
            date: new Date()
          };
          this.revenueLogSvc.create(log).subscribe({
            next: () => {
              this.notif.success('Thành công', 'Tạo lương & ghi nhận doanh thu thành công');
              this.loadAllData();
              this.isModalVisible = false;
            },
            error: () => {
              this.notif.error('Lỗi', 'Không thể ghi nhận doanh thu');
              this.loadAllData();
              this.isModalVisible = false;
            }
          });
        },
        error: () => {
          this.notif.error('Lỗi', 'Không thể tạo mới lương');
        }
      });
    }
  }

  get isEditingAllowed(): boolean {
    const today = new Date();
    const actualMonth = today.getMonth() + 1;
    const actualYear = today.getFullYear();
    return this.currentMonth === actualMonth && this.currentYear === actualYear;
  }

  getBranchName(id: number): string {
    return this.allBranches.find(b => b.id === id)?.name || '';
  }
}
