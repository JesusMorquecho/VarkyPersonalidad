import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntasJmService {
  private apiUrl = 'http://www.desarrolloweb2parcial.somee.com/api/PreguntasJm';

  constructor(private http: HttpClient) { }
  enviarRespuestas(data: any) {
    return this.http.post(this.apiUrl, data);
  }
  getPreguntasById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
