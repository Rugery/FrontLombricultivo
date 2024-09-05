import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { LombrizComponent } from './lombriz.component';
import { DataService } from '../Services/data.service';

describe('LombrizComponent', () => {
  let component: LombrizComponent;
  let fixture: ComponentFixture<LombrizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule, // Añade BrowserAnimationsModule aquí
        LombrizComponent
      ],
      providers: [
        DataService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LombrizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el LombrizComponent', () => {
    expect(component).toBeTruthy();
  });
});
