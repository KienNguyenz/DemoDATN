// src/app/pages/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { forkJoin } from 'rxjs';

import { BranchService } from '../../services/branch.service';
import { EmployeeService, Employee } from '../../services/employees.service';
import { MemberService, Member } from '../../services/member.service';
import { DevicesService, Devices } from '../../services/devices.service';
import { PackageService, Package } from '../../services/package.service';
import { SalaryService, EmployeeMonthlySalaryDto } from '../../services/salary.service';
import { RevenueLogService, RevenueLog } from '../../services/revenue-log.service';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgChartsModule } from 'ng2-charts';
import { ShareModule } from '../../ShareModule';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface Activity {
  icon: string;
  text: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'primary';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ShareModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    NgChartsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // — Các biến data gốc —
  branches: Array<{ id: number; name: string; isActive: boolean }> = [];
  employees: Employee[] = [];
  members: Member[] = [];
  devices: Devices[] = [];
  allPackages: Package[] = [];
  allMonthlySalaries: EmployeeMonthlySalaryDto[] = [];
  revenueLogs: RevenueLog[] = [];

  // — Trạng thái refresh —
  isRefreshing = false;

  // — Hoạt động gần đây —
  recentActivities: Activity[] = [];

  // ============================
  // 1) BAR CHART: Nhân viên theo chi nhánh
  // ============================
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: '#4A4A4A', font: { size: 12 } },
        grid: { display: false }
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#4A4A4A', font: { size: 12 } },
        grid: { color: 'rgba(0,0,0,0.1)' }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}`
        }
      }
    }
  };
  public barChartType: 'bar' = 'bar';

  // ============================
  // 2) HORIZONTAL BAR: Thiết bị theo chi nhánh
  // ============================
  public hBarChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };
  public hBarChartOptions: ChartConfiguration<'bar'>['options'] = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: '#4A4A4A', font: { size: 12 } },
        grid: { color: 'rgba(0,0,0,0.1)' }
      },
      y: {
        ticks: { color: '#4A4A4A', font: { size: 12 } },
        grid: { display: false }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.parsed.x}`
        }
      }
    }
  };
  public hBarChartType: 'bar' = 'bar';

  // ============================
  // 3) DOUGHNUT: Nhân viên Active/Inactive
  // ============================
  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Active', 'Inactive'],
    datasets: []
  };
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#4A4A4A', boxWidth: 12, padding: 12 }
      },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.label}: ${ctx.parsed}`
        }
      }
    }
  };
  public doughnutChartType: 'doughnut' = 'doughnut';

  // ============================
  // 4) PIE: Thành viên Active/Inactive
  // ============================
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Active', 'Inactive'],
    datasets: []
  };
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#4A4A4A', boxWidth: 12, padding: 12 }
      },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.label}: ${ctx.parsed}`
        }
      }
    }
  };
  public pieChartType: 'pie' = 'pie';

  // ============================
  // 5) LINE: Lương & Doanh thu 6 tháng gần nhất
  // ============================
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        ticks: { color: '#4A4A4A', font: { size: 12 } },
        grid: { display: false }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: val => {
            if (+val >= 1_000_000) return `${(val as number / 1_000_000).toFixed(1)}M`;
            if (+val >= 1_000) return `${(val as number / 1_000).toFixed(0)}k`;
            return `${val}`;
          },
          color: '#4A4A4A',
          font: { size: 12 }
        },
        grid: { color: 'rgba(0,0,0,0.1)' }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: { color: '#4A4A4A', padding: 12 }
      },
      tooltip: {
        callbacks: {
          label: ctx => {
            const label = ctx.dataset.label || '';
            return `${label}: ${ctx.parsed.y}`;
          }
        }
      }
    }
  };
  public lineChartType: 'line' = 'line';

  constructor(
    private branchSrv: BranchService,
    private empSrv: EmployeeService,
    private memberSrv: MemberService,
    private devicesSrv: DevicesService,
    private packageSrv: PackageService,
    private salarySrv: SalaryService,
    private revenueLogSrv: RevenueLogService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.generateRecentActivities();
  }

  /** =========================
   *  Load data và chuẩn bị cho từng chart
   * ========================= */
  private loadDashboardData(): void {
    forkJoin({
      branches: this.branchSrv.getBranchs(),
      employees: this.empSrv.getAllEmployees(),
      members: this.memberSrv.getAll(),
      devices: this.devicesSrv.getAll(),
      packages: this.packageSrv.getAll(),
      salaries: this.salarySrv.getAllMonthlySalaries(),
      revenueLogs: this.revenueLogSrv.getAll()
    }).subscribe(
      ({ branches, employees, members, devices, packages, salaries, revenueLogs }) => {
        // Gán dữ liệu gốc
        this.branches = branches;
        this.employees = employees;

        // Chuyển các ngày string => Date object
        this.members = members.map(m => ({
          ...m,
          createDate: m.createDate ? new Date(m.createDate) : null,
          updateDate: m.updateDate ? new Date(m.updateDate) : null,
          dueDate:    m.dueDate    ? new Date(m.dueDate)    : null
        }));
        this.devices = devices;
        this.allPackages = packages;
        this.allMonthlySalaries = salaries;

        // Đảm bảo revenueLogs.date là Date object
        this.revenueLogs = revenueLogs.map(r => ({
          ...r,
          date: r.date ? new Date(r.date) : new Date()
        }));

        // Sắp xếp branches theo tên
        this.branches.sort((a, b) => a.name.localeCompare(b.name));

        // Chuẩn bị data cho từng chart
        this.prepareBarChart();
        this.prepareHBarChart();
        this.prepareDoughnutChart();
        this.preparePieChart();
        this.prepareLineChart();
      }
    );
  }

  // —––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––—
  // 1) CHUẨN BỊ BAR CHART: Số nhân viên / chi nhánh
  private prepareBarChart(): void {
    const countByBranch = new Map<number, number>();
    this.branches.forEach(b => countByBranch.set(b.id, 0));
    this.employees.forEach(e => {
      const prev = countByBranch.get(e.branchId) ?? 0;
      countByBranch.set(e.branchId, prev + 1);
    });

    const labels = this.branches.map(b => b.name);
    const data = this.branches.map(b => countByBranch.get(b.id) ?? 0);

    this.barChartData = {
      labels,
      datasets: [
        {
          data,
          label: 'Nhân viên',
          backgroundColor: [
            '#3498db', '#e74c3c', '#f1c40f', '#27ae60',
            '#9b59b6', '#e67e22', '#1abc9c', '#2c3e50'
          ],
          borderRadius: 4
        }
      ]
    };
  }

  // —––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––—
  // 2) CHUẨN BỊ HORIZONTAL BAR CHART: Số thiết bị / chi nhánh
  private prepareHBarChart(): void {
    const countByBranch = new Map<number, number>();
    this.branches.forEach(b => countByBranch.set(b.id, 0));
    this.devices.forEach(d => {
      const prev = countByBranch.get(d.branchId) ?? 0;
      countByBranch.set(d.branchId, prev + 1);
    });

    const labels = this.branches.map(b => b.name);
    const data = this.branches.map(b => countByBranch.get(b.id) ?? 0);

    this.hBarChartData = {
      labels,
      datasets: [
        {
          data,
          label: 'Thiết bị',
          backgroundColor: [
            '#9b59b6', '#2ecc71', '#3498db', '#f39c12',
            '#e74c3c', '#1abc9c', '#34495e', '#e67e22'
          ],
          borderRadius: 4
        }
      ]
    };
  }

  // —––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––—
  // 3) CHUẨN BỊ DOUGHNUT CHART: Nhân viên Active vs Inactive
  private prepareDoughnutChart(): void {
    const active   = this.employees.filter(e => e.isActive).length;
    const inactive = this.employees.filter(e => !e.isActive).length;

    this.doughnutChartData = {
      labels: ['Active', 'Inactive'],
      datasets: [
        {
          data: [active, inactive],
          backgroundColor: ['#27ae60', '#e74c3c'],
          hoverOffset: 4
        }
      ]
    };
  }

  // —––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––—
  // 4) CHUẨN BỊ PIE CHART: Thành viên Active vs Inactive
  private preparePieChart(): void {
    const active   = this.members.filter(m => m.isActive).length;
    const inactive = this.members.filter(m => !m.isActive).length;

    this.pieChartData = {
      labels: ['Active', 'Inactive'],
      datasets: [
        {
          data: [active, inactive],
          backgroundColor: ['#27ae60', '#e74c3c'],
          hoverOffset: 4
        }
      ]
    };
  }

  // —––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––—
  // 5) CHUẨN BỊ LINE CHART: Lương & Doanh thu 6 tháng gần nhất
  private prepareLineChart(): void {
    // 1) Tạo 6 nhãn tháng gần nhất (YYYY-MM)
    const now    = new Date();
    const months: string[] = [];
    for (let i = 5; i >= 0; i--) {
      const dt = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const m  = (dt.getMonth() + 1).toString().padStart(2, '0');
      months.push(`${dt.getFullYear()}-${m}`);
    }

    // 2) Mốc 6 tháng trước
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // 3) Tính tổng salary mỗi tháng (chi phí lương)
    const salaryData = months.map(label => {
      const [y, m] = label.split('-').map(Number);
      return this.allMonthlySalaries
        .filter(s => s.year === y && s.month === m)
        .reduce((sum, s) => sum + (s.salaryAmount ?? 0), 0);
    });

    // 4) Tính tổng revenue 6 tháng qua dựa vào điều kiện "date >= sixMonthsAgo"
    //    → Sau đó gom nhóm vào đúng tháng YYYY-MM để dựng chart
    const revenueData = months.map(label => {
      const [y, m] = label.split('-').map(Number);
      return this.revenueLogs
        .filter(r => {
          const d = new Date(r.date);
          // Chỉ lấy log có ngày >= sáu tháng trước
          if (d < sixMonthsAgo) return false;
          // Sau đó kiểm tra xem có trong đúng năm/tháng tương ứng
          return d.getFullYear() === y && (d.getMonth() + 1) === m;
        })
        .reduce((sum, r) => sum + (r.price ?? 0), 0);
    });

    // 5) Gán datasets gồm 2 dòng (Lương vs Doanh thu)
    this.lineChartData = {
      labels: months,
      datasets: [
        {
          data: salaryData,
          label: 'Lương đã trả',
          borderColor: '#e74c3c',
          backgroundColor: 'rgba(231,76,60,0.2)',
          pointBackgroundColor: '#c0392b',
          tension: 0.4,
          fill: true
        },
        {
          data: revenueData,
          label: 'Doanh thu',
          borderColor: '#27ae60',
          backgroundColor: 'rgba(39,174,96,0.2)',
          pointBackgroundColor: '#16a085',
          tension: 0.4,
          fill: true
        }
      ]
    };
  }

  // ============================
  // TÍNH TỔNG CHI PHÍ LƯƠNG VÀ DOANH THU
  // ============================
  getTotalSalaryPaid(): number {
    const ds = this.lineChartData.datasets[0]?.data as number[] || [];
    return ds.reduce((a, b) => a + (b || 0), 0);
  }
  getTotalRevenue(): number {
    const ds = this.lineChartData.datasets[1]?.data as number[] || [];
    return ds.reduce((a, b) => a + (b || 0), 0);
  }

  // ============================
  // HELPER CHO TEMPLATE
  // ============================
   getMaintenanceDevices(): number {
    return this.devices.filter(d => d.isActive === false).length;
  }
  getEmployeesByBranch(branchId: number): number {
    return this.employees.filter(e => e.branchId === branchId).length;
  }
  getDevicesByBranch(branchId: number): number {
    return this.devices.filter(d => d.branchId === branchId).length;
  }
  getMembersByBranch(branchId: number): number {
    return this.members.filter(m => m.branchId === branchId).length;
  }

  // ============================
  // PHƯƠNG THỨC “refreshData”
  // ============================
  refreshData(): void {
    this.isRefreshing = true;
    this.loadDashboardData();
    setTimeout(() => {
      this.isRefreshing = false;
    }, 1000);
  }

  // ============================
  // TẠO MẪU “Hoạt động gần đây”
  // ============================
  private generateRecentActivities(): void {
    this.recentActivities = [
      { icon: 'person_add',     text: 'Thêm 5 thành viên mới',     time: '2 giờ trước', type: 'success' },
      { icon: 'fitness_center', text: 'Bảo trì 3 thiết bị',         time: '5 giờ trước', type: 'warning' },
      { icon: 'people',         text: 'Tuyển dụng 2 nhân viên',      time: '1 ngày trước', type: 'info' },
      { icon: 'business',       text: 'Mở chi nhánh mới: Hoàng Mai', time: '2 ngày trước', type: 'primary' },
    ];
  }
}
