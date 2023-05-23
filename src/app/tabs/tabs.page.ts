import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  // Función para hacer el logout
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/intro', { replaceUrl: true });
  }

  // Función para ir a la página de "Acerca de nosotros"
  goToAboutUs() {
    this.router.navigateByUrl('/tabs/about-us');
  }

  // Función para ir a la página de "Perfil"
  goToProfile() {
    this.router.navigateByUrl('/tabs/profile');
  }

  // Función para ir a la página de "Centro de fugas"
  goToCentroDeFugas() {
    this.router.navigateByUrl('/tabs/centro-fugas');
  }
}
