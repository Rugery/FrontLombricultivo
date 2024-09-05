import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatFormField  } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select';
import { ConsumoRecurso } from '../Interfaces/interface-reporte';
import { DataService } from '../Services/data.service';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-consumo',
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

  templateUrl: './consumo.component.html',

})
export class ConsumoComponent {
  CantAgua: FormControl =new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("[0-9]+(\\.[0-9]{1,2})?")]);
  CantEnergia: FormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("[0-9]+(\\.[0-9]{1,2})?")]);
  DescConsumo: FormControl =  new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9 ]*$')] );

  constructor(private dataService: DataService,
    private messageService: MessageService
  ) {}


  sendValues(){

    if (this.CantAgua.invalid || this.CantEnergia.invalid  || this.DescConsumo.invalid){
      this.messageService.add({ severity: 'error', summary: 'Error',detail: 'Error en el formulario' });
      return;
    }
    const nuevoConsumo:ConsumoRecurso = {
      CantAguaConsumo: this.CantAgua.value,
      CantEnergiaConsumo: this.CantEnergia.value,
      DescConsumo: this.DescConsumo.value
    }
    this.dataService.enviarConsumo(nuevoConsumo);
    this.dataService.almacenarReporteLlenado('Consumo Recursos');
    this.messageService.add({ severity: 'success', summary: 'Éxito',detail: 'Consumo Agregado al reporte temporal' });
    this.CantAgua.reset();
    this.CantEnergia.reset();
    this.DescConsumo.reset();

    console.log(nuevoConsumo);

  }

}
