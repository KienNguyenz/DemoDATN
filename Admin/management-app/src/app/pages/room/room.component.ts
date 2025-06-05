// src/app/pages/rooms/room.component.ts
import { Component, OnInit }    from '@angular/core';
import { ShareModule }           from '../../ShareModule';
import { Room, RoomService }     from '../../services/room.service';
import { Branch, BranchService } from '../../services/branch.service';
import { NzMessageService }      from 'ng-zorro-antd/message';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    ShareModule,
  ],
  templateUrl: './room.component.html',
  styleUrls: ['../../app.component.scss']
})
export class RoomComponent implements OnInit {
  rooms: Room[] = [];
  filtered: Room[] = [];
  branches: Branch[] = [];
  searchValue = '';
  selectedBranch: number | null = null; 
  statusOptions: {label: string, value: boolean}[] = [
    {label: 'Hoạt động', value: true},
    {label: 'Bảo trì', value: false},
  ]
  
  // pagination
  pageIndex = 1;
  pageSize  = 10;
  get pagedRooms(): Room[] {
    const start = (this.pageIndex - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  isModalVisible = false;
  isAddMode      = true;
  editing: Room = { id: 0, roomName: '', branchId: 0, isActive: true };

  constructor(
    private svc: RoomService,
    private branchService: BranchService,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
     this.branchService.getBranchs().subscribe(bs => {
      this.branches = bs;
      if (this.branches.length > 0 && this.selectedBranch === null) {
        this.selectedBranch = this.branches[0].id;
      }
    });
    this.load();
  }

  private load(): void {
    this.svc.getAll().subscribe(list => {
      this.rooms    = list;
      this.applyFilters();
    });
  }

  private applyFilters(): void {
    let data = [...this.rooms];

    // 1) filter theo branch
    if (this.selectedBranch !== null) {
      data = data.filter(r => r.branchId === this.selectedBranch);
    }

    // 2) filter theo từ khoá
    const kw = this.searchValue.trim().toLowerCase();
    if (kw) {
      data = data.filter(r =>
        r.roomName.toLowerCase().includes(kw) ||
        r.branchId.toString().includes(kw)
      );
    }

    this.filtered  = data;
    this.pageIndex = 1;
  }

  search(): void {
    this.applyFilters();
  }

  onBranchChange(id: number | null): void {
    this.selectedBranch = id;
    this.applyFilters();
  }

  openCreateModal(): void {
    this.isAddMode = true;
    this.editing = { id: 0, roomName: '', branchId: this.branches[0]?.id ?? 0, isActive: true };
    this.isModalVisible = true;
  }
  getBranchName(id: number): string {
    const b = this.branches.find(x => x.id === id);
    return b ? b.name : '';
  }

  editRoom(r: Room): void {
    this.isAddMode      = false;
    this.editing        = { ...r };
    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  handleOk(): void {
    if (this.isAddMode) {
      this.svc.create(this.editing).subscribe(() => {
        this.load();
        this.isModalVisible = false;
        this.msg.success('Thêm phòng thành công');
      });
    } else {
      this.svc.update(this.editing.id, this.editing).subscribe(() => {
        this.load();
        this.isModalVisible = false;
        this.msg.success('Sửa thông tin thành công');
      });
    }
  }

  deleteRoom(id: number): void {
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
