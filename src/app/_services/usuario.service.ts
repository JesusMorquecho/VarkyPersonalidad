import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, User } from '@app/_models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://www.desarrolloweb2parcial.somee.com/api/Users/Crear';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, user);
  }
}