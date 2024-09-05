import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SustratoComponent } from './sustrato.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

describe('SustratoComponent', () => {
  let component: SustratoComponent;
  let fixture: ComponentFixture<SustratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        SustratoComponent // Mover SustratoComponent a imports
      ],
      providers: [MessageService]
    }).compileComponents();

    fixture = TestBed.createComponent(SustratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el SustratoComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debe ser inválido cuando el formulario está vacío', () => {
    expect(component.PhSustrato.valid).toBeFalsy();
    expect(component.ComposSustrato.valid).toBeFalsy();
    expect(component.NivelSustrato.valid).toBeFalsy();
    expect(component.TempSustrato.valid).toBeFalsy();
    expect(component.HumSustrato.valid).toBeFalsy();
  });

  it('Debe validar el campo "PhSustrato"', () => {
    let phSustrato = component.PhSustrato;
    expect(phSustrato.valid).toBeFalsy();

    phSustrato.setValue('');
    expect(phSustrato.hasError('required')).toBeTruthy();

    phSustrato.setValue(-1);
    expect(phSustrato.hasError('min')).toBeTruthy();

    phSustrato.setValue(15);
    expect(phSustrato.hasError('max')).toBeTruthy();
  });

  it('Debe validar el campo "ComposSustrato"', () => {
    let composSustrato = component.ComposSustrato;
    expect(composSustrato.valid).toBeFalsy();

    composSustrato.setValue('');
    expect(composSustrato.hasError('required')).toBeTruthy();

    composSustrato.setValue('Compost');
    expect(composSustrato.valid).toBeTruthy();
  });

  it('Debe validar el campo "NivelSustrato"', () => {
    let nivelSustrato = component.NivelSustrato;
    expect(nivelSustrato.valid).toBeFalsy();

    nivelSustrato.setValue('');
    expect(nivelSustrato.hasError('required')).toBeTruthy();

    nivelSustrato.setValue('Alto');
    expect(nivelSustrato.valid).toBeTruthy();
  });

  it('Debe validar el campo "TempSustrato"', () => {
    let tempSustrato = component.TempSustrato;
    expect(tempSustrato.valid).toBeFalsy();

    tempSustrato.setValue('');
    expect(tempSustrato.hasError('required')).toBeTruthy();

    tempSustrato.setValue(-1);
    expect(tempSustrato.hasError('min')).toBeTruthy();

    tempSustrato.setValue(31);
    expect(tempSustrato.hasError('max')).toBeTruthy();

    tempSustrato.setValue('invalid');
    expect(tempSustrato.hasError('pattern')).toBeTruthy();

    tempSustrato.setValue(20);
    expect(tempSustrato.valid).toBeTruthy();
  });

  it('Debe validar el campo "HumSustrato"', () => {
    let humSustrato = component.HumSustrato;
    expect(humSustrato.valid).toBeFalsy();

    humSustrato.setValue('');
    expect(humSustrato.hasError('required')).toBeTruthy();

    humSustrato.setValue(39);
    expect(humSustrato.hasError('min')).toBeTruthy();

    humSustrato.setValue(101);
    expect(humSustrato.hasError('max')).toBeTruthy();

    humSustrato.setValue('invalid');
    expect(humSustrato.hasError('pattern')).toBeTruthy();

    humSustrato.setValue(85);
    expect(humSustrato.valid).toBeTruthy();
  });


});
