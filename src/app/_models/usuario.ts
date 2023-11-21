export class User {
    id: number = 0;
    firstName: string = '';
    lastName: string = '';
    correo: string = '';
    custom: string = '';
  }
  export interface ApiResponse {
    mensaje: string;
    response: {
      id: number;
      firstName: string;
      lastName: string;
      correo: string;
      custom: string;
    };
  }
  export interface PreguntaJm {
    id: number;
    respuestaE: string;
    respuestaI: string;
    respuestaS: string;
    respuestaIn: string;
    total: string;
    custom: string;
  }
  