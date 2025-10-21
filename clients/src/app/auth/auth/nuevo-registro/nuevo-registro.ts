import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nuevo-registro',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nuevo-registro.html',
  styleUrls: ['./nuevo-registro.css']
})
export class NuevoRegistro {
  constructor(private router: Router) { }

  onRegistroExitoso() {
    // cuando termines el proceso de registro, llamás esto
    this.router.navigate(['/usuario-creado']);
  }
}


