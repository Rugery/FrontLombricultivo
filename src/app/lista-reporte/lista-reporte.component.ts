import { MatInputModule} from '@angular/material/input';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReporteService } from './../Services/reporte.service';
import { MatCell, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConsumoRecurso, EventoSistema, Lombriz, Mantenimiento, Reporte, Sustrato } from './../Interfaces/reporte.interface';
import { MatIconModule} from '@angular/material/icon';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatButton , MatButtonModule} from '@angular/material/button';
import { CdkTableModule } from '@angular/cdk/table';
import { MatCardModule} from '@angular/material/card';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { CellHookData } from 'jspdf-autotable';

@Component({
  selector: 'app-lista-reporte',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    DatePipe,
    MatIconModule,
    NgFor, NgIf,
    MatCell, MatButton,
    CdkTableModule,
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './lista-reporte.component.html',
  styleUrl: './lista-reporte.component.scss'
})
export class ListaReporteComponent implements OnInit{
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  displayedColumns: string[] = ['NomTipoReporte', 'FechaReporte', 'acciones'];
  dataSource = new MatTableDataSource<Reporte>();
  expandedElement: Reporte | null = null;

  cargarImagenComoBlob(url: string): Promise<string> {
    return fetch(url)
      .then(response => response.blob())
      .then(blob => {
        return URL.createObjectURL(blob);
      });
  }

  constructor(private reporteService: ReporteService) { }

  ngOnInit() {
    this.obtenerDatos();
    this.configurarFiltroPersonalizado();
  }
  configurarFiltroPersonalizado() {
    this.dataSource.filterPredicate = (data: Reporte, filter: string) => {
      return data.oFKTipoReporte?.NomTipoReporte.toLowerCase().includes(filter);
    };
  }

  obtenerDatos() {
    this.reporteService.obtenerReportes().subscribe({
      next: data => {
        const sortedData = data.sort((a, b) => new Date(a.FechaReporte).getTime() - new Date(b.FechaReporte).getTime());
        const reportesOrdenados = sortedData.map(reporte => ({
          ...reporte,
          detalleVisible: false,
          detalles: {
            oConsumoRecursos: reporte.oConsumoRecursos || [], // Manejar caso donde oConsumoRecursos puede ser undefined
            oEventoSistemas: reporte.oEventoSistemas || [], // Manejar caso donde oEventoSistemas puede ser undefined
            oLombrizs: reporte.oLombrizs || [], // Manejar caso donde oLombrizs puede ser undefined
            oMantenimientos: reporte.oMantenimientos || [], // Manejar caso donde oMantenimientos puede ser undefined
            oSustratos: reporte.oSustratos || [] // Manejar caso donde oSustratos puede ser undefined
          }
        }));
        this.dataSource.data = reportesOrdenados;
        this.dataSource.sort = this.sort ?? null;
        if (this.paginator) {
          this.paginator.firstPage();
          this.dataSource.paginator = this.paginator;
        } else {
          console.error('Paginator is undefined.');
        }
      },
      error: error => {
        console.error('Error al obtener los reportes:', error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleDetalle(reporte: Reporte) {
    this.expandedElement = this.expandedElement === reporte ? null : reporte;
  }

  isExpansionDetailRow(index: number, row: any): boolean {
    return row.detalles !== undefined;
  }

  descargarPDF(reporte: Reporte) {
    const doc = new jsPDF();

    const urlUniversidad = 'assets/icons/universidad.png';
    const urlLestoma = 'assets/icons/Lestoma.png';
    const urlVermi = 'assets/icons/vermi.png';

    Promise.all([
      this.cargarImagenComoBlob(urlUniversidad),
      this.cargarImagenComoBlob(urlLestoma),
      this.cargarImagenComoBlob(urlVermi)
    ]).then(urlsBlob => {
      // Agregar las imágenes al PDF
      const UniversidadWidth = 40;
      const VermiWidth = 30;
      const LestomaWidth = 40;

      const imgHeight = 20;
      const imgY = 10;
      doc.addImage(urlsBlob[0], 'PNG', 10, imgY, UniversidadWidth, imgHeight); // Izquierda
      doc.addImage(urlsBlob[1], 'PNG', 90, imgY, LestomaWidth, imgHeight); // Centro
      doc.addImage(urlsBlob[2], 'PNG', 170, imgY, VermiWidth, imgHeight);// Derecha


      // Ajustar la posición inicial del contenido del PDF
      let startY = imgY + imgHeight + 10; // Asegurar que el contenido empiece debajo de las imágenes

      // Título principal del reporte
      doc.setFontSize(18);
      doc.text('Reporte Detallado', 105, startY, { align: 'center' });
      startY += 10;

      // Separador visual
      doc.setLineWidth(0.5);
      doc.line(14, startY + 2, 200, startY + 2); // Línea horizontal bajo el título
      startY += 10;
      // Añadir pie de página
      const pageCount = doc.internal.pages.length; // Corrección: Obtener el número total de páginas
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i); // Establecer la página actual para añadir el pie de página
        const pageSize = doc.internal.pageSize; // Obtener las dimensiones de la página
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight(); // Altura de la página
        doc.setFontSize(10); // Tamaño de fuente para el primer texto
        doc.text('Software web para el registro, gestión y visualización de producción de vermicompost en el proyecto LESTOMA', pageSize.width / 2, pageHeight - 20, { align: 'center' });

        // Texto secundario más pequeño y debajo del primero
        doc.setFontSize(8); // Tamaño de fuente más pequeño para el segundo texto
        doc.text('© 2024 GISTFA. Derechos reservados.', pageSize.width / 2, pageHeight - 15, { align: 'center' });
      }

      // Información básica del reporte
      doc.setFontSize(12);
      doc.text(`Fecha de Reporte: ${this.formatDate(reporte.FechaReporte)}`, 14, startY);
      startY += 10;
      doc.text(`Tipo de Reporte: ${reporte.oFKTipoReporte?.NomTipoReporte}`, 14, startY);
      startY += 15;

      let finalY = startY;

      const detalles = reporte.detalles;
      const secciones = [
        { title: 'Consumo de Recursos', data: detalles.oConsumoRecursos, mapping: { CantAguaConsumo: 'Cantidad de Agua', CantEnergiaConsumo: 'Cantidad de Energía', DescConsumo: 'Descripción' } },
        { title: 'Eventos de Sistemas', data: detalles.oEventoSistemas, mapping: { DescEvento: 'Descripción', AccionEvento: 'Acción', AnomaliaEvento: 'Anomalía' } },
        { title: 'Lombrices', data: detalles.oLombrizs, mapping: { EspecieLombriz: 'Especie', PesoLombriz: 'Peso', LongitudLombriz: 'Longitud', EtapaReprLombriz: 'Etapa de Reproducción' } },
        { title: 'Mantenimientos', data: detalles.oMantenimientos, mapping: { TipoMantenimiento: 'Tipo', DescMantenimiento: 'Descripción' } },
        { title: 'Sustratos', data: detalles.oSustratos, mapping: { PhSustrato: 'pH', ComposSustrato: 'Composición', NivNutSustrato: 'Nivel de Nutrientes', TempSustrato: 'Temperatura', HumSustrato: 'Humedad' } }
      ];

      secciones.forEach((seccion, index) => {
        if (seccion.data.length > 0) {
          doc.setFontSize(14);
          doc.setTextColor(0, 0, 0);
          doc.text(seccion.title, 14, finalY);

          // Filtrar las claves para excluir las PK, FK y oFKTipoReporte
          const keys = Object.keys(seccion.data[0]) as (keyof (ConsumoRecurso | EventoSistema | Lombriz | Mantenimiento | Sustrato))[];
          const filteredKeys = keys.filter(key => typeof key === 'string' && !(key as string).startsWith('Pk') && !(key as string).startsWith('Fk') && key !== 'oFKusrReporte');

          // Mapear los valores a cadenas de texto utilizando el mapeo definido
          const values = seccion.data.map(item => filteredKeys.map(key => {
            if (item[key] !== undefined && item[key] !== null) {
              const value = item[key];
              const unit = this.getUnitForKey(key);
              return `${value} ${unit}`;
            } else {
              return '';
            }
          }));

          // Dentro de tu llamada a doc.autoTable
          doc.autoTable({
            head: [filteredKeys.map(key => this.capitalizeFirstLetter(seccion.mapping[key] || key as string))],
            body: values,
            startY: finalY + 5,
            theme: 'grid',
            margin: { left: 14 },
            didParseCell: function(data: CellHookData) { // Aquí se proporciona un tipo explícito para 'data'
              if (data.row.section === 'head') {
                data.cell.styles.fillColor = [0, 123, 62]; // Color HEX #007B3E convertido a RGB
              }
            },
          });


          finalY = (doc as any).lastAutoTable.finalY + 10 || 20; // Actualizar finalY asegurando un valor inicial si es undefined
        }
      });

      // Guardar el PDF con un nombre único
      doc.save(`reporte_${reporte.PkusrReporte}.pdf`);
    }).catch(error => {
      console.error('Error al cargar la imagen:', error);
    });
  }

  // Función para formatear la fecha
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  // Función para capitalizar la primera letra de una cadena
  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Función para obtener la unidad correspondiente a una clave
  getUnitForKey(key: string): string {
    switch (key) {
      case 'PesoLombriz':
        return 'gramos';
      case 'LongitudLombriz':
        return 'cm';
      case 'TempSustrato':
        return '°C';
      case 'HumSustrato':
        return '%';
      case 'CantAguaConsumo':
        return 'litros';
      case 'CantEnergiaConsumo':
        return 'kWh';
      default:
        return ''; // Si no hay unidad definida, retornar cadena vacía
    }
  }

}
