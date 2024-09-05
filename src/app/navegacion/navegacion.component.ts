import { ButtonModule } from 'primeng/button';
import { Component, inject , OnInit, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule} from '@angular/material/expansion';
import { RouterOutlet, RouterModule, Router   } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DataService } from '../Services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { TipoReporteDialogComponent } from '../tipo-reporte-dialog/tipo-reporte-dialog.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../Auth/auth.service';
import { PanelService } from '../Services/panel.service';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    ThemeSwitchComponent,
    FormsModule,
    MatExpansionModule,
    RouterOutlet,
    RouterModule,
    HomeComponent,
    ToastModule,
    ButtonModule,
    RippleModule,
    CommonModule,
    MatCardModule
  ],
  providers:[
    MessageService
  ]
})
export class NavegacionComponent implements OnInit {
  variablesControl: any;
  readonly panelOpenState = signal(false);
  ngOnInit(): void {
    this.fetchUserRole();
    this.obtenerVariablesControl();

  }

  fetchUserRole(): void {
    this.authService.fetchUserRole().subscribe({
      next: role => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Ha iniciado sesión como ${role}` });
      },
      error: error => {
        console.error('Error al obtener el rol del usuario:', error);
      }
    });
  }

  obtenerVariablesControl(): void {
    this.panel.obtenerVariablesControl().subscribe({
      next: data => {
        this.variablesControl = data;
      },
      error: error => {
        console.error('Error al obtener las variables de control:', error);
      }
    });
  }

  private breakpointObserver = inject(BreakpointObserver);

  constructor(private dataService: DataService,
    private dialog: MatDialog,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private panel: PanelService
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    guardar() {
      const dialogRef = this.dialog.open(TipoReporteDialogComponent, { width: '250px' });

      dialogRef.afterClosed().subscribe({
        next: result => {
          if (result) {
            const tipoReporte = { NomTipoReporte: result };
            this.dataService.enviarTipoReporte(tipoReporte);
            const reporte = this.dataService.obtenerReporte();
            const validProperties = ['tipoReporte', 'eventoSistema', 'mantenimiento', 'sustrato', 'consumoRecurso', 'lombrizs'];
            const validPropertyCount = validProperties.reduce((count, prop) => reporte[prop] ? count + 1 : count, 0);

            if (validPropertyCount < 2) {
              console.error('El reporte debe contener al menos el NomTipoReporte y otro objeto.');
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El reporte debe contener al menos un reporte.' });
              return;
            }

            this.dataService.enviarReporte(reporte).subscribe({
              next: response => {
                if (response === 'Reporte creado exitosamente') {
                  this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Reporte creado exitosamente' });
                  this.dataService.limpiarReporte();
                  this.dataService.limpiarReportesLlenados();
                } else {
                  console.error('Error al crear el reporte:', response);
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algo ha ocurrido' });
                }
              },
              error: error => {
                console.error('Error al enviar el reporte:', error);
                this.messageService.add({ severity: 'error', summary: 'Error 500', detail: 'Problemas con el Servidor' });
              }
            });
          }
        },
        error: error => {
          console.error('Error al cerrar el diálogo:', error);
        }
      });
    }

    isOperario(): boolean {
      return this.authService.isOperario();
    }

    isSuperAdministrador(): boolean {
      return this.authService.isSuperAdministrador();
    }

    logout(): void {
      this.authService.logout();

    }

}
