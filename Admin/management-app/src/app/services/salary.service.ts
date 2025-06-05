// src/app/services/salary.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmployeeMonthlySalaryDto {
  id: number;
  employeeId: number;
  month: number;
  year: number;
  workingDays: number;
  salaryAmount: number;
  isActive?: boolean;
  createBy?: string;
  createDate?:   Date | null;
  updateDate?:   Date | null;

}
export interface CreateMonthlySalaryDTO {
  employeeId: number;
  month: number;
  year: number;
  workingDays: number;
}

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  // Thay URL cho phù hợp với BE của bạn
  private readonly apiUrl = 'https://localhost:7045/api/MonthlySalaries';

  constructor(private http: HttpClient) {}

  /** 
   * Lấy toàn bộ bản ghi lương (của tất cả các tháng).
   * Ta sẽ lọc ở FE theo month/year mong muốn. 
   */
  getAllMonthlySalaries(): Observable<EmployeeMonthlySalaryDto[]> {
    return this.http.get<EmployeeMonthlySalaryDto[]>(this.apiUrl);
  }

  /**
   * (Tùy chọn) Nếu bạn muốn query riêng theo employee + month/year:
   * GET api/MonthlySalaries/employee/{employeeId}?month=...&year=...
   */
  getSalaryByEmployeeAndMonth(
    employeeId: number,
    month: number,
    year: number
  ): Observable<EmployeeMonthlySalaryDto> {
    return this.http.get<EmployeeMonthlySalaryDto>(
      `${this.apiUrl}/employee/${employeeId}?month=${month}&year=${year}`
    );
  }
  createMonthlySalary(body: CreateMonthlySalaryDTO): Observable<EmployeeMonthlySalaryDto> {
    return this.http.post<EmployeeMonthlySalaryDto>(this.apiUrl, body);
  }

  /** Cập nhật lương tháng (PUT id) */
  updateMonthlySalary(id: number, body: CreateMonthlySalaryDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, body);
  }
}
