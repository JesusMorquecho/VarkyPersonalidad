import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@app/_services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(
        response => {
          // Muestra un SweetAlert con el mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: response.mensaje, // Asume que la respuesta tiene un campo `mensaje`
          });
        },
        error => {
          // Muestra un SweetAlert con el mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.mensaje, // Asume que el cuerpo del error tiene un campo `mensaje`
          });
        }
      );
    }
  }
  
}
