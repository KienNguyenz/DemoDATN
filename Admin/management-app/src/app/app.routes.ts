// src/app/app.routes.ts
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent }    from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BranchComponent }    from './pages/branch/branch.component';
import { StaffComponent }     from './pages/staff/staff.component';
import { PackageComponent }   from './pages/package/package.component';
import { RoomComponent }      from './pages/room/room.component';
import { DeviceComponent }    from './pages/device/device.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { MemberComponent } from './pages/member/member.component';
import { SalaryComponent } from './pages/salary/salary.component';

export const routes: Routes = [
     { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard',  component: DashboardComponent },
      { path: 'branches',   component: BranchComponent   },
      { path: 'staff',      component: StaffComponent    },
      { path: 'member',  component: MemberComponent },
      { path: 'packages',   component: PackageComponent  },
      { path: 'rooms',      component: RoomComponent     },
      { path: 'devices',    component: DeviceComponent   },
      { path: 'salary',    component: SalaryComponent   },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // Bắt đầu từ đầu trang khi chuyển route
      anchorScrolling: 'enabled',           // Duyệt đến anchor nếu có
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}