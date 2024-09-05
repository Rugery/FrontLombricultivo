import { Sustrato } from './../Interfaces/interface-reporte';
import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule, Validators, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { DataService } from '../Services/data.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { EmailService } from '../Services/Email.service';


@Component({
  selector: 'app-sustrato',
  standalone: true,
  imports: [ FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatFormField,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    ToastModule,
    ButtonModule,
    RippleModule,

  ],
  providers:[
    MessageService
  ],
  templateUrl: './sustrato.component.html',
  styleUrl: './sustrato.component.scss'
})
export class SustratoComponent  implements OnDestroy {

  constructor(private dataService: DataService,
    private messageService: MessageService,
    private emailService: EmailService,

  ){this.phSubscription = this.PhSustrato.valueChanges.subscribe(() => {
    this.updateCubeColor();
  });}

  PhSustrato: FormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(14) , Validators.pattern("[0-9]+(\\.[0-9]{1,2})?")])
  ComposSustrato: FormControl = new FormControl('', [Validators.required]);
  NivelSustrato: FormControl = new FormControl('', [Validators.required]);
  TempSustrato: FormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(30) , Validators.pattern("-?\\d+(\\.\\d+)?")]);
  HumSustrato: FormControl = new FormControl('', [Validators.required, Validators.min(40), Validators.max(100), Validators.pattern("[0-9]+(\\.[0-9]{1,2})?")])

  cubeColor: string = 'transparent';
  private phSubscription!: Subscription;
  phDescription: string = '';


  updateCubeColor() {
    const phValue = Math.round(this.PhSustrato.value);

    const colorMap: { [key: number]: string } = {
        0: '#fd1c18',
        1: '#fe6903',
        2: '#fec900',
        3: '#f8ee01',
        4: '#aad501',
        5: '#5ac307',
        6: '#03ba2e',
        7: '#01aa35',
        8: '#00b862',
        9: '#02bab8',
        10: '#048fd0',
        11: '#264dac',
        12: '#433872',
        13: '#6e41a6',
        14: '#51248d'
    };

    this.cubeColor = colorMap[phValue] || 'transparent'; // Transparente para valores fuera de rango

    if (phValue >= 0 && phValue < 7) {
        this.phDescription = 'Ácido';
    } else if (phValue == 7) {
        this.phDescription = 'Neutro';
    } else if (phValue > 7 && phValue <= 14) {
        this.phDescription = 'Alcalino';
    } else {
        this.phDescription = ''; // Para valores fuera de rango
    }
}

  ngOnDestroy() {
    // Asegúrate de desuscribirte para evitar fugas de memoria
    this.phSubscription.unsubscribe();
  }


  sendValues(){
    if (this.PhSustrato.invalid || this.ComposSustrato.invalid || this.NivelSustrato.invalid || this.TempSustrato.invalid|| this.HumSustrato.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error',detail: 'Error en el formulario' });
      return;
    }


     const nuevoSustrato : Sustrato = {
      PhSustrato: this.PhSustrato.value,
      ComposSustrato: this.ComposSustrato.value,
      NivNutSustrato: this.NivelSustrato.value,
      TempSustrato: this.TempSustrato.value,
      HumSustrato: this.HumSustrato.value
    }
    this.dataService.enviarSustrato(nuevoSustrato);
    this.dataService.almacenarReporteLlenado('Sustrato');
    if(nuevoSustrato.PhSustrato < 6 || nuevoSustrato.PhSustrato > 8 || nuevoSustrato.TempSustrato < 15 || nuevoSustrato.TempSustrato > 25 || nuevoSustrato.HumSustrato < 80 || nuevoSustrato.HumSustrato > 90){
      this.emailService.enviarCorreo().subscribe();
      this.messageService.add({ severity: 'error', summary: 'Error',detail: 'Las variables de control estan fuera de su rango' });
    }
    this.messageService.add({ severity: 'success', summary: 'Éxito',detail: 'Sutrato Agregado al reporte temporal' });
    console.log(nuevoSustrato);


    this.PhSustrato.reset();
    this.ComposSustrato.reset();
    this.NivelSustrato.reset();
    this.TempSustrato.reset();
    this.HumSustrato.reset();
    this.cubeColor = 'transparent';
  }

}
