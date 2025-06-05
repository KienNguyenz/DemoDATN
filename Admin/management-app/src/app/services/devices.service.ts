// src/app/services/Devices.service.ts
import { Injectable }    from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { Observable }    from 'rxjs';

export interface Devices {
  id:       number;
  name: string;
  type: string;
  quantity: number;
  price: number;
  origin: string;
  describe: string;
  branchId: number;
  isActive: boolean,
}

@Injectable({ providedIn: 'root' })
export class DevicesService {
  private readonly apiUrl = 'https://localhost:7045/api/Devices';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Devices[]> {
    return this.http.get<Devices[]>(this.apiUrl);
  }
  getById(id: number): Observable<Devices> {
    return this.http.get<Devices>(`${this.apiUrl}/${id}`);
  }
  create(d: Devices): Observable<Devices> {
    return this.http.post<Devices>(this.apiUrl, d);
  }
  update(id: number, d: Devices): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, d);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
