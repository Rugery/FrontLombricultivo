import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule

import { EventoSistemaComponent } from './evento-sistema.component';

describe('EventoSistemaComponent', () => {
  let component: EventoSistemaComponent;
  let fixture: ComponentFixture<EventoSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule, // Añade BrowserAnimationsModule aquí
        EventoSistemaComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el EventoSistemaComponent', () => {
    expect(component).toBeTruthy();
  });
});
