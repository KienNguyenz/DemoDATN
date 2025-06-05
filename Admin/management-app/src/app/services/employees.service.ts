import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
    id: number;
    address:string;
    branchId: number;
    birthday: Date;
    name: string;
    phoneNumber: string;
    gender: string;
    nickName?: string;
    role?: string;
    describe?: string;
    strength?: string;
    pictureUrl?: string;
    workingday?: number;
    salary?: number;
    isActive: boolean;
    // Bạn có thể bổ sung thêm các trường khác như birthday, gender,…
  }
  export interface CreateEmployee {
  name: string;
  nickName?: string;
  describe?: string;
  strength?: string;
  role?: string;
  birthday: string;
  gender: string;
  address: string;
  phoneNumber: string;
  pictureUrl?: string;
  branchId: number;
  workingday?: number;
  isActive: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // Cập nhật URL API của bạn cho phù hợp.
  private readonly apiUrl = 'https://localhost:7045/api/Employees';

  constructor(private http: HttpClient) {}

  // Ví dụ: lấy danh sách nhân viên theo branchId
  // getEmployeesByBranch(branchId: number): Observable<Employee[]> {
  //   // Giả sử API của bạn cho phép query theo branchId, bạn có thể điều chỉnh theo endpoint thật.
  //   return this.http.get<Employee[]>(`${this.apiUrl}/Employees/branchId/${branchId}`);
  // }
  getAllEmployees(): Observable<Employee[]> {
  return this.http.get<Employee[]>(`${this.apiUrl}`);
}
 getEmployeesByBranch(branchId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}?branchId=${branchId}`);
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  createEmployee(emp: CreateEmployee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, emp);
  }

  updateEmployee(id: number, emp: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, emp);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
