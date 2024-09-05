import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reporte } from '../Interfaces/reporte.interface';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  apiUrl = 'http://localhost:5240/api/Lombricultivo/ListaReportes';

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.obtenerReportes();
  }

  obtenerReportes(): Observable<Reporte[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Reporte[]>(`${this.apiUrl}`, { headers });
  }
  // obtenerReportes() {
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer ' + this.token
  //   });

  //   return this.http.get<Reporte[]>(this.apiUrl, { headers });
  // }
}
