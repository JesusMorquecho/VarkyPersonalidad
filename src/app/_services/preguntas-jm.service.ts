import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreguntasJmService {
  private apiUrl = 'http://www.desarrolloweb2parcial.somee.com/api/PreguntasJm';

  constructor(private http: HttpClient) { }
  enviarRespuestas(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
