import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import  {MatSelectModule} from '@angular/material/select';
import { Mantenimiento } from '../Interfaces/interface-reporte';
import { DataService } from '../Services/data.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mantenimiento',
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
    CommonModule
  ],
  providers:[
    MessageService
  ],
  templateUrl: './mantenimiento.component.html',

})
export class MantenimientoComponent {

  constructor(private dataService: DataService,
    private messageService: MessageService
  ) { }

  TipoMantenimiento: FormControl = new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9 ]*$')] );
  DescMantenimiento: FormControl = new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9 ]*$')] );

  sendValues(){
    if (this.TipoMantenimiento.invalid || this.DescMantenimiento.invalid ){
      this.messageService.add({ severity: 'error', summary: 'Error',detail: 'Error en el formulario' });
      return;
    }

    const nuevoMantenimiento : Mantenimiento = {
      TipoMantenimiento: this.TipoMantenimiento.value,
      DescMantenimiento: this.DescMantenimiento.value
    }
    this.dataService.enviarMantenimiento(nuevoMantenimiento);
    this.dataService.almacenarReporteLlenado('Mantenimiento');
    this.messageService.add({ severity: 'success', summary: 'Éxito',detail: 'Mantenimiento Agregado al reporte temporal' });
    this.DescMantenimiento.reset();
    this.TipoMantenimiento.reset();
  }

}
