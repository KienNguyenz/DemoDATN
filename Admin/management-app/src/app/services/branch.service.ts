// src/app/services/branch.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Branch {
  id: number;
  name: string;
  hotline: string;
  address: string;
  zalolink: string;
  imageUrl: string;
  description: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private apiUrl = 'https://localhost:7045/api/Branch';

  constructor(private http: HttpClient) { }

  getBranchs(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiUrl);
  }

  getBranch(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.apiUrl}/${id}`);
  }

  createBranch(branch: Branch): Observable<Branch> {
    // Interceptor tự gắn header Authorization
    return this.http.post<Branch>(this.apiUrl, branch);
  }

  updateBranch(id: number, branch: Branch): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, branch);
  }

  deleteBranch(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
