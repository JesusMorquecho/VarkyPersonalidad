import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { SharedDataService } from '@app/_services/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreguntasJmService } from '@app/_services/preguntas-jm.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
function notDefaultOptionValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = control.value === '' || control.value == null || control.value === undefined;
    return forbidden ? { 'defaultOption': { value: control.value } } : null;
  };
}
const descripcionesTiposPersonalidad: { [key: string]: string } = {
  'INTJ': 'Imaginativos y estratégicos pensadores con un plan para todo.',
  'INTP': 'Innovadores pensadores con una sed insaciable de conocimiento.',
  'ENTJ': 'Líderes audaces, imaginativos y con una fuerte voluntad, siempre encontrando un camino o haciéndolo.',
  'ENTP': 'Pensadores inteligentes y curiosos que no pueden resistir un desafío intelectual.',
  'INFJ': 'Individuos tranquilos y místicos, pero muy inspiradores y con firmeza de propósitos.',
  'INFP': 'Poéticos, amables y altruistas, siempre dispuestos a ayudar una buena causa.',
  'ENFJ': 'Líderes carismáticos y apasionados, capaces de encantar y motivar a los demás.',
  'ENFP': 'Espíritus libres, creativos, sociables y entusiastas, siempre encontrando una causa en la que apoyar.',
  'ISTJ': 'Individuos prácticos y orientados a los hechos, cuyos pies están firmemente plantados en el suelo.',
  'ISFJ': 'Protectores dedicados y cálidos, dispuestos a defender a sus seres queridos.',
  'ESTJ': 'Administradores excelentes, inigualables en la gestión de cosas o personas.',
  'ESFJ': 'Personas extraordinariamente atentas, sociales y populares, siempre dispuestas a ayudar.',
  'ISTP': 'Experimentadores audaces y prácticos, maestros de todo tipo de herramientas.',
  'ISFP': 'Artistas flexibles y encantadores, siempre listos para explorar y experimentar algo nuevo.',
  'ESTP': 'Personas inteligentes, enérgicas y muy perceptivas, que realmente disfrutan vivir al límite.',
  'ESFP': 'Personas espontáneas, enérgicas y entusiastas, amantes de la vida, la diversión y los amigos.'
};

@Component({
  selector: 'app-test-personalidad',
  templateUrl: './test-personalidad.component.html',
  styleUrls: ['./test-personalidad.component.less']
})

export class TestPersonalidadComponent implements OnInit {
  testForm!: FormGroup;
  items: any[] = [
    { extrovertido: 'Emprendedor y entusiasta', introvertido: 'Reservado' },
    { extrovertido: 'Actúa y luego piensa ', introvertido: 'Piensa y luego actúa ' },
    { extrovertido: 'Piensa en voz alta', introvertido: 'Piensa en voz baja' },
    { extrovertido: 'Tiene mucha energía', introvertido: 'Energía tranquila' },
    { extrovertido: 'Prefiere hacer varias cosas a la vez', introvertido: 'Prefiere concentrarse en una cosa' },
    { extrovertido: 'Habla más que escucha', introvertido: 'Escucha más que habla' },
    { extrovertido: 'Es fácil de conocer', introvertido: ' Lleva una vida muy privada' },
    { extrovertido: 'Puede distraerse con facilidad', introvertido: 'Gran capacidad de concentración' },
    { extrovertido: 'Le gusta rodearse de gente', introvertido: 'Se siente a gusto a solas' },

  ];
  itemsSensorialIntuitivo: any[] =[ 
    { sensorial: 'Confía en la experiencia propia', intuitivo: 'Confía en sus instintos' },
    { sensorial: 'Realista, ve lo que es', intuitivo: 'Imaginativo, ve lo que podría ser' },
    { sensorial: 'Utiliza destrezas ya aprendidas', intuitivo: 'Prefiere desarrollar nuevas destrezas' },
    { sensorial: 'Prefiere instrucciones detalladas', intuitivo: 'Gusta descubrir las cosas por sí mismo' },
    { sensorial: 'Ve detalles y recuerda hechos', intuitivo: 'Percibe cualquier cosa nueva o diferente' },
    { sensorial: 'Admira soluciones prácticas', intuitivo: 'Admira ideas creativas' },
    { sensorial: 'Se concentra en hechos específicos', intuitivo: 'Tiene ideas y visión de conjunto' },
    { sensorial: 'Trabaja a un ritmo uniforme', intuitivo: 'Trabaja en ráfagas de energía' },
    { sensorial: 'Vive en el aquí y el ahora', intuitivo: 'Piensa en las implicaciones futuras' },
  ];
  itemsRacionalEmocional: any[] = [
    { racional: 'Tiende a ver defectos ajenos', emocional: 'Tiende a ver cualidades ajenas' },
    { racional: 'Se convence con la lógica', emocional: 'Se convence por sus sensaciones' },
    { racional: 'Aparenta ser frío y reservado', emocional: 'Aparenta ser cálido y amistoso' },
    { racional: 'Toma decisiones objetivamente', emocional: 'Decide por sus valores y sensaciones' },
    { racional: 'No toma las cosas personalmente', emocional: 'Toma muchas cosas personalmente' },
    { racional: 'Es motivado por la metas', emocional: 'Es motivado por el reconocimiento' },
    { racional: 'Honesto y directo', emocional: ' Diplomático y con mucho tacto' },
    { racional: 'Valora la honestidad y la justicia', emocional: 'Valora la armonía y la compasión' },
    { racional: 'Argumenta o debate por diversión', emocional: 'Evita discusiones y confiictos' },

  ];
  itemsCalificadorPerceptivo: any[] = [
    { calificador: 'Trabajar primero, jugar después', perceptivo: 'Jugar primero, trabajar después' },
    { calificador: 'Prefiere terminar proyectos', perceptivo: 'Prefiere empezar proyectos' },
    { calificador: 'Se siente a gusto llevando sus agendas', perceptivo: 'Desea la libertad de la espontaneidad' },
    { calificador: 'Le gusta tomar decisiones', perceptivo: 'Pospone algunas decisiones, si puede' },
    { calificador: 'Presta atención al tiempo, puntualidad', perceptivo: 'Menos consciente del tiempo, impuntual' },
    { calificador: 'Le gusta hacer y atenerse a planes', perceptivo: 'Le gusta la fexibilidad en los planes' },
    { calificador: 'Quiere que las cosas se decidan', perceptivo: 'Quiere tener opciones abiertas' },
    { calificador: 'Serio y convencional', perceptivo: 'Relajado y poco convencional' },
    { calificador: 'Justifica la mayoría de las reglas', perceptivo: 'Cuestiona muchas reglas' },
  ];
  
  
  
 
  puntos: number[] = [0,1, 2, 3, 4, 6, 7, 8, 9, 10]; // Agrega la lista de puntos del 1 al 10
  totalExtrovertidos = 0;
  totalIntrovertidos = 0;
  totalSensorial = 0;
  totalIntuitivo = 0;
  totalRacional = 0;
  totalEmocional = 0;
  totalCalificador = 0;
  totalPerceptivo = 0;
  constructor(private router: Router,private fb: FormBuilder,    private sharedDataService: SharedDataService,private preguntasjmservice:PreguntasJmService   ) { }
  ngOnInit() {
    if (this.sharedDataService.getTestVarkCompleted() && this.sharedDataService.getTestPersonalidadCompleted()) {
      this.router.navigate(['/home']);
    }
    let group: { [key: string]: FormControl } = {};


    // Extrovertidos e Introvertidos
    this.items.forEach((item, index) => {
      group[`extrovertidoPuntos${index}`] = new FormControl('', [Validators.required, notDefaultOptionValidator()]);
      group[`introvertidoPuntos${index}`] = new FormControl('', [Validators.required, notDefaultOptionValidator()]);
    });
  
    // Sensorial y Intuitivo
    this.itemsSensorialIntuitivo.forEach((item, index) => {
      group[`sensorialPuntos${index}`] = new FormControl('', [Validators.required, notDefaultOptionValidator()]);
      group[`intuitivoPuntos${index}`] = new FormControl('', [Validators.required, notDefaultOptionValidator()]);
    });
  
    // Racional y Emocional
    this.itemsRacionalEmocional.forEach((item, index) => {
      group[`racionalPuntos${index}`] = new FormControl('', [Validators.required, notDefaultOptionValidator()]);
      group[`emocionalPuntos${index}`] = new FormControl('',[Validators.required, notDefaultOptionValidator()]);
    });
  
    // Calificador y Perceptivo
    this.itemsCalificadorPerceptivo.forEach((item, index) => {
      group[`calificadorPuntos${index}`] = new FormControl('', [Validators.required, notDefaultOptionValidator()]);
      group[`perceptivoPuntos${index}`] = new FormControl('',  [Validators.required, notDefaultOptionValidator()]);
    });
  
    
    this.testForm = this.fb.group(group);

    // Observar cambios en el formulario
    this.testForm.valueChanges.subscribe(val => {
      this.calcularResultados();
      
    
    });
  }

  calcularResultados() {
    this.totalExtrovertidos = this.items
      .map((item, index) => this.testForm.get(`extrovertidoPuntos${index}`)?.value || 0)
      .reduce((acc, current) => acc + Number(current), 0);

    this.totalIntrovertidos = this.items
      .map((item, index) => this.testForm.get(`introvertidoPuntos${index}`)?.value || 0)
      .reduce((acc, current) => acc + Number(current), 0);


      this.totalSensorial = this.items
      .map((item, index) => this.testForm.get(`sensorialPuntos${index}`)?.value || 0)
      .reduce((acc, current) => acc + Number(current), 0);

    this.totalIntuitivo = this.items
      .map((item, index) => this.testForm.get(`intuitivoPuntos${index}`)?.value || 0)
      .reduce((acc, current) => acc + Number(current), 0);

      this.totalRacional = this.items
      .map((item, index) => this.testForm.get(`racionalPuntos${index}`)?.value || 0)
      .reduce((acc, current) => acc + Number(current), 0);

    this.totalEmocional = this.items
      .map((item, index) => this.testForm.get(`emocionalPuntos${index}`)?.value || 0)
      .reduce((acc, current) => acc + Number(current), 0);

      this.totalCalificador = this.items
      .map((item, index) => this.testForm.get(`calificadorPuntos${index}`)?.value || 0)
      .reduce((acc, current) => acc + Number(current), 0);

    this.totalPerceptivo = this.items
      .map((item, index) => this.testForm.get(`perceptivoPuntos${index}`)?.value || 0)
      .reduce((acc, current) => acc + Number(current), 0);
  }

  obtenerResultados() {
    const userId = this.sharedDataService.getUserId();
    const resultados = {
      userId: userId,
      respuestaE: this.totalExtrovertidos > this.totalIntrovertidos ? 'E' : 'I',
      respuestaI: this.totalSensorial > this.totalIntuitivo ? 'S' : 'N',
      respuestaS: this.totalRacional > this.totalEmocional ? 'T' : 'F',
      respuestaIn: this.totalCalificador > this.totalPerceptivo ? 'J' : 'P',
      total:''
    };
  
    const total = resultados.respuestaE + resultados.respuestaI + resultados.respuestaS + resultados.respuestaIn;
    console.log(total);
    // Resto del código se mantiene igual
    console.log(resultados); // Muestra el objeto en la consola
  
    // Convierte el objeto de resultados en un array de iniciales
    const inicialesResultados = Object.values(resultados);
    console.log(inicialesResultados); // Muestra el array en la consola
  
    // Si necesitas el array como JSON
    const jsonResultados = JSON.stringify(inicialesResultados);
    console.log(jsonResultados); // Muestra el string JSON en la consola
  
    // Devuelve el JSON si es necesario
    return resultados;
  }
  

  actualizarPuntosExtrovertidoIntrovertido(index: number, esExtrovertido: boolean) {
    const puntosExtrovertidoControl = this.testForm.get(`extrovertidoPuntos${index}`);
    const puntosIntrovertidoControl = this.testForm.get(`introvertidoPuntos${index}`);
    const puntosExtrovertido = puntosExtrovertidoControl?.value;
    const puntosIntrovertido = puntosIntrovertidoControl?.value;
    
    if (esExtrovertido) {
      const puntosComplementarios = 10 - puntosExtrovertido;
      if (puntosComplementarios !== 5) {
        puntosIntrovertidoControl?.setValue(puntosComplementarios);
      } else {
        puntosExtrovertidoControl?.setValue('');
        alert('No se permite usar el número 5. Por favor, elige otro valor.');
      }
    } else {
      const puntosComplementarios = 10 - puntosIntrovertido;
      if (puntosComplementarios !== 5) {
        puntosExtrovertidoControl?.setValue(puntosComplementarios);
      } else {
        puntosIntrovertidoControl?.setValue('');
        alert('No se permite usar el número 5. Por favor, elige otro valor.');
      }
    }
  }
  recuperarIdUsuario() {
    const userId = this.sharedDataService.getUserId();
    if (userId) {
      console.log('ID del Usuario:', userId);
    }
  }

  actualizarPuntosSensorialIntuitivo(index: number, esSensorial: boolean) {
    const puntosSensorialControl = this.testForm.get(`sensorialPuntos${index}`);
    const puntosIntuitivoControl = this.testForm.get(`intuitivoPuntos${index}`);
    const puntosSensorial = puntosSensorialControl?.value;
    const puntosIntuitivo = puntosIntuitivoControl?.value;
  
    if (esSensorial) {
      const puntosComplementarios = 10 - puntosSensorial;
      if (puntosComplementarios !== 5) {
        puntosIntuitivoControl?.setValue(puntosComplementarios);
      } else {
        puntosSensorialControl?.setValue('');
        alert('No se permite usar el número 5. Por favor, elige otro valor.');
      }
    } else {
      const puntosComplementarios = 10 - puntosIntuitivo;
      if (puntosComplementarios !== 5) {
        puntosSensorialControl?.setValue(puntosComplementarios);
      } else {
        puntosIntuitivoControl?.setValue('');
        alert('No se permite usar el número 5. Por favor, elige otro valor.');
      }
    }
  }
  
  actualizarPuntosRacionalEmocional(index: number, esRacional: boolean) {
    const puntosRacionalControl = this.testForm.get(`racionalPuntos${index}`);
    const puntosEmocionalControl = this.testForm.get(`emocionalPuntos${index}`);
    const puntosRacional = puntosRacionalControl?.value;
  
    if (esRacional) {
      const puntosComplementarios = 10 - puntosRacional;
      if (puntosComplementarios !== 5) {
        puntosEmocionalControl?.setValue(puntosComplementarios);
      } else {
        puntosRacionalControl?.setValue('');
        alert('No se permite usar el número 5. Por favor, elige otro valor.');
      }
    } else {
      const puntosComplementarios = 10 - puntosEmocionalControl?.value;
      if (puntosComplementarios !== 5) {
        puntosRacionalControl?.setValue(puntosComplementarios);
      } else {
        puntosEmocionalControl?.setValue('');
        alert('No se permite usar el número 5. Por favor, elige otro valor.');
      }
    }
  }
  
  actualizarPuntosCalificadorPerceptivo(index: number, esCalificador: boolean) {
    const puntosCalificadorControl = this.testForm.get(`calificadorPuntos${index}`);
    const puntosPerceptivoControl = this.testForm.get(`perceptivoPuntos${index}`);
    const puntosCalificador = puntosCalificadorControl?.value;
  
    if (esCalificador) {
      const puntosComplementarios = 10 - puntosCalificador;
      if (puntosComplementarios !== 5) {
        puntosPerceptivoControl?.setValue(puntosComplementarios);
      } else {
        puntosCalificadorControl?.setValue('');
        alert('No se permite usar el número 5. Por favor, elige otro valor.');
      }
    } else {
      const puntosComplementarios = 10 - puntosPerceptivoControl?.value;
      if (puntosComplementarios !== 5) {
        puntosCalificadorControl?.setValue(puntosComplementarios);
      } else {
        puntosPerceptivoControl?.setValue('');
        alert('No se permite usar el número 5. Por favor, elige otro valor.');
      }
    }
  }

  
  onSubmit() {
    if (this.testForm.valid) {
      // Calcula los resultados antes de mostrar el SweetAlert
      const resultados = this.obtenerResultados();
      const total = resultados.respuestaE + resultados.respuestaI + resultados.respuestaS + resultados.respuestaIn;
      const descripcion = descripcionesTiposPersonalidad[total];

      // Muestra un SweetAlert con el total
      Swal.fire({
        title: 'Resultado del Test de Personalidad',
        text: `Eres: ${total}\n${descripcion}`|| 'No se ha podido determinar tu tipo de personalidad.',
        icon: 'info',
        confirmButtonText: 'Aceptar',
        preConfirm: () => {
          // Aquí enviarías los datos a tu API
          const requestBody = {
            id: resultados.userId,
            respuestaE: resultados.respuestaE,
            respuestaI: resultados.respuestaI,
            respuestaS: resultados.respuestaS,
            respuestaIn: resultados.respuestaIn,
            total: total,
            custom: '' // Añade aquí cualquier otro dato que necesites
          };
          console.log(requestBody);
          return this.preguntasjmservice.enviarRespuestas(requestBody).toPromise();
        }
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
          this.sharedDataService.setTestPersonalidadCompleted(true);
          this.navegarAlSiguienteTestOHome();
        }
      });
    } else {
      // El formulario no es válido, mostrar errores
      Object.keys(this.testForm.controls).forEach(field => {
        const control = this.testForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
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
      this.router.navigate(['/home']);
    }
  }
}
