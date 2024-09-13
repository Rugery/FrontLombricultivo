import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://192.168.1.7/api/Lombricultivo/EnviarCorreo';

  constructor(private http: HttpClient) { }

  enviarCorreo(): Observable<string> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }


    const decodedToken: any = jwtDecode(token);
    const correoDestino = decodedToken.email;
    console.log('Correo destino obtenido del token:', correoDestino);


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { to: correoDestino };

    return this.http.post<string>(this.apiUrl, body, { headers: headers, responseType: 'text' as 'json' });
  }
}
