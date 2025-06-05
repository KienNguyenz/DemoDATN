import { Component, OnInit }               from '@angular/core';
import { ShareModule }                      from '../../ShareModule';
import { Devices, DevicesService }          from '../../services/devices.service';
import { Branch, BranchService }            from '../../services/branch.service';
import { NzMessageService }                 from 'ng-zorro-antd/message';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [ ShareModule ],
  templateUrl: './device.component.html',
  styleUrls: ['../../app.component.scss']
})
export class DeviceComponent implements OnInit {
  // Raw data
  devices: Devices[]    = [];
  branches: Branch[]    = [];

  /** Danh sách các loại (type) lấy trực tiếp từ DB */
  typeOptions: string[] = [];

  // UI state
  filtered: Devices[]      = [];
  searchValue = '';
  selectedBranch: number | null = null;
  selectedType: string | null   = null;
  statusOptions: {label: string, value: boolean}[] = [
    {label: 'Hoạt động', value: true},
    {label: 'Bảo trì', value: false}
  ];

  // Pagination
  pageIndex = 1;
  pageSize  = 10;
  get pagedDevices(): Devices[] {
    const start = (this.pageIndex - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  // Modal
  isModalVisible = false;
  isAddMode      = true;
  editing: Devices = this.emptyDevice();

  constructor(
    private svc: DevicesService,
    private branchSvc: BranchService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    // 1) Load branches
    this.branchSvc.getBranchs().subscribe({
      next: bs => {
        this.branches = bs;
        if (this.branches.length > 0 && this.selectedBranch === null) {
          this.selectedBranch = this.branches[0].id;
        }
      },
      error: () => {
        this.msg.error('Không tải được danh sách chi nhánh');
      }
    });

    // 2) Load devices từ API
    this.svc.getAll().subscribe({
      next: list => {
        this.devices = list;

        // ------ MỚI: Xây dựng danh sách loại (type) từ mảng devices ------
        const allTypes = list.map(d => d.type?.trim() ?? '');
        this.typeOptions = Array.from(new Set(allTypes.filter(t => t.length > 0)));
        // -------------------------------------------------------------------

        this.applyFilters();
      },
      error: () => {
        this.msg.error('Không tải được danh sách thiết bị');
      }
    });
  }

  /** Áp bộ lọc: theo branch + theo type + tìm kiếm + phân trang */
  private applyFilters(): void {
    let data = [...this.devices];

    // filter theo branch
    if (this.selectedBranch !== null) {
      data = data.filter(d => d.branchId === this.selectedBranch);
    }

    // filter theo type (chọn 1 type cụ thể)
    if (this.selectedType) {
      data = data.filter(d => d.type === this.selectedType);
    }

    // filter theo từ khoá (search)
    const kw = this.searchValue.trim().toLowerCase();
    if (kw) {
      data = data.filter(d =>
        d.name.toLowerCase().includes(kw) ||
        d.type.toLowerCase().includes(kw)
      );
    }

    this.filtered  = data;
    this.pageIndex = 1;
  }

  search(): void        { this.applyFilters(); }
  onBranchChange(v: number | null) { this.selectedBranch = v; this.applyFilters(); }
  onTypeChange(v: string | null)   { this.selectedType   = v; this.applyFilters(); }

  openCreateModal(): void {
    this.isAddMode = true;
    this.editing   = this.emptyDevice();
    // chọn mặc định chi nhánh đầu tiên và loại đầu tiên
    this.editing.branchId = this.branches[0]?.id ?? 0;
    // Nếu muốn để type mặc định là loại thứ nhất vừa load lên
    this.editing.type     = this.typeOptions[0] ?? '';
    this.isModalVisible   = true;
  }

  editDevice(d: Devices): void {
    this.isAddMode      = false;
    this.editing        = { ...d };
    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  handleOk(): void {
    if (this.isAddMode) {
      this.svc.create(this.editing).subscribe({
        next: () => {
          this.msg.success('Thêm dụng cụ thành công');
          this.loadAndRefresh();
          this.isModalVisible = false;
        },
        error: err => {
          console.error(err);
          this.msg.error('Không thể thêm dụng cụ');
        }
      });
    } else {
      this.svc.update(this.editing.id, this.editing).subscribe({
        next: () => {
          this.msg.success('Cập nhật dụng cụ thành công');
          this.loadAndRefresh();
          this.isModalVisible = false;
        },
        error: err => {
          console.error(err);
          this.msg.error('Không thể cập nhật dụng cụ');
        }
      });
    }
  }

  delete(id: number): void {
    this.svc.delete(id).subscribe({
      next: () => {
        this.msg.success('Xoá thành công');
        this.loadAndRefresh();
      },
      error: () => this.msg.error('Không thể xoá')
    });
  }

  private loadAndRefresh(): void {
    this.svc.getAll().subscribe(list => {
      this.devices = list;

      // Sau khi load lại, cũng phải “refresh” typeOptions
      const allTypes = list.map(d => d.type?.trim() ?? '');
      this.typeOptions = Array.from(new Set(allTypes.filter(t => t.length > 0)));

      this.applyFilters();
      this.isModalVisible = false;
    });
  }

  getBranchName(id: number): string {
    return this.branches.find(b => b.id === id)?.name || '';
  }

  private emptyDevice(): Devices {
    return {
      id: 0,
      name: '',
      type: this.typeOptions[0] ?? '',
      quantity: 0,
      price: 0,
      origin: '',
      describe: '',
      branchId: 0,
      isActive: true,
    };
  }
}
