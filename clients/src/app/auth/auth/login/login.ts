import { Component } from '@angular/core';
import { AuthRoutingModule } from "../../auth-routing-module";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthRoutingModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

}
