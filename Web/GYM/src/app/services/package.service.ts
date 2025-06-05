// src/app/services/package.service.ts
import { Injectable }    from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { Observable }    from 'rxjs';

export interface Package {
  id:         number;
  packageName:string;
  price:      number;
  duration:   string;    
  branchId:   number;
  describe: string;
}

@Injectable({ providedIn: 'root' })
export class PackageService {
  private readonly apiUrl = 'https://localhost:7045/api/Packages';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Package[]> {
    return this.http.get<Package[]>(this.apiUrl);
  }

  getById(id: number): Observable<Package> {
    return this.http.get<Package>(`${this.apiUrl}/${id}`);
  }

  create(pkg: Package): Observable<Package> {
    return this.http.post<Package>(this.apiUrl, pkg);
  }

  update(id: number, pkg: Package): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, pkg);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
