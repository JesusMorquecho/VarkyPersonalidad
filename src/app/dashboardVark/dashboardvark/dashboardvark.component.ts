import { Component, OnInit } from '@angular/core';
import { RespuestasvarkService } from '@app/_services/respuestasvark.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboardvark',
  templateUrl: './dashboardvark.component.html',
})
export class DashboardvarkComponent  implements OnInit {
  varkResults: any[] = [];
  conteoV: number = 0;
  conteoA: number = 0;
  conteoR: number = 0;
  conteoK: number = 0;

  constructor(private preguntasVarkService: RespuestasvarkService) {}

  ngOnInit(): void {
    this.preguntasVarkService.getPreguntasVarkList().subscribe({
      next: (response) => {
        this.varkResults = response.response;
        this.contarTotales();
        setTimeout(() => {
          this.renderChart();
        }, 0);
      },
      error: (error) => {
        console.error('Error fetching VARK results:', error);
      }
    });
  }
  
  
  renderChart() {
    console.log('renderChart called'); // Verificar si esto aparece en la consola
    console.log([this.conteoV, this.conteoA, this.conteoR, this.conteoK]);

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar', // o 'pie', 'line', etc.
      data: {
        labels: ['Visual', 'Aural', 'Read/Write', 'Kinesthetic'],
        datasets: [{
          label: '# of Votes',
          data: [this.conteoV, this.conteoA, this.conteoR, this.conteoK],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
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
  contarTotales(): void {
    for (const result of this.varkResults) {
      const total = result.total;
      this.conteoV += (total == 'V') ? 1 : 0;
      this.conteoA += (total == 'A') ? 1 : 0;
      this.conteoR += (total == 'R') ? 1 : 0;
      this.conteoK += (total == 'K') ? 1 : 0;
    }
  }

  getPersonalidad(total: string): string {
    const tipoPersonalidad: { [key: string]: string } = {
      'V': 'Visual',
      'A': 'Aural',
      'R': 'Lector/Read/Write',
      'K': 'Kinestésico'
    };
    return tipoPersonalidad[total as keyof typeof tipoPersonalidad] || 'Indefinido';
  }
}