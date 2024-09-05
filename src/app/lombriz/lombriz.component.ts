import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Lombriz } from '../Interfaces/interface-reporte';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataService } from '../Services/data.service';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-lombriz',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatFormField,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatTableModule,
    ToastModule,
    ButtonModule,
    RippleModule
  ],
  providers:[
    MessageService
  ],
  templateUrl: './lombriz.component.html',
  styleUrls: ['./lombriz.component.scss']
})
export class LombrizComponent {

  lombrices : Lombriz[]= [ ];
  lombricesAlmacenadas: Lombriz[] = [];
  displayedColumns: string[] = ['peso', 'longitud', 'especie', 'reproduccion', 'acciones'];
  dataSource = new MatTableDataSource<Lombriz>(this.lombricesAlmacenadas);

  peso: FormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(2), Validators.pattern("[0-9]+(\\.[0-9]{1,2})?")]);
  longitud: FormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(20), Validators.pattern("[0-9]+(\\.[0-9]{1,2})?")]);
  especie: FormControl = new FormControl('', [Validators.required]);
  reproduccion: FormControl = new FormControl('', [Validators.required]);

  constructor(private evento: ChangeDetectorRef,
    private dataService: DataService,
    private messageService: MessageService
  ) {}

  almacenarLombriz() {
    if (this.peso.invalid || this.longitud.invalid || this.especie.invalid || this.reproduccion.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error',detail: 'Error en el formulario' });
      return;
    }

    const nuevaLombriz: Lombriz = {
      PesoLombriz: this.peso.value,
      LongitudLombriz: this.longitud.value,
      EspecieLombriz: this.especie.value,
      EtapaReprLombriz: this.reproduccion.value
    };

    this.lombricesAlmacenadas.push(nuevaLombriz);
    this.dataSource.data = this.lombricesAlmacenadas;

    this.especie.reset();
    this.longitud.reset();
    this.peso.reset();
    this.reproduccion.reset();
  }

  sendValues() {
    if (this.peso.value === '' && this.longitud.value === '' && this.especie.value === '' && this.reproduccion.value === '') {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El formulario está vacío' });
    return;
  }
  // Verificar si hay lombrices almacenadas antes de guardar
  if (this.lombricesAlmacenadas.length === 0) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No hay lombrices almacenadas para guardar' });
    return;
  }

    this.lombrices = this.lombricesAlmacenadas;
    this.dataService.enviarLombrizs(this.lombrices);
    this.dataService.almacenarReporteLlenado('Lombriz');
    this.messageService.add({ severity: 'success', summary: 'Éxito',detail: 'Lombrices Agregadas al reporte temporal' });
    this.lombricesAlmacenadas=[];
    console.log('Lombrices guardadas:', this.lombrices);
  }

  deleteLombriz(index: number) {
    this.lombricesAlmacenadas.splice(index, 1);
    this.dataSource.data = this.lombricesAlmacenadas;
    this.evento.detectChanges();
    console.log('Lombriz eliminada en el índice:', index);
    console.log('Lombrices almacenadas:', this.lombricesAlmacenadas);
  }
}
