import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { MatGridListModule } from '@angular/material/grid-list';
import { DashboardService } from '../Services/dashboard.service';
import { Dashboard } from '../Interfaces/reporte.interface';
import { MatCardModule } from '@angular/material/card';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule, PanelModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  basicData: any;
  basicOptions: any;

  polarData: any;
  polarOptions: any;

  lineData: any;
  lineOptions: any;

  private dashboardData: Dashboard[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicOptions = {
      responsive: true,
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    this.dashboardService.obtenerDashboard().subscribe((data: Dashboard[]) => {
      this.dashboardData = data;


      const fechaLimite = new Date();
      fechaLimite.setDate(fechaLimite.getDate() - 20);
      const datosRecientes = data.filter(item => new Date(item.fecha) >= fechaLimite);
      const labels = datosRecientes.map(item => new Date(item.fecha).toLocaleDateString());
      const sustratoData = datosRecientes.map(item => item.sustrato);
      const temperaturaData = datosRecientes.map(item => item.temperatura);
      const humedadData = datosRecientes.map(item => item.humedad);

      const maxSustrato = Math.max(...sustratoData);
      const maxTemperatura = Math.max(...temperaturaData);
      const maxHumedad = Math.max(...humedadData);

      this.basicData = {
        labels: labels,
        datasets: [
          {
            label: 'Sustrato',
            data: sustratoData,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgb(255, 159, 64)',
            borderWidth: 1
          },
          {
            label: 'Temperatura',
            data: temperaturaData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
          },
          {
            label: 'Humedad',
            data: humedadData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
          }
        ]
      };

      this.polarData = {
        labels: ['MaxHumedad', 'MaxTemperatura', 'MaxSustrato'],
        datasets: [
          {
            data: [maxHumedad, maxTemperatura, maxSustrato],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgb(54, 162, 235)",
              "rgb(75, 192, 192)",
              "rgba(255, 159, 64)"
            ]
          }
        ]
      };

      this.polarOptions = {
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: 'Valores Totales por Categoría'
        },
        scale: {
          ticks: {
            beginAtZero: true
          },
          reverse: false
        },
        animation: {
          animateRotate: true,
          animateScale: true
        }
      };
    });

    this.dashboardService.obtenerDashboard().subscribe((data: Dashboard[]) => {
      const fechaLimite = new Date();
      fechaLimite.setDate(fechaLimite.getDate() - 50);

      const datosRecientes = data.filter(item => new Date(item.fecha) >= fechaLimite);
      const labels = datosRecientes.map(item => new Date(item.fecha).toLocaleDateString());
      const sustratoData = datosRecientes.map(item => item.sustrato);
      const temperaturaData = datosRecientes.map(item => item.temperatura);
      const humedadData = datosRecientes.map(item => item.humedad);

      this.lineData = {
        labels: labels,
        datasets: [
          {
            label: 'Sustrato',
            data: sustratoData,
            fill: true,
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--orange-500'),
            backgroundColor: 'rgba(255,167,38,0.2)'
          },
          {
            label: 'Temperatura',
            data: temperaturaData,
            fill: false,
            borderDash: [5, 5],
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--teal-500')
          },
          {
            label: 'Humedad',
            data: humedadData,
            fill: false,
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--blue-500')
          }
        ]
      };

      this.lineOptions = {
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Fecha',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Valor',
            },
            beginAtZero: true,
          },
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      };
    });
  }

  exportToExcel() {
    // Convertir las fechas al formato deseado antes de exportar
    const formattedData = this.dashboardData.map(item => ({
      ...item,
      fecha: new Date(item.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcelFile(excelBuffer, 'dashboard_data');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
