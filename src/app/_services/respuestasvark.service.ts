import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class RespuestasvarkService {
  private apiUrl = 'http://www.desarrolloweb2parcial.somee.com/api/PreguntasVark';

  constructor(private http: HttpClient) { }

  enviarRespuestas(respuestas: any): Observable<any> {
    return this.http.post(this.apiUrl, respuestas);
  }
}
