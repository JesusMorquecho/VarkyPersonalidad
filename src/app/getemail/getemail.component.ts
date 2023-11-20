import { Component } from '@angular/core';
import { User } from '@app/_models/usuario';
import { PreguntasJmService } from '@app/_services/preguntas-jm.service';
import { RespuestasvarkService } from '@app/_services/respuestasvark.service';
import { UserService } from '@app/_services/usuario.service';

@Component({
  selector: 'app-getemail',
  templateUrl: './getemail.component.html',
  
})
export class GetemailComponent {

  email: string = '';
  user: any = null;
  preguntas: any = null;
  varkResponses: any = null;

  constructor(private userService: UserService,private PreguntasJmService:PreguntasJmService,private preguntasVarkService: RespuestasvarkService) { }

  getUserByEmail() {
    this.userService.getUserByEmail(this.email).subscribe(
      data => {
        this.user = data;
        console.log('User data retrieved:', this.user);
        this.getPreguntasById(this.user.id); // Usar el ID del usuario para obtener las preguntas
        this.getPreguntasVarkById(this.user.id);
      },
      error => {
        console.error('Error al obtener el usuario', error);
      }
    );
  }
  getPersonalidadDescription(total: string) {
    const descriptions: {[key: string]: string} = {
      'V': 'Visual',
      'A': 'Aural',
      'R': 'Lector',
      'K': 'Kinestésico'
    };

    return descriptions[total] || 'No identificado';
  }
  getPreguntasById(userId: number) {
    this.PreguntasJmService.getPreguntasById(userId).subscribe(
      response => {
        this.preguntas = response;
        console.log('PreguntasJm data:', this.preguntas);
      },
      error => {
        console.error('Error fetching PreguntasJm data:', error);
      }
    );
  }
  getPreguntasVarkById(id: number) {
    this.preguntasVarkService.getPreguntasVarkById(id).subscribe(
      response => {
        this.varkResponses = response;
        console.log('VARK Responses:', this.varkResponses);
      },
      error => {
        console.error('Error fetching VARK responses:', error);
      }
    );
  }
}
