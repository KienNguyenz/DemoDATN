// src/app/services/room.service.ts
import { Injectable }    from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { Observable }    from 'rxjs';

export interface Room {
  id:       number;
  roomName: string;
  branchId: number;
  isActive: boolean;
}

@Injectable({ providedIn: 'root' })
export class RoomService {
  private readonly apiUrl = 'https://localhost:7045/api/Rooms';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }
  getById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }
  create(r: Room): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, r);
  }
  update(id: number, r: Room): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, r);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
