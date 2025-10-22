import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, Navbar],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

}
