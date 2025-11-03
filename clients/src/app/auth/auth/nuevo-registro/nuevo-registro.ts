import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// Importaciones de módulos de formularios reactivos
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-registro',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './nuevo-registro.html',
  styleUrls: ['./nuevo-registro.css']
})
// OnInit
export class NuevoRegistro implements OnInit {
  // Variable para el formulario
  registroForm!: FormGroup;
  // Bandera para saber si se intentó enviar el formulario
  submitted = false;

  // Inyeccion de constructor para FormBuilder y Router
  constructor(private router: Router, private fb: FormBuilder) { }

  // Inicializacion del formulario en ngOnInit
  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      rol: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      codigoArea: ['+54', Validators.required],
      telefono: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      provincia: ['', Validators.required],
      ciudad: ['', Validators.required],
      terminos: [false, Validators.requiredTrue]
    });
  }

  // Getter de conveniencia para acceder fácilmente a los controles del formulario
  get f() {
    return this.registroForm.controls;
  }

  // Funcion que se llama al enviar el formulario
  onSubmit(): void {
    this.submitted = true; // Activa la visualización de los mensajes de error

    // Lógica de validación
    if (this.registroForm.invalid) {
      // Si el formulario NO es válido, el código se detiene aca.
      console.log("Formulario inválido. Mostrando errores.");
      return;
    }

    // Lógica de registro (si es necesario)
    // aca iría el servicio para enviar los datos al servidor.
    console.log("Analizando datos para la creacion del usuario.");

    // NAVEGACIÓN
    // Si se llega a esta línea, el formulario es válido, así que acepta y sigue a la siguiente pagina.
    this.router.navigate(['/usuario-creado']);
  }
}



