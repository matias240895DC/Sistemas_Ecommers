import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-nuevo-registro',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './nuevo-registro.html',
  styleUrls: ['./nuevo-registro.css']
})
export class NuevoRegistro {
  // constructor(private router: Router) { }

  // onRegistroExitoso() {
  //   // cuando termines el proceso de registro, llamás esto
  //   this.router.navigate(['/usuario-creado']);
  // }
}


