import { Component, ElementRef, ViewChild} from '@angular/core';
import { Router, RouterOutlet , RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../Auth/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,RouterModule, MatButton,   MatIcon, ToastModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('title', { static: true }) title!: ElementRef;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  redirectToDashboard(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/navegacion/dashboard']);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debes iniciar sesión para ingresar.' });
      setTimeout(() => {
        window.location.href = 'http://192.168.1.8';
      }, 3000);
    }
  }
}
