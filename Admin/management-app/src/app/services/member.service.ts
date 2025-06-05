// src/app/services/member.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Member {
  id:            number;
  firstName:     string;
  lastName:      string;
  email:         string;
  birthday:      Date | null;
  gender:        string;
  address:       string;
  phoneNumber:   string;
  packageId:     number | null;
  picture:       string;
  branchId: number;
  isActive:     boolean;
  createDate:   Date | null;
  updateDate:   Date | null;
  dueDate: Date | null;
}

@Injectable({ providedIn: 'root' })
export class MemberService {
  private readonly apiUrl = 'https://localhost:7045/api/Members';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  getById(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/${id}`);
  }

  create(member: Member): Observable<Member> {
    return this.http.post<Member>(this.apiUrl, member);
  }

  update(id: number, member: Member): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, member);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
