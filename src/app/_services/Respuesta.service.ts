import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from'@app/_models/Respuesta'; 
import { Observable } from 'rxjs';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  private apiUrl = 'http://www.desarrolloweb2parcial.somee.com/api/PreguntasVark';

  constructor(private http: HttpClient, private sharedDataService: SharedDataService) {}
  enviarRespuestas(respuestasParaEnviar: Respuesta): Observable<any> {
    return this.http.post(this.apiUrl, respuestasParaEnviar);
  }
}