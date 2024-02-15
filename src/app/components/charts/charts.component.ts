import { Component, ViewChild } from '@angular/core';

import { ChartModule } from 'primeng/chart';
import { ServiceService } from 'src/app/service.service';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { fadeInOutAnimation } from '../animations/animate';
import * as Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d'; // Importa el módulo Highcharts 3D

@Component({
  selector: 'app-charts',
  standalone: true,
imports: [ChartModule,CommonModule,MatFormFieldModule,MatSelectModule,MatProgressSpinnerModule,MatCardModule],
animations:[fadeInOutAnimation],

  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {
  loading: true;

  data: any;
  violence: any;
  options :any
  selectedChartType:any ="bar"  // Valor predeterminado
isLoading: boolean=true;

  constructor(private service:ServiceService<any>) {
   
    this.getSuicides()
  }
  onSelectionChange(event: any) {
    this.selectedChartType= event.value 
    }
    renderChart() {
     
    }
    getRandomColor() {
      // Generar un color hexadecimal aleatorio
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  ngOnInit(): void {
    Highcharts3D(Highcharts); // Activa el módulo Highcharts 3D
  }


  getSuicides() {
      this.service.Data("prevention/show").subscribe({
          next: (n) => {
              this.options = n['data']['result'];
              const causasContador: { [key: string]: number } = {};
              const violenceContador: { [key: string]: number } = {};
              
              this.options.forEach((item) => {
                  const causa = item.age;
                  const violencia = item.causa;
  
                  if (!causasContador[causa]) {
                      causasContador[causa] = 1;
                  } else {
                      causasContador[causa]++;
                  }
  
                  if (!violenceContador[violencia]) {
                      violenceContador[violencia] = 1;
                  } else {
                      violenceContador[violencia]++;
                  }
              });
  
              const causasUnicas = Object.keys(causasContador);
              const conteosCausas = causasUnicas.map((causa) => causasContador[causa]);
  
              const violenceUnicas = Object.keys(violenceContador);
              const conteosViolencia = violenceUnicas.map((violencia) => violenceContador[violencia]);
  
              // Generar colores aleatorios para cada etiqueta
              const colorsCausas = causasUnicas.map(() => this.getRandomColor());
              const colorsViolencia = violenceUnicas.map(() => this.getRandomColor());
              Highcharts.chart('pie', {
                chart: {
                  type: 'pie',
                  options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                  }
                },
                title: {
                  text: 'Suicidios con Respecto a Edades',
                  align: 'center'
                },
                subtitle: {},


                accessibility: {
                  point: {
                    valueSuffix: '%'
                  }
                },
                tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                  pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                      enabled: true,
                      format: '{point.name}'
                    }
                  }
                },
                series: [{
                  type: 'pie',
                  name: 'Share',
                  data: violenceUnicas.map((value, index) => ({
                    name: value,
                    y: conteosViolencia[index],
                    sliced: index === 2, // Marcamos el tercer elemento como seleccionado
                    selected: index === 2 // Marcamos el tercer elemento como seleccionado
                  }))
                }]
              });
              
              
              Highcharts.chart('container', {
                chart: {
                  animation: true,
                  type: 'column',
                  options3d: {
                    enabled: true,
                    alpha: 20,
                    beta: 20,
                    depth: 300,
                    viewDistance: 25
                  }
                },
                title: {
                  text: 'Suicidios con Respecto a Motivos'
                },
                plotOptions: {
                  column: {
                    cursor: 'pointer',
                    dataLabels: {
                      enabled: true,
                      format: '{point.name}'
                    },
                    depth: 150,
                    colorByPoint: true, // Habilita el color por punto para que cada barra tenga un color diferente
                    allowPointSelect: false // Deshabilita la selección de puntos
                  }
                },
                xAxis: {
                  categories: violenceUnicas // Nombres de las barras
                },
                yAxis: {
                  title: {
                    text: null // O puedes usar una cadena vacía: text: ''
                  }
                },
               
               
                series: violenceUnicas.map((name, index) => ({
                  name: name,
                  type: 'column',
                  data: [{ y: conteosViolencia[index], color: this.getRandomColor() }] // Valores de las barras con colores aleatorios
                }))
              });
              
              
  


              // this.data = {
              //     labels: violenceUnicas,
              //     datasets: [
              //         {
              //             label: 'Suicidios con Respecto a Motivos',
              //             backgroundColor: colorsViolencia,
              //             data: conteosViolencia
              //         }
              //     ]
              // };
              // this.violence = {
              //     labels: causasUnicas,
              //     datasets: [
              //         {
              //             label: 'Suicidios con Respecto a Edades',
              //             backgroundColor: colorsCausas,
              //             data: conteosCausas
              //         }
              //     ]
              // };
              this.isLoading = false;
          },
          error: (e) => {
              this.isLoading = false;
          }
      });
  }
  
}
