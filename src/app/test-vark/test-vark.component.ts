import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestasvarkService } from '@app/_services/respuestasvark.service';
import { SharedDataService } from '@app/_services/shared-data.service';
import Swal from 'sweetalert2';

interface Totals {
  V: number;
  A: number;
  R: number;
  K: number;
}

@Component({
  selector: 'app-test-vark',
  templateUrl: './test-vark.component.html',
  styleUrls: ['./test-vark.component.less']
})

export class TestVarkComponent implements OnInit {


  
  preguntas: any[] = [
    {
      texto: 'Usted cocinará algo especial para su familia. Usted haría:',
      opciones: [
        'Preguntar a amigos por sugerencias.',
        'Dar una vista al recetario por ideas de las fotos.',
        'Usar un libro de cocina donde usted sabe hay una buena receta.',
        'Cocinar algo que usted sabe sin la necesidad de instrucciones.'
      ]
    },
    {
      texto: 'Cuando usted está planeando un viaje, usted:',
      opciones: [
        'Hace una lista de lugares y actividades que quiere experimentar.',
        'Busca en la web los mejores destinos y ofertas.',
        'Piensa en los destinos donde amigos y familiares han disfrutado.',
        'Prefiere ir a lugares que ya conoce y ama.'
      ]
    },
    {
      texto: 'Si tuviera que elegir un nuevo hobby, usted:',
      opciones: [
        'Escogería algo que ha visto que otros disfrutan.',
        'Investigaría varias opciones antes de elegir una.',
        'Se uniría a un club o grupo para obtener ideas y apoyo.',
        'Reanudaría un hobby que le ha gustado en el pasado.'
      ]
    },
    {
      texto: 'Usted ha terminado una competencia o un examen y le gustaría tener alguna retroalimentación. Te gustaría retroalimentarte',
      opciones: [
        'Usando descripciones escritas de los resultados.',
        'Usando ejemplos de lo que usted ha hecho.',
        'Usando gráficos que muestran lo que usted ha logrado.',
        'De alguienque habla por usted.'
      ]
    },
    {
      texto: 'Usted tiene un problema con la rodilla. Usted preferiría que el doctor:',
      opciones: [
        'Use un modelo de plástico y te enseñe lo que está mal.',
        'Te de una página de internet o algo para leer.',
        'Te describa lo qué está mal.',
        'Te enseñe un diagrama de lo que está mal.'
      ]
    },
    {
      texto: 'Usted está a punto de comprar una cámara digital o teléfono móvil. ¿Aparte del precio qué más influirá en tomar tu decisión?',
      opciones: [
        'Probándolo.',
        'Es un diseño moderno y se mira bien.',
        'Leer los detalles acerca de sus características.',
        'El vendedor me informa acerca de sus características.'
      ]
    },
    {
      texto: 'Usted no está seguro cómo se deletrea trascendente o tracendente. ¿Ud. qué haría?',
      opciones: [
        'Escribir ambas palabras en un papel y escojo una.',
        'Pienso cómo suena cada palabra y escojo una.',
        'Busco la palabra en el diccionario.',
        'Veo la palabra en mi mente y escojo según como la veo.'
      ]
    },
    {
      texto: 'Me gustan páginas de Internet que tienen:',
      opciones: [
        'Interesantes descripciones escritas, listas y explicaciones.',
        'Diseño interesante y características visuales.',
        'Cosas que con un click pueda cambiar o examinar.',
        'Canales donde puedo oír música, programas de radio o entrevistas.'
      ]
    },
    {
      texto: 'Usted está planeando unas vacaciones para un grupo. Usted quiere alguna observación de ellos acerca del plan. Usted qué haría:',
      opciones: [
        'Usar un mapa o página de Internet para mostrarles los lugares.',
        'Describir algunos de los puntos sobresalientes.',
        'Darles una copia del itinerario impreso.',
        'Llamarles por teléfono o mandar mensaje por correo electrónico.'
      ]
    },
    {
      texto: 'Usted está usando un libro, disco compacto o página de Internet para aprender a tomar fotos con su cámara digital nueva. Usted le gustaría tener:',
      opciones: [
        'Una oportunidad de hacer preguntas acerca de la cámara y sus características.',
        'Esquemas o diagramas que muestran la cámara y la función de cada parte.',
        'Ejemplos de buenas y malas fotos y cómo mejorarlas.',
        'Aclarar las instrucciones escritas con listas y puntos sobre qué hacer.'
      ]
    },
    {
      texto: 'Usted quiere aprender un programa nuevo, habilidad o juego en una computadora. Usted qué hace:',
      opciones: [
        'Hablar con gente que sabe acerca del programa.',
        'Leer las instrucciones que vienen en el programa.',
        'Seguir los esquemas en el libro que acompaña el programa.',
        'Usar los controles o el teclado.'
      ]
    },
    {
      texto: 'Estás ayudando a alguien que quiere ir al aeropuerto, al centro del pueblo o la estación del ferrocarril. Usted hace:',
      opciones: [
        'Va con la persona.',
        'Anote las direcciones en un papel (sin mapa).',
        'Les dice las direcciones.',
        'Les dibuja un croquis o les da un mapa.'
      ]
    },
    {
      texto: 'Recuerde un momento en su vida en que Ud. aprendió a hacer algo nuevo. Trate de evitar escoger una destreza física, como andar en bicicleta. Ud. Aprendió mejor:',
      opciones: [
        'Viendo una demostración.',
        'Con las instrucciones escritas, en un manual o libro de texto.',
        'Escuchando a alguien explicarlo o haciendo preguntas.',
        'Con esquemas y diagramas o pistas visuales.'
      ]
    },
    {
      texto: 'Ud. prefiere un maestro o conferencista que use:',
      opciones: [
        'Demostraciones, modelos o sesiones prácticas.',
        'Folletos, libros o lecturas.',
        'Diagramas, esquemas o gráficos.',
        'Preguntas y respuestas, pláticas y oradores invitados.'
      ]
    },
    {
      texto: 'Un grupo de turistas quiere aprender acerca de parques o reservas naturales en su área. Usted:',
      opciones: [
        'Los acompaña a un parque o reserva natural.',
        'Les da un libro o folleto acerca de parques o reservas naturales.',
        'Les da una plática acerca de parques o reservas naturales.',
        'Les muestra imágenes de Internet, fotos o libros con dibujos.'
      ]
    },
    {
      texto: 'Usted tiene que hacer un discurso para una conferencia u ocasión especial. Usted hace:',
      opciones: [
        'Escribir un discurso y aprendérselo leyéndolo varias veces.',
        'Reunir muchos ejemplos e historias para hacer el discurso verdadero y práctico.',
        'Escribir algunas palabras claves y practicar el discurso repetidas veces.',
        'Hacer diagramas o esquemas que te ayudan a explicar las cosas.'
      ]
    }
  ];


  respuestas: { [key: string]: boolean[] } = {};


  
  getLetra(index: number): string {
    return String.fromCharCode(97 + index);
  }
  estiloDeAprendizaje: Totals;


  constructor(private router: Router, private sharedDataService: SharedDataService,
    private respuestasService: RespuestasvarkService) {
    this.inicializarRespuestas();
    this.estiloDeAprendizaje = { V: 0, A: 0, R: 0, K: 0 };

  }

  inicializarRespuestas() {
    for (let i = 1; i <= this.preguntas.length; i++) {
      this.respuestas[`pregunta${i}`] = [false, false, false, false];
    }
  }

  onCheckboxChange(event: Event, numeroPregunta: number, letra: string) {
    const inputElement = event.target as HTMLInputElement;
    const letraIndex = letra.charCodeAt(0) - 97; // Convertir letra a índice (0-3)
    this.respuestas[`pregunta${numeroPregunta}`][letraIndex] = inputElement.checked;
  }

  // Método para enviar las respuestas
  enviarRespuestas() {
    let numeroDeRespuestas = 0;
    for (let i = 0; i < this.preguntas.length; i++) {
      const preguntaKey = `pregunta${i + 1}`;
      if (this.respuestas[preguntaKey].includes(true)) { // Asume que 'true' significa una respuesta seleccionada
        numeroDeRespuestas++;
      }
    }
  
    // Verificar que el usuario ha respondido al menos 10 preguntas
    if (numeroDeRespuestas < 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Debes responder al menos 10 preguntas antes de enviar tus respuestas.',
      });
      return; // No continuar con el envío
    }
    const userId = this.sharedDataService.getUserId();
    const nombresCompletos = {
      'V': 'Visual',
      'A': 'Aural',
      'R': 'Lector',
      'K': 'Kinestésico'
    };
    let respuestasParaEnviar: any = {
      id: userId,
      custom: '',
    };
    for (let i = 0; i < this.preguntas.length; i++) {
      const preguntaKey = i + 1;
      const seleccionadas: string[] = [];
  
      for (let j = 0; j < this.respuestas[`pregunta${preguntaKey}`].length; j++) {
        if (this.respuestas[`pregunta${preguntaKey}`][j]) {
          const letra = this.getLetra(j);
          seleccionadas.push(letra);
  

        }
      }
      respuestasParaEnviar[`respuesta${preguntaKey}`] = seleccionadas.length > 0 ? seleccionadas.join('') : null;
    }
  

    // Mapeo de las respuestas a los estilos de aprendizaje
    const mapeoDeRespuestas = {
      Visual: ['b', 'b', 'd', 'c', 'd', 'b', 'd', 'b', 'a', 'b', 'c', 'd', 'd', 'c', 'd', 'd'],
      Aural: ['a', 'a', 'a', 'd', 'c', 'd', 'b', 'd', 'b', 'a', 'a', 'c', 'c', 'd', 'c', 'c'],
      Lectual: ['c', 'c', 'c', 'a', 'b', 'c', 'c', 'a', 'c', 'd', 'b', 'b', 'b', 'b', 'b', 'a'],
      Kinestesico: ['d', 'd', 'b', 'b', 'a', 'a', 'a', 'c', 'd', 'c', 'd', 'a', 'a', 'a', 'a', 'b']
    };

    // Contar las respuestas
    this.preguntas.forEach((pregunta, index) => {
      let letraSeleccionada = ''; // Suponiendo que solo se permite una respuesta por pregunta
      if (this.respuestas[`pregunta${index + 1}`]) {
        this.respuestas[`pregunta${index + 1}`].forEach((seleccionada, i) => {
          if (seleccionada) {
            letraSeleccionada = this.getLetra(i);
          }
        });

        // Sumar al contador basado en la letra seleccionada
        if (mapeoDeRespuestas.Visual[index] === letraSeleccionada) this.estiloDeAprendizaje.V++;
        if (mapeoDeRespuestas.Aural[index] === letraSeleccionada) this.estiloDeAprendizaje.A++;
        if (mapeoDeRespuestas.Lectual[index] === letraSeleccionada) this.estiloDeAprendizaje.R++;
        if (mapeoDeRespuestas.Kinestesico[index] === letraSeleccionada) this.estiloDeAprendizaje.K++;
      }
    });

    // Determinar el estilo de aprendizaje predominante

    let maxCount = 0;
    let estiloPredominante: keyof Totals = 'V'; // O cualquier clave válida de Totals como valor inicial
    
    // Usar Object.keys con un aserto de tipo para asegurar que las claves son de tipo keyof Totals.
    (Object.keys(this.estiloDeAprendizaje) as (keyof Totals)[]).forEach(key => {
      if (this.estiloDeAprendizaje[key] > maxCount) {
        maxCount = this.estiloDeAprendizaje[key];
        estiloPredominante = key;
      }
    });
    const estiloPredominanteNombre = nombresCompletos[estiloPredominante];

    // Preparar el objeto de respuestas para enviar
    respuestasParaEnviar.custom = `${this.estiloDeAprendizaje.V},${this.estiloDeAprendizaje.A},${this.estiloDeAprendizaje.R},${this.estiloDeAprendizaje.K}`;
    respuestasParaEnviar.total = estiloPredominante;

    // Enviar las respuestas al servidor
    this.respuestasService.enviarRespuestas(respuestasParaEnviar).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Resultado del Test VARK',
          text: `Tu estilo predominante de aprendizaje es: ${estiloPredominanteNombre}`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Marcar el test VARK como completado
            this.sharedDataService.setTestVarkCompleted(true);
            // Navegar al siguiente test o al home
            this.navegarAlSiguienteTestOHome();
          }
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al enviar tus respuestas. Inténtalo de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
  navegarAlSiguienteTestOHome(): void {
    // Asegúrate de que estas llamadas son síncronas o maneja la asincronía adecuadamente
    const testVarkCompletado = this.sharedDataService.getTestVarkCompleted();
    const testPersonalidadCompletado = this.sharedDataService.getTestPersonalidadCompleted();
  
    console.log('Test VARK completado:', testVarkCompletado);
    console.log('Test Personalidad completado:', testPersonalidadCompletado);
  
    if (!testVarkCompletado) {
      console.log('Redirigiendo a Test VARK...');
      this.router.navigate(['/test-vark']);
    } else if (!testPersonalidadCompletado) {
      console.log('Redirigiendo a Test Personalidad...');
      this.router.navigate(['/test-personalidad']);
    } else {
      console.log('Redirigiendo al Home...');
      this.router.navigate(['']);
    }
  }                                                  

  ngOnInit(): void {
    if (this.sharedDataService.getTestVarkCompleted() && this.sharedDataService.getTestPersonalidadCompleted()) {
      this.router.navigate(['/']);
    }
  }

}
