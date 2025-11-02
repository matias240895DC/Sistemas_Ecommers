import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly darkMode = signal<boolean>(false);

  toggleDarkMode() {
    this.darkMode.set(!this.darkMode());
  }
}
