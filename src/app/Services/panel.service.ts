import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  private apiUrl = 'http://192.168.1.7/api/Lombricultivo/ObtenerVariablesControl';

  constructor(private httpClient: HttpClient) { }

  obtenerVariablesControl(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(`${this.apiUrl}`, { headers });
  }
}
