import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com'; // Importa EmailJS y EmailJSResponseStatus

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

    emailjs.init('yQJyRtJssfWLhQiEo'); // Reemplaza 'user_your_api_key' con tu clave API de EmailJS
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
          // Realiza acciones adicionales después de enviar el correo si es necesario
        },
        (error) => {
          console.error('Error al enviar el correo electrónico:', error);
          // Maneja errores si es necesario
        }
      );
  }

  ngOnInit(): void {
  }
}
