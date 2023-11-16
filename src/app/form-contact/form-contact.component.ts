import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import Swal from 'sweetalert2'; // Importa SweetAlert2

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.less']
})
export class FormContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(20)]]
    });

    emailjs.init('yQJyRtJssfWLhQiEo'); // Asegúrate de usar tu User ID real de EmailJS aquí
  }

  get f() {
    return this.contactForm.controls;
  }

  sendEmail() {
    
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    const templateParams = {
      from_name: this.contactForm.value.nombre,
      from_email: this.contactForm.value.email,
      message: this.contactForm.value.mensaje
    };

    emailjs
      .send('ProyectoTest', 'template_test', templateParams)
      .then(
        (response: EmailJSResponseStatus) => {
          console.log('Correo electrónico enviado con éxito:', response);
          // Muestra un SweetAlert con el mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Enviado!',
            text: 'Tu mensaje ha sido enviado con éxito.',
          });
        },
        (error) => {
          console.error('Error al enviar el correo electrónico:', error);
          // Muestra un SweetAlert con el mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.',
          });
        }
      );
  }

  ngOnInit(): void {
  }
}
