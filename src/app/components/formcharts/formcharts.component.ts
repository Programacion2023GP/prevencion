import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ServiceService } from 'src/app/service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import Swal from 'sweetalert2'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import * as Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import { fadeInOutAnimation } from 'src/app/components/animations/animate';
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formcharts',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatCardModule,MatButtonModule,MatCheckboxModule,MatSelectModule,MatButtonToggleModule,MatMenuModule,
    FormsModule,
    ReactiveFormsModule,MatIconModule,CommonModule,SkeletonModule],
    animations:[fadeInOutAnimation],
  templateUrl: './formcharts.component.html',
  styleUrl: './formcharts.component.scss'
})
export class FormchartsComponent {

    @ViewChild('chartContainer', { static: true }) chartContainer: ElementRef;

    options = [
        { text: 'Edad', value: 'age' },
        { text: 'Colonia de la fuente', value: 'colony' },
        { text: 'Colonia del suicidio', value: 'colonydeed' },
        { text: 'Fecha de Ocurrencia del Suicidio', value: 'datecurrence' },
        { text: 'Sitio donde se Cometió el Acto', value: 'sitio' },
        { text: 'El Acto Fue', value: 'acto_fue' },
        { text: 'Clave de la Fuente (Dependencia)', value: 'dependencia' },
        { text: 'Causa del Acto', value: 'causa' },
        { text: 'Dependencia a la que Canaliza', value: 'dependencia_canalizada' },
        { text: 'Género', value: 'genero' },
        { text: 'Cómo se Identifica', value: 'como_indentifica' },
        { text: 'Religión o Culto', value: 'religión' },
        { text: 'Estado civil', value: 'estado_civil' },
        { text: 'Escolaridad o alfabetismo', value: 'alfabetismo_escolaridad' },
        { text: 'Posesión de hijos', value: 'posesion_hijos' },
        { text: 'Existencia de suicidas en la familia', value: 'suicidas_familia' },
        { text: 'Adicciones', value: 'adiciones' },
        { text: 'Enfermedades', value: 'enfermedades' },
        { text: 'Tipo de violencia', value: 'violencia' },
        { text: 'Tipo de familia', value: 'familia' },
        { text: 'Centro educatio', value: 'centro_educativo' },
        { text: 'Medio Empleado para el Acto', value: 'medio_empleado' },
        { text: 'Ocupación', value: 'ocupacion' },
        { text: 'Status', value: 'status' },

      ];
    chart :any
    MyForm = new FormGroup({
      name:new FormControl('',Validators.required),
      chart_selected:new FormControl('',Validators.required),
      option_selected:new FormControl('',Validators.required),
      // years:new FormControl(false),
      // months:new FormControl(false),
      // days:new FormControl(false),
      // zoom:new FormControl(false),
      // png:new FormControl(false),
      description:new FormControl(''),

    })
    isLoading = false
optionselected : any
nameselected : any
namechart : any
activedYears : Boolean =false
activedMonths : Boolean =false
activedDays : Boolean =false
activedPng : Boolean =false
activedZoom : Boolean =false

data: any;
  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  yearList: number[];
  descriptionText: string;
  monthsList: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']; // Lista de meses
  daysOfWeekList: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']; // Lista de días de la semana

  constructor(private service:ServiceService<any>) {
    this.getSuicidesData()
    this.yearList = this.generateYearList();
     // Assign the data to the data source for the table to render
   }
   description(event){
    this.descriptionText = event.target.value
   }

   generateYearList(): number[] {
    const currentYear = new Date().getFullYear();
    const lastThreeYears = [];

    for (let i = 0; i < 3; i++) {
      lastThreeYears.push(currentYear - i);
    }

    return lastThreeYears;
  }


onSubmit() {
  this.isLoading = true
    this.service.Post("chart/create",this.MyForm.value).subscribe({
        next:(n)=>{
        this.MyForm.reset()
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha creado correctamente`,
          });
          this.chart.destroy()
          this.descriptionText = ""
        },
        error:(e)=>{
         this.MyForm.reset()

          this.isLoading = false

          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: ` No se ha podido crear correctamente`,
          });
          this.chart.destroy()
          this.descriptionText = ""

        }
      })

}


//create charts
selected :any
 finalChartConfig: any[] = [];
//  ngOnInit(): void {
//     Highcharts3D(Highcharts); // Activa el módulo Highcharts 3D
//    }

 initChart(event: any) {

    const index = this.finalChartConfig.findIndex(config => config.hasOwnProperty('chart'));
    if (index !== -1) {
        this.finalChartConfig[index] = this.configChart(event.value);
    } else {
        this.finalChartConfig.splice(0, 0, this.configChart(event.value));
    }
    this.namechart = event.value;
    this.finalChartConfig = this.finalChartConfig.filter(config => !config || !config.hasOwnProperty('legend'));

    const legend = this.configLegend();
    if (legend) {
        this.finalChartConfig.splice(1, 0, legend);
    }

    this.selected = event.value;
    if (this.optionselected!==null) {
        this.initTitleChart(this.nameselected)
        this.getSelected(this.optionselected);
        // this.createGraphChart();
    }
}


initTitleChart(event: any) {
    this.nameselected = event && event.target && event.target.value ? event.target.value : event;
    if (this.namechart == null) {
        return;
    }
    this.finalChartConfig = this.finalChartConfig.filter(config => !config || !config.hasOwnProperty('title'));
    this.finalChartConfig.splice(2, 0, this.configTitle(this.namechart,this.nameselected));

    this.createGraphChart();

}


createGraphChart() {
    Highcharts3D(Highcharts); // Activa el módulo Highcharts 3D
    // Obtener el contenedor de la gráfica
    const container = this.chartContainer.nativeElement;

    // Si ya existe una gráfica en el contenedor, destrúyela
    if (container.firstChild) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    }

    // Crear la nueva instancia de la gráfica
  this.chart =  Highcharts.chart(container, Object.assign({}, ...this.finalChartConfig));
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
                depth: 100,
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
        enabled: false,

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

  configTitle(chart: string, title: any,total:number=0): any {
    switch (chart) {
            case "bar":
            case "column":
            case "line":
                return {
                    title: {
                        text: title
                    },
                    subtitle: {
                        text: `total de registros: ${total}`
                    }
                };
            case "pie":
            case "area":
                return {
                    title: {
                        text: title
                    },
                    subtitle: {
                        text: `total de registros: ${total}`
                    },
                    accessibility: {
                        point: {
                            valueSuffix: '%'
                        }
                    },
                    tooltip: {
                        pointFormat: `{series.name}: <b>{point.y} de ${total} registros</b>`
                    }
                };
        }

    }
    configPlotOptions(chart: string,total:number): any {

      switch(chart) {
        case "bar":
        case "column":
          return {
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    // Ajusta este valor para cambiar el espaciado entre columnas
                    cursor: 'pointer',
                    dataLabels: {
                      enabled: true,
                      format: '{point.y:.0f}',// Mostrar solo números enteros
                      distance: 150, // Ajusta este valor según sea necesario
                      style: {
                        color: 'black',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }
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
              series: {
                point: {
                  events: {
                    click: function(event) {

                    }
                  }
                }
              },
              pie: {
                allowPointSelect: true,
                // cursor: 'pointer',
                
                depth: 35,
                slicedOffset: 20,
                dataLabels: {
                  enabled: true,
                  
                  format: `<b>{point.name}</b>  {point.y} de ${total} registros`, // Formato para mostrar el nombre y el porcentaje
                  distance: 30 
                }
              }
            }
          };

      }

      
      
    }

    configXaxis(chart,titles){
        switch(chart) {
            case "line":
            case "area":
            return{
                xAxis: {
                    type: "category",
                    categories: ["",...titles],
                    title: {
                        text: "total",
                        align: "middle"
                    },
                    labels: {
                        autoRotation: [-45, -90],
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }
            }
            default:
            return{
                xAxis: {
                    type: "category",
                    categories: [""],
                    title: {
                        text: "total",
                        align: "middle"
                    },
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
              name: 'Registros obtenidos',
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
    getRandomColor() {
        // Generar un color hexadecimal aleatorio
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
    getSuicidesData(){
        this.service.Data("prevention/show").subscribe({
            next: (n) => {
                this.data = n['data']['result']
            },
            error: (n) => {}
        });

    }
    getSelected(selected) {

                const causasContador: { [key: string]: number } = {};
                this.optionselected = selected && selected.value && selected.value ? selected.value : selected;
                this.data.forEach((item) => {
                    const causa = item[`${this.optionselected}`];

                    if (!causasContador[causa]) {
                        causasContador[causa] = 1;
                    } else {
                        causasContador[causa]++;
                    }


                });

                const causasUnicas = Object.keys(causasContador);
                const conteosCausas = causasUnicas.map((causa) => causasContador[causa]);
                const suma = conteosCausas.reduce((total, numero) => total + numero, 0);
                this.finalChartConfig = this.finalChartConfig.filter(config => !config || !config.hasOwnProperty('title'));
                const title = this.configTitle(this.namechart,this.nameselected,suma);
                if (title) {
                    this.finalChartConfig.push(title);
                }
                this.finalChartConfig.splice(2, 0, this.configTitle(this.namechart,this.nameselected,suma));
                this.finalChartConfig = this.finalChartConfig.filter(config => !config || !config.hasOwnProperty('plotOptions'));
                const plotOptions = this.configPlotOptions(this.selected,suma);
                if (plotOptions) {
                    this.finalChartConfig.push(plotOptions);
                }
                this.finalChartConfig = this.finalChartConfig.filter(config => !config || !config.hasOwnProperty('xAxis'));
                 const xAxis = this.configXaxis(this.namechart,causasUnicas);
                if (xAxis) {
                    this.finalChartConfig.push(xAxis);
                }

                this.finalChartConfig = this.finalChartConfig.filter(config => !config || !config.hasOwnProperty('yAxis'));

                const yAxis = this.configYaxis();
                if (yAxis) {
                    this.finalChartConfig.push(yAxis);
                }
                this.finalChartConfig = this.finalChartConfig.filter(config => !config || !config.hasOwnProperty('series'));
                const series = this.configData(this.selected,causasUnicas,conteosCausas);
                if (series) {
                    this.finalChartConfig.push(series);
                }
                this.createGraphChart();
                //  this.createChart("age","column",this.causasUnicas,this.conteosCausas)
                //  this.createChart("media","pie",this.causasUnicas,this.conteosCausas)




    }
    active(property: string) {
        if (property === 'years') {
            this.activedYears = !this.activedYears;
        } else if (property === 'months') {
            this.activedMonths = !this.activedMonths;
        } else if (property === 'days') {
            this.activedDays = !this.activedDays;
        }
        else if (property === 'zoom') {
            this.activedZoom = !this.activedZoom;
        }
        else if (property === 'png') {
            this.activedPng = !this.activedPng;
        }

    }
  }
