import { Component, effect, inject, Renderer2, Signal, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private themeService = inject(ThemeService);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT); // ✅ inyectamos DOCUMENT

  constructor() {
    effect(() => {
      const body = this.document?.body; // ✅ usamos el documento inyectado
      if (!body) return; // seguridad extra

      if (this.themeService.darkMode()) {
        this.renderer.addClass(body, 'dark');
      } else {
        this.renderer.removeClass(body, 'dark');
      }
    });
  }
}
