import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RevenueLog {
  id: number;
  employeeId: number;
  packageId: number;
  price: number;
  date: Date;
}

export interface CreateRevenueLogDTO {
  employeeId: number;
  packageId: number;
  price: number;
  date: Date;
}

@Injectable({ providedIn: 'root' })
export class RevenueLogService {
  // Địa chỉ API giả định
  private readonly apiUrl = 'https://localhost:7045/api/RevenueLogs';

  constructor(private http: HttpClient) {}

  /** Lấy tất cả các bản ghi revenue log */
  getAll(): Observable<RevenueLog[]> {
    return this.http.get<RevenueLog[]>(this.apiUrl);
  }

  /** Tạo một bản ghi revenue log mới */
  create(body: CreateRevenueLogDTO): Observable<RevenueLog> {
    return this.http.post<RevenueLog>(this.apiUrl, body);
  }
}
