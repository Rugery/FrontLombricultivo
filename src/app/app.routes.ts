import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaReporteComponent } from './lista-reporte/lista-reporte.component';
import { LombrizComponent } from './lombriz/lombriz.component';
import { SustratoComponent } from './sustrato/sustrato.component';
import { EventoSistemaComponent } from './evento-sistema/evento-sistema.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { ConsumoComponent } from './consumo/consumo.component';
import { HomeComponent } from './home/home.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { AuthGuard } from './auth.guard'; // Importa el guardia de rutas

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'navegacion', component: NavegacionComponent, canActivate: [AuthGuard],
    children: [
      { path: 'lombriz', component: LombrizComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'reporte', component: ListaReporteComponent, canActivate: [AuthGuard] },
      { path: 'sustrato', component: SustratoComponent, canActivate: [AuthGuard] },
      { path: 'evento-sistema', component: EventoSistemaComponent, canActivate: [AuthGuard] },
      { path: 'mantenimiento', component: MantenimientoComponent, canActivate: [AuthGuard] },
      { path: 'consumo', component: ConsumoComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
