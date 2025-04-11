import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
    branchId: number;
    name: string;
    gender: string;
    nickname?: string;
    role?: string;
    describe?: string;
    strength?: string;
    pictureUrl?: string;
    // Bạn có thể bổ sung thêm các trường khác như birthday, gender,…
  }
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // Cập nhật URL API của bạn cho phù hợp.
  private readonly apiUrl = 'https://localhost:7045/api';

  constructor(private http: HttpClient) {}

  // Ví dụ: lấy danh sách nhân viên theo branchId
  getEmployeesByBranch(branchId: number): Observable<Employee[]> {
    // Giả sử API của bạn cho phép query theo branchId, bạn có thể điều chỉnh theo endpoint thật.
    return this.http.get<Employee[]>(`${this.apiUrl}/Employees/branchId/${branchId}`);
  }
}
