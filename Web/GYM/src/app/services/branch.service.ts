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
}

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private apiUrl = 'https://localhost:7045/api/Branch'; 

  constructor(private http: HttpClient) {}

  getBranchs(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiUrl);
  }

  getBranch(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.apiUrl}/${id}`);
  }

  createBranch(club: Branch): Observable<Branch> {
    return this.http.post<Branch>(this.apiUrl, club);
  }

  updateBranch(id: number, club: Branch): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, club);
  }

  deleteBranch(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
