import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Hero } from "./components/hero/hero";
import { About } from './components/about/about';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, Navbar, Hero, About],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

}
