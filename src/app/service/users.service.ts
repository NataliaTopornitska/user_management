import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../components/user-add-edit/user-add-edit.component';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  addUser(data: User): Observable<any> {
    return this.http.post('http://localhost:3000/users', data);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/users/${id}`, data);
  }

  getUsersList(): Observable<any> {
    return this.http.get('http://localhost:3000/users');
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/users/${id}`);
  }
}
