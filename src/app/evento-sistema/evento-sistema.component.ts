import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatFormField  } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select';
import { EventoSistema } from '../Interfaces/interface-reporte';
import { DataService } from '../Services/data.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-evento-sistema',
  standalone: true,
  imports: [ FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatFormField,
    ReactiveFormsModule,
    MatSelectModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    CommonModule,
  ],
  providers:[
    MessageService
  ],
  templateUrl: './evento-sistema.component.html',

})
export class EventoSistemaComponent {

  constructor(private dataService: DataService,
    private messageService: MessageService
  ) { }

  DescripcionEvento: FormControl = new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9 ]*$')] );
  AccionEvento: FormControl = new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9 ]*$')]);
  AnomaliaEvento: FormControl = new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9 ]*$')]);

  sendValues(){
    if (this.DescripcionEvento.invalid || this.AccionEvento.invalid || this.AnomaliaEvento.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error',detail: 'Error en el formulario' });
      return;
    }


    const nuevoEvento : EventoSistema = {
      DescEvento: this.DescripcionEvento.value,
      AccionEvento: this.AccionEvento.value,
      AnomaliaEvento: this.AnomaliaEvento.value
    }
    this.dataService.enviarEventoSistema(nuevoEvento);
    this.dataService.almacenarReporteLlenado('Evento del Sistema');
    this.messageService.add({ severity: 'success', summary: 'Éxito',detail: 'Evento Agregado al reporte temporal' });
    console.log(nuevoEvento);
    this.DescripcionEvento.reset();
    this.AccionEvento.reset();
    this.AnomaliaEvento.reset();

  }

}
