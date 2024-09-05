import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { TipoReporteDialogComponent } from './tipo-reporte-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('TipoReporteDialogComponent', () => {
  let component: TipoReporteDialogComponent;
  let fixture: ComponentFixture<TipoReporteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TipoReporteDialogComponent,
        HttpClientTestingModule // Añade HttpClientTestingModule aquí
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TipoReporteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el TipoReporteDialogComponent', () => {
    expect(component).toBeTruthy();
  });
});
