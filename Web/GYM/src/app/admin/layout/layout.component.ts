import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ShareModule } from '../ShareModule';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [
    ShareModule
  ]
})
export class LayoutComponent {
  selectedKey = 'dashboard';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const current = event.urlAfterRedirects.split('/')[2];
        this.selectedKey = current || 'dashboard';
      }
    });
  }

  onMenuClick(event: any) {
    this.selectedKey = event.key;
  }
}
