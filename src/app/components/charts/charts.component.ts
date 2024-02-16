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
  conteosViolencia: any=[];
  violenceUnicas: any=[];
  causasUnicas: any=[];
  conteosCausas: any=[];

  constructor(private service:ServiceService<any>) {
   
    this.getSuicides()
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
  
               this.causasUnicas = Object.keys(causasContador);
               this.conteosCausas = this.causasUnicas.map((causa) => causasContador[causa]);
  
               this.violenceUnicas = Object.keys(violenceContador);
               this.conteosViolencia = this.violenceUnicas.map((violencia) => violenceContador[violencia]);
               this.createChart("column",this.causasUnicas,this.conteosCausas)
               this.createCausesChart()
              

              this.isLoading = false;
          },
          error: (e) => {
              this.isLoading = false;
          }
      });
  }
  createChart(chart,causas=[],conteos=[]){
    const finalChartConfig: any[] = [];
    finalChartConfig.push({

  

    })
    finalChartConfig.push(this.configChart(chart));
    finalChartConfig.push(this.configLegend());
    finalChartConfig.push(this.configTitle());
    finalChartConfig.push(this.configPlotOptions(chart));
    finalChartConfig.push(this.configXaxis());
    finalChartConfig.push(this.configYaxis());
    finalChartConfig.push(this.configData(chart,causas,conteos));
    Highcharts.chart('container', Object.assign({}, ...finalChartConfig));


  }



  configChart(chart: string) {
    switch(chart) {
      case "column":
      case "bar":
        return {
          chart: {
            type: `${chart}`,
            animation: true,
            options3d: {
              enabled: true,
              alpha: 10,
              beta: 20,
              depth: 300,
              viewDistance: 25
            }
          }
        };
      case "pie":
        return {
          chart: {
            type: `${chart}`,
            options3d: {
              enabled: true,
              alpha: 45,
              beta: 0
            }
          }
        };
      default:
        return {}; // Devuelve un objeto vacío si el tipo de gráfico no es reconocido
    }
  }
  
  
  

  configLegend() {
    return {
      legend: {
        bubbleLegend: {
          enabled: true,
          minSize: 20,
          maxSize: 60,
          ranges: [{
            value: 14
          }, {
            value: 89
          }]
        }
      }
    };
  }

    configTitle() {
      return {
        title: {
          text: 'Suicidios con Respecto a Edades'
        }
           }
    }
    configPlotOptions(chart: string): any {
      switch(chart) {
        case "bar":
        case "column":
          return {
            plotOptions: {
              column: {
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '{point.name}'
                },
                depth: 150,
                colorByPoint: true,
                allowPointSelect: false
              }
            }
          };
        case "pie":
        case "area":
          return {
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                slicedOffset: 20,
                dataLabels: {
                  enabled: true,
                  format: `<b>{point.name}</b>: {point.percentage:.1f} % de un total de registros`, // Formato para mostrar el nombre y el porcentaje
                  distance: 30 // Distancia de las etiquetas desde el centro del pastel
                }
              }
            }
          };
       
      }
    }
    
    configXaxis(){
      return{
        xAxis: {
          type: "category",
          labels: {
            autoRotation: [-45, -90],
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
            }
          }
        }
      }
    }
    configYaxis(){
      return{
        yAxis: {
          title: {
            text: "total",
            align: "middle"
          }
        }
      }
    }

    configData(chart: string, causas: any[], conteos: any[]): any {
      switch(chart) {
        case "bar":
        case "column":
          return {
            series: causas.map((name, index) => ({
              name: name,
              type: chart,
              data: [{ y: conteos[index], color: this.getRandomColor() }],
              dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}',
                y: 0,
                style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
                }
              }
            }))
          };
        case "pie":
        case "area":
          return {
            series: [{
              type: chart,
              name: 'Porcentaje obtenido',
              data: causas.map((value, index) => ({
                name: value,
                y: conteos[index],
                sliced: index === 2,
                selected: index === 2
              }))
            }]
          };
       
          case "line":
            return{
              
              series: [{
                data: conteos.map((value, index) => ({
                    y: value, // El valor del punto en la serie
                    x: index + 1 // El índice del punto más 1 (para empezar desde 1)
                }))
            }]
            
            }
      }
    }
    

















  createCausesChart(){
    let totalConteosViolencias = this.conteosViolencia.reduce((total, element) => total + element, 0);

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
        text: 'Suicidios con Respecto a Motivos',
        align: 'center'
      },
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
          slicedOffset: 20,
          dataLabels: {
            enabled: true,
            format: `<b>{point.name}</b>: {point.percentage:.1f} % de un total de ${totalConteosViolencias} registros`, // Formato para mostrar el nombre y el porcentaje
            distance: 30 // Distancia de las etiquetas desde el centro del pastel
          }
        }
      },
      subtitle: {
        text: `Total de suicidios con Respecto a Motivos ${totalConteosViolencias}`
    },
      exporting: {
        enabled: true,
        buttons: {
          contextButton: {
            menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Porcentaje obtenido',
        data: this.violenceUnicas.map((value, index) => ({
          name: value,
          y: this.conteosViolencia[index],
          sliced: index === 2,
          selected: index === 2
        }))
      }]
    });

  }
  onChartTypeChangeAge(event: any) {
    this.createChart(event.value,this.causasUnicas,this.conteosCausas)
  }
}
