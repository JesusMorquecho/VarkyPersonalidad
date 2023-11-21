import { Component } from '@angular/core';
import { User } from '@app/_models/usuario';
import { PreguntasJmService } from '@app/_services/preguntas-jm.service';
import { RespuestasvarkService } from '@app/_services/respuestasvark.service';
import { UserService } from '@app/_services/usuario.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2'; // Importa SweetAlert2
 
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
 
 
  generatePDF() {
    console.log('Iniciando la generación de PDF...');
   
    if (this.user && this.preguntas && this.varkResponses) {
      const data = document.getElementById('user-data-container');
      if (data) {
        console.log('Elemento a convertir:', data);
   
        html2canvas(data)
        .then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4'
          });
 
          // Obtener las propiedades de la imagen y calcular el tamaño proporcional
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
 
          // Verificar si el contenido cabe en una sola página
          const pageHeight = pdf.internal.pageSize.getHeight();
          let yPosition = 0;
 
          if (pdfHeight <= pageHeight) {
            pdf.addImage(imgData, 'PNG', 0, yPosition, pdfWidth, pdfHeight);
          } else {
            // Si el contenido es más largo que una página, agregarlo en múltiples páginas
            while (yPosition < pdfHeight) {
              pdf.addImage(imgData, 'PNG', 0, yPosition, pdfWidth, pageHeight, '', 'NONE');
              yPosition += pageHeight;
              if (yPosition < pdfHeight) {
                pdf.addPage();
              }
            }
          }
 
          pdf.save('resultados_test.pdf');
          console.log('PDF generado con éxito.');
        })
        .catch(error => {
          console.error('Error al renderizar el canvas:', error);
        });
      } else {
        console.error('Error: No se encontró el elemento con ID user-data-container.');
      }
    } else {
      // Aquí se usa SweetAlert en lugar de la alerta por defecto
      Swal.fire({
        icon: 'error',
        title: 'Datos faltantes',
        text: 'Por favor, primero busque los datos del usuario.',
      });
      console.log('Datos de usuario, preguntas o respuestas VARK faltantes.');
    }
  }
 
 
}
 