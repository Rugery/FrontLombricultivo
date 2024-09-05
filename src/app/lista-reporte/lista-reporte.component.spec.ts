import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { ListaReporteComponent } from './lista-reporte.component';

describe('ListaReporteComponent', () => {
  let component: ListaReporteComponent;
  let fixture: ComponentFixture<ListaReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListaReporteComponent,
        BrowserAnimationsModule // Añade BrowserAnimationsModule aquí
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el ListaReporteComponent', () => {
    expect(component).toBeTruthy();
  });
});
