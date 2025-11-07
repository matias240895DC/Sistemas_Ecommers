import { Component, effect, inject, Renderer2 } from '@angular/core';
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      // Solo ejecutar en el navegador (no en SSR)
      if (isPlatformBrowser(this.platformId)) {
        if (this.themeService.darkMode()) {
          this.renderer.addClass(document.body, 'dark');
        } else {
          this.renderer.removeClass(document.body, 'dark');
        }
      }
    });
  }
}
