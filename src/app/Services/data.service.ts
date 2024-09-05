
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ConsumoRecurso, EventoSistema, Lombriz, Mantenimiento, Reporte, Sustrato, TipoReporte } from '../Interfaces/interface-reporte';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../Auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private tipoReporte!: TipoReporte;
  private eventoSistema!: EventoSistema;
  private mantenimiento!: Mantenimiento;
  private sustrato!: Sustrato;
  private consumo!: ConsumoRecurso;
  private lombrizs!: Lombriz[];


  private apiUrl = 'http://localhost:5240/api/Lombricultivo/CrearReporte';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  enviarReporte(reporte: Reporte) {
    return this.http.post<any>(this.apiUrl, reporte, { headers: this.getHeaders(), responseType: 'text' as 'json' })
      .pipe(
        catchError((error: any) => {
          console.error('Error al enviar el reporte:', error);
          return throwError(() => error);
        })
      );
  }

  enviarTipoReporte(tipoReporte: TipoReporte) {
    this.tipoReporte = tipoReporte;
  }

  enviarEventoSistema(eventoSistema: EventoSistema) {
    this.eventoSistema = eventoSistema;
  }

  enviarMantenimiento(mantenimiento: Mantenimiento) {
    this.mantenimiento = mantenimiento;
  }

  enviarSustrato(sustrato: Sustrato) {
    this.sustrato = sustrato;
  }

  enviarConsumo(consumo: ConsumoRecurso) {
    this.consumo = consumo;
  }

  enviarLombrizs(lombrizs: Lombriz[]) {
    this.lombrizs = lombrizs;

  }

  obtenerReporte(): any {
    const reporte: any = {};

    if (this.tipoReporte?.NomTipoReporte) {
      reporte.tipoReporte = {
        nomTipoReporte: this.tipoReporte.NomTipoReporte
      };
    }

    if (this.eventoSistema) {
      reporte.eventoSistema = {
        descEvento: this.eventoSistema.DescEvento,
        accionEvento: this.eventoSistema.AccionEvento,
        anomaliaEvento: this.eventoSistema.AnomaliaEvento
      };
    }

    if (this.mantenimiento) {
      reporte.mantenimiento = {
        tipoMantenimiento: this.mantenimiento.TipoMantenimiento,
        descMantenimiento: this.mantenimiento.DescMantenimiento
      };
    }

    if(this.sustrato){
      reporte.sustrato = {
        phSustrato: this.sustrato.PhSustrato,
        composSustrato: this.sustrato.ComposSustrato,
        nivNutSustrato: this.sustrato.NivNutSustrato,
        tempSustrato: this.sustrato.TempSustrato,
        humSustrato: this.sustrato.HumSustrato
      }
    }

    if(this.consumo){
      reporte.consumoRecurso = {
        cantAguaConsumo: this.consumo.CantAguaConsumo,
        cantEnergiaConsumo: this.consumo.CantEnergiaConsumo,
        descConsumo: this.consumo.DescConsumo
      }
    }

    if(this.lombrizs){
      reporte.lombrizs = this.lombrizs.map(lombriz => {
        return {
          pesoLombriz: lombriz.PesoLombriz,
          especieLombriz: lombriz.EspecieLombriz,
          longitudLombriz: lombriz.LongitudLombriz,
          etapaReprLombriz: lombriz.EtapaReprLombriz
        }
      });
    }
    return reporte;
  }

  limpiarReporte() {
    this.tipoReporte = undefined!;
    this.eventoSistema = undefined!;
    this.mantenimiento = undefined!;
    this.sustrato = undefined!;
    this.consumo = undefined!;
    this.lombrizs = [];
  }

  private reportesLlenados: TipoReporte[] = [];

  almacenarReporteLlenado(reporte: any) {
    this.reportesLlenados.push(reporte);
  }

  obtenerReportesLlenados(): any[] {
    return this.reportesLlenados;
  }

  limpiarReportesLlenados() {
    this.reportesLlenados = [];
  }



}
