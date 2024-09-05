import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isBrowser()) { // Verificar si estamos en un entorno de navegador
      const token = this.authService.getToken(); // Usar el AuthService para obtener el token

      if (token) {
        return true; // Permitir el acceso
      } else {
        // Redirigir si no hay token
        //window.location.replace('https://www.google.com'); // Cambiar esto a tu página de login
        return true;
      }
    } else {
      return false;
    }
  }
}
