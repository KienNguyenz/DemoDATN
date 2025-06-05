import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '../interfaces/auth-response';
import { LoginRequest } from '../interfaces/login-request';
import { accountDetail } from '../interfaces/account-detail';
import { environment } from '../environments/environment.development';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}Account/SignIn`, data)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            localStorage.setItem(this.tokenKey, response.token);
          }
          return response;
        })
      );
  }

  getUserDetail = () => {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    return {
      id: decodedToken.jti,
      email: decodedToken.email,
      fullName: decodedToken.name,
      phoneNumber: decodedToken.phoneNumber,
      gender: decodedToken.gender,
      birthday: decodedToken.birthday,
      roles: Array.isArray(decodedToken.role) ? decodedToken.role : [decodedToken.role],
    };
  };

  isLoggedIn=():boolean=>{
    const token = this.getToken();
    if(!token) return false;
    return !this.isTokenExpired();
  } 
  getAccountDetail(): Observable<accountDetail> {
    const token = this.getToken(); // Lấy token từ localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<accountDetail>(`${this.apiUrl}Account/detail`, { headers });
  }

  /// Cập nhật thông tin tài khoản
updateAccountDetail(model: accountDetail): Observable<any> {
  const token = this.getToken(); // Lấy token từ localStorage
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.put(`${this.apiUrl}Account/detail`, model, { headers });
}
  

  private isTokenExpired() {
    const token = this.getToken();
    if(!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if(isTokenExpired) this.logout();
    return isTokenExpired;
  }

  logout = (): void => {
    localStorage.removeItem(this.tokenKey);
  };

  private getToken = ():string|null => localStorage.getItem(this.tokenKey) || '';

  forgotPassword(data: { email: string }) {
    return this.http.post<{ message: string }>(`${this.apiUrl}auth/forgot-password`, data);
  }
  resetPassword(data: { password: string; confirmPassword: string; token: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/reset-password`, data);
  }
}




