import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './Auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NavegacionComponent,
    DashboardComponent,
    HomeComponent,
    ButtonModule,
    RippleModule,
    CommonModule],
  providers:[
    MessageService
  ],

  templateUrl: './app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  title = 'FrontLomb';
  usuarioRol: string = '';

  constructor(private authService: AuthService,
    private messageService: MessageService, private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.guardarTokenEnLocalStorage();
  }

  guardarTokenEnLocalStorage(): void {
    const token = this.cookieService.get('Token');
    this.authService.guardarToken(token);
  }
}
