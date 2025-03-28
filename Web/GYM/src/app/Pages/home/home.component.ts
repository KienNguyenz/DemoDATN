import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Branch, BranchService } from '../../services/branch.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  authService = inject(AuthService);
  branches: Branch[] = [];
  currentPage = 1;

  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    this.fetchBranchs();
  }

  fetchBranchs(): void {
    this.branchService.getBranchs().subscribe(data => {
      this.branches = data;
    });
  }
}