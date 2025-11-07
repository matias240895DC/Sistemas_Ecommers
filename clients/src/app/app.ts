import { Component, DOCUMENT, effect, inject, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private themeService = inject(ThemeService);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT); // ✅ inyectamos DOCUMENT

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
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

//  if (isPlatformBrowser(this.platformId)) {
//         if (this.themeService.darkMode()) {
//           this.renderer.addClass(document.body, 'dark');
//         } else {
//           this.renderer.removeClass(document.body, 'dark');
//         }
//       }