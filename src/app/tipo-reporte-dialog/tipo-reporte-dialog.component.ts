import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../Services/data.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-tipo-reporte-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ToastModule
  ],
  providers:[
    MessageService
  ],
  templateUrl: './tipo-reporte-dialog.component.html',
})
export class TipoReporteDialogComponent {
  listaReporte: string = '';

  constructor(public dialogRef: MatDialogRef<TipoReporteDialogComponent>,
    private dataService : DataService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    this.actualizarListaReporte();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardarTipoReporte() {
    if (this.listaReporte.trim() === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Al menos debe haber un reporte almacenado.' });
      setTimeout(() => {
        this.dialogRef.close();
      }, 3000);
    } else {
      this.dialogRef.close(this.listaReporte);
    }
  }

  private actualizarListaReporte() {
    const reportes = this.dataService.obtenerReportesLlenados();
    if (reportes.length > 3) {
      this.listaReporte = 'General';
    } else {
      this.listaReporte = reportes.toString();
    }
  }
}
