import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../interfaces/auth-response';
import { LoginRequest } from '../interfaces/login-request';
import { jwtDecode } from 'jwt-decode';
import { RegisterComponent } from '../Pages/register/register.component';
import { accountDetail } from '../interfaces/account-detail';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiUrl: string = environment.apiUrl;
  private tokenKey='token';


  constructor(private http:HttpClient) { }

  login(data:LoginRequest):Observable<AuthResponse>{
    return this.http
    .post<AuthResponse>(`${this.apiUrl}Account/SignIn`, data)
    .pipe(
      map((response)=>{
        if(response.isSuccess){
          localStorage.setItem(this.tokenKey, response.token);
        }
        return response;
      })
    );
  }
  register(data:RegisterComponent):Observable<AuthResponse>{
    return this.http
    .post<AuthResponse>(`${this.apiUrl}Account/SignUp`, data)
    .pipe(
      map((response)=>{
        if(response.isSuccess){
          localStorage.setItem(this.tokenKey, response.token);
        }
        return response;
      })
    );
  }

  getDetail=() : Observable<accountDetail> =>
    this.http.get<accountDetail>(`${this.apiUrl}account/detail`);

  getUserDetail=()=>{
    const token = this.getToken();
    if(!token) return null;
    const decodedToken:any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.jti,
      email: decodedToken.email,
      fullName:decodedToken.name,
      phoneNumber:decodedToken.phoneNumber,
      gender:decodedToken.gender,
      birthday:decodedToken.birthday,
      // roles:decodedToken.role || [],
      roles: Array.isArray(decodedToken.role) ? decodedToken.role : [decodedToken.role],
    }
    return userDetail;
  }

  isLoggedIn=():boolean=>{
    const token = this.getToken();
    if(!token) return false;
    return !this.isTokenExpired();
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


