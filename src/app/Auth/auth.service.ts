import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';
  private roleKey = 'role';
  private apiUrl = 'http://192.168.1.7/api/Lombricultivo/ObtenerRolUser';
  private token: string | null = null;
  private userRole: string | null = null;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.initialize();
  }

  private initialize(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem(this.tokenKey);
      this.userRole = localStorage.getItem(this.roleKey);
    }
  }
  public isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getToken(): string | null {
    return this.token;
  }

  guardarToken(token: string): void {
    this.token = token;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getRole(): string | null {
    return this.userRole;
  }

  guardarRole(role: string): void {
    this.userRole = role;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.roleKey, role);
    } else {
      console.warn('localStorage is not available. Role not saved.');
    }
  }

  fetchUserRole(): Observable<string> {
    const headers = this.createAuthorizationHeader();
    if (!headers) {
      return of('');
    }

    return this.http.get<string>(`${this.apiUrl}`, { headers, responseType: 'text' as 'json' })
      .pipe(
        tap(role => {
          this.guardarRole(role);
        }),
        catchError(error => {
          console.error('Error fetching user role:', error);
          return of(''); // Maneja el error retornando un valor por defecto
        })
      );
  }

  private createAuthorizationHeader(): HttpHeaders | null {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      console.warn('No hay token almacenado.');
      return null; // Retorna null si no hay token para evitar el error
    }
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Token');
  }

   isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && token.trim() !== '';
  }

  isOperario(): boolean {
    return localStorage.getItem(this.roleKey) === 'Operario';
  }

  isSuperAdministrador(): boolean {
    return localStorage.getItem(this.roleKey) === 'Super Administrador';
  }

}
