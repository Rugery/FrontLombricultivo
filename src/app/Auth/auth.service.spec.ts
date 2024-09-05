import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] // Añade HttpClientTestingModule aquí
    });
    service = TestBed.inject(AuthService);
  });

  it('Debe existir el AtuhService', () => {
    expect(service).toBeTruthy();
  });
});
