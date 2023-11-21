import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, User } from '@app/_models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://www.desarrolloweb2parcial.somee.com/api/Users';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/Crear`, user);
  }
  getUserByEmail(email: string) {
    const url = `${this.apiUrl}/GetLatestByEmail/${email}`;
    return this.http.get(url); // Esto devolverá un Observable al cual te puedes suscribir en el componente
  }
  getPreguntasVarkList(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}