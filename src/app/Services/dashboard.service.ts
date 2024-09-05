import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard } from '../Interfaces/reporte.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:5240/api/Lombricultivo/dashboard'; 

  constructor(private httpClient: HttpClient) { }

  obtenerDashboard(): Observable<Dashboard[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Dashboard[]>(`${this.apiUrl}`, { headers });
  }

}
