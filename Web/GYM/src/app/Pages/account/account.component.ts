import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { accountDetail } from '../../interfaces/account-detail';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountDetail!: accountDetail | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.accountDetail = this.authService.getUserDetail();
  }
}
