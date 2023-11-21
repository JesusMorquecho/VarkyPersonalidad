import { Component, OnInit } from '@angular/core';
import { PreguntaJm } from '@app/_models/usuario';
import { PreguntasJmService } from '@app/_services/preguntas-jm.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboardpersonalidad',
  templateUrl: './dashboardpersonalidad.component.html',
})
export class DashboardpersonalidadComponent implements OnInit {
  preguntasJm: PreguntaJm[] = [];
  resultadosPersonalidad: any[] = [];
  conteoE: number = 0;
  conteoI: number = 0;
  conteoS: number = 0;
  conteoN: number = 0;
  conteoT: number = 0;
  conteoF: number = 0;
  conteoJ: number = 0;
  conteoP: number = 0;
  constructor(private preguntasJmService: PreguntasJmService) { }

  ngOnInit(): void {
    this.preguntasJmService.getPreguntasPersonalidadList().subscribe({
      next: (response) => {
        this.preguntasJm = response.response;
        this.contarTiposPersonalidad(); // Asegúrate de que esta función esté definida y actualice los contadores
        setTimeout(() => {
          this.renderChart();
        }, 0);
      },
      error: (error) => {
        console.error('Error fetching Preguntas JM:', error);
      }
    });
  }
  contarTiposPersonalidad(): void {
    for (const resultado of this.preguntasJm) { // Asegúrate de iterar sobre this.preguntasJm
      const total = resultado.total; // Asegúrate de que "total" es una cadena de texto como "ENTJ", "INFP", etc.
      if (!total) continue; // Si "total" es null o undefined, salta al siguiente resultado
      for (const letra of total) {
        switch (letra) {
          case 'E':
            this.conteoE++;
            break;
          case 'I':
            this.conteoI++;
            break;
          case 'S':
            this.conteoS++;
            break;
          case 'N':
            this.conteoN++;
            break;
          case 'T':
            this.conteoT++;
            break;
          case 'F':
            this.conteoF++;
            break;
          case 'J':
            this.conteoJ++;
            break;
          case 'P':
            this.conteoP++;
            break;
        }
      }
    }
  }
  renderChart() {
  const ctx = document.getElementById('personalidadChart') as HTMLCanvasElement;
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'],
      datasets: [{
        label: 'Conteo de Tipos de Personalidad',
        data: [this.conteoE, this.conteoI, this.conteoS, this.conteoN, this.conteoT, this.conteoF, this.conteoJ, this.conteoP],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', // Rojo para 'E'
          'rgba(54, 162, 235, 0.2)', // Azul para 'I'
          'rgba(255, 206, 86, 0.2)', // Amarillo para 'S'
          'rgba(75, 192, 192, 0.2)', // Verde para 'N'
          'rgba(153, 102, 255, 0.2)', // Morado para 'T'
          'rgba(255, 159, 64, 0.2)', // Naranja para 'F'
          'rgba(199, 199, 199, 0.2)', // Gris para 'J'
          'rgba(255, 99, 132, 0.2)' // Rosa para 'P'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Rojo para 'E'
          'rgba(54, 162, 235, 1)', // Azul para 'I'
          'rgba(255, 206, 86, 1)', // Amarillo para 'S'
          'rgba(75, 192, 192, 1)', // Verde para 'N'
          'rgba(153, 102, 255, 1)', // Morado para 'T'
          'rgba(255, 159, 64, 1)', // Naranja para 'F'
          'rgba(199, 199, 199, 1)', // Gris para 'J'
          'rgba(255, 99, 132, 1)' // Rosa para 'P'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
  


}