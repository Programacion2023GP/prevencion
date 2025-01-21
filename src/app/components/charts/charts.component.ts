import { filter } from "rxjs";
import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { ListboxModule } from "primeng/listbox";

import { ChartModule } from "primeng/chart";
import { ServiceService } from "src/app/service.service";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { fadeInOutAnimation } from "../animations/animate";
import * as Highcharts from "highcharts";
import Highcharts3D from "highcharts/highcharts-3d"; // Importa el módulo Highcharts 3D
import { Dialog, DialogModule } from "primeng/dialog";
import { MatButtonModule } from "@angular/material/button";
import { CalendarModule } from "primeng/calendar";
import { MatIconModule } from "@angular/material/icon";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
   selector: "app-charts",
   standalone: true,
   imports: [
      MatIconModule,
      ChartModule,
      CommonModule,
      MatFormFieldModule,
      MatSelectModule,
      MatProgressSpinnerModule,
      MatButtonModule,
      MatCardModule,
      DialogModule,
      CalendarModule
   ],
   animations: [fadeInOutAnimation],

   templateUrl: "./charts.component.html",
   styleUrl: "./charts.component.scss"
})
export class ChartsComponent implements AfterViewInit {
   rangeDates: Date[];
   interaction = [];
   open: boolean = false;
   loading: true;
   visible: Boolean = false;
   data: any;
   violence: any;
   options: any;
   selectedChartType: any = "bar"; // Valor predeterminado
   isLoading: boolean = true;
   conteosViolencia: any = [];
   violenceUnicas: any = [];
   causasUnicas: any = [];
   conteosCausas: any = [];
   getCharts: any = [];
   itemSelected: any[];

   keys = [
      { text: "Edad", value: "age" },
      { text: "Colonia de la fuente", value: "colony" },
      { text: "Colonia del suicidio", value: "colonydeed" },
      { text: "Fecha de Ocurrencia del Suicidio", value: "datecurrence" },
      { text: "Sitio donde se Cometió el Acto", value: "sitio" },
      { text: "El Acto Fue", value: "acto_fue" },
      { text: "Clave de la Fuente (Dependencia)", value: "dependencia" },
      { text: "Causa del Acto", value: "causa" },
      { text: "Dependencia a la que Canaliza", value: "dependencia_canalizada" },
      { text: "Género", value: "genero" },
      { text: "Cómo se Identifica", value: "como_indentifica" },
      { text: "Religión o Culto", value: "religión" },
      { text: "Estado civil", value: "estado_civil" },
      { text: "Escolaridad o alfabetismo", value: "alfabetismo_escolaridad" },
      { text: "Posesión de hijos", value: "posesion_hijos" },
      { text: "Existencia de suicidas en la familia", value: "suicidas_familia" },
      { text: "Adicciones", value: "adiciones" },
      { text: "Enfermedades", value: "enfermedades" },
      { text: "Tipo de violencia", value: "violencia" },
      { text: "Tipo de familia", value: "familia" },
      { text: "Centro educatio", value: "centro_educativo" },
      { text: "Medio Empleado para el Acto", value: "medio_empleado" },
      { text: "Ocupación", value: "ocupacion" }
   ];
   selectedOptions: string[] = [];
   printMode = false;

   @ViewChild("dialogo") dialogo: Dialog;
   indices: any = [];
   form: FormGroup;
   allKeys = [...this.keys];
   charts = {};
   constructor(private fb: FormBuilder, private service: ServiceService<any>) {
      this.form = this.fb.group({
         selects: this.fb.array([this.createSelect()])
      });
      // this.getSuicides();

      this.getData();
      Highcharts3D(Highcharts); // Activa el módulo Highcharts 3D
   }

   getRandomColor() {
      // Generar un color hexadecimal aleatorio
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
   }
   ngAfterViewInit(): void {
      this.getSuicides();
   }
   ngOnInit() {
      this.selects.valueChanges.subscribe(() => {
         this.updateOptions();
      });
   }
   get selects() {
      return this.form.get("selects") as FormArray;
   }

   createSelect(): FormGroup {
      return this.fb.group({
         option_selected: new FormControl("")
      });
   }

   addSelect() {
      this.selects.push(this.createSelect());
   }

   getSelectedForm(event: any, index: number) {
      const selectedValue = event.value;
      this.selects.at(index).get("option_selected")?.setValue(selectedValue);

      // Agregar un nuevo select si no es el último y si se ha seleccionado una opción
      if (index === this.selects.length - 1 && selectedValue) {
         this.addSelect();
      }

      this.updateOptions();
   }

   updateOptions() {
      const selectedValues = this.selects.controls.map((control) => control.get("option_selected")?.value);
      this.keys = this.allKeys.filter((key) => !selectedValues.includes(key.value));
   }

   createCharts() {
      this.getCharts.forEach((item, index) => {
         this.interaction.push({
            id: "chart" + index,
            chart: item.chart_selected,
            title: item.name,
            option: item.option_selected,
            open: false
         });
         setTimeout(() => {
            this.getSelected("chart" + index, item.chart_selected, item.name, item.option_selected);
         }, 1000);
      });
      console.log("this.getCharts",this.getCharts)
   }
   restaurar(item, id, index) {
      this.getSelected(id, item.chart_selected, item.name, item.option_selected);
      this.getCharts[index].historial.splice(1);
      this.getCharts[index].open = false;
      this.getCharts[index].history = false;
      this.getCharts[index].data = this.options;
   }
   getData() {
      this.isLoading = false;
      this.service.Data("chart/index").subscribe({
         next: (n) => {
            this.getCharts = n["data"]["result"];
            this.getCharts.forEach((element, index) => {
               element.open = false;
               element.history = false;
               element.historial = [element];
               element.point = undefined;
               element.id = "chart" + index;
               element.dataNext = [];
            });
         },
         error: (e) => {
            this.isLoading = false;
         }
      });
   }
   getSelected(id, chart_selected, name, option_selected, point = null, option = null) {
      const causasContador: { [key: string]: number } = {};
      this.options.forEach((item) => {
         const causa = item[`${option_selected}`];

         if (!point) {
            if (!causasContador[causa]) {
               causasContador[causa] = 1;
            } else {
               causasContador[causa]++;
            }
         }
         // else {

         //   if (!point || item[option] == point) {
         //     if (!causasContador[causa]) {
         //         causasContador[causa] = 1;
         //     } else {
         //         causasContador[causa]++;
         //     }
         // }
         // }
      });
      const causasUnicas = Object.keys(causasContador);
      const conteosCausas = causasUnicas.map((causa) => causasContador[causa]);
      const suma = conteosCausas.reduce((total, numero) => total + numero, 0);
      this.createChart(id, chart_selected, name, causasUnicas, conteosCausas, option_selected);
   }

   subCharts(id: string, chart_selected: string, name: string, data: any[], identified: number) {
      this.keys.forEach((element, index) => {
         const causasContador: { [key: string]: number } = {};
         
         data.forEach((item) => {
            const causa = item[`${element.value}`];
            if (!causasContador[causa]) {
               causasContador[causa] = 1;
            } else {
               causasContador[causa]++;
            }
         });
         
         const causasUnicas = Object.keys(causasContador);
         const conteosCausas = causasUnicas.map((causa) => causasContador[causa]);
         const suma = conteosCausas.reduce((total, numero) => total + numero, 0);
         
         console.log(name.split(" ")[0] + index,id)
         this.createChart(
            id + index,
            chart_selected,
            `${name} ${element.text}`,
            causasUnicas.length == 0 ? [] : causasUnicas,
            conteosCausas.length == 0 ? [] : conteosCausas
         );
      });
   }
   historial(id, index, name,chart_selected, selected): any {
      
      this.getCharts[id].historial.push({});
      const title = this.keys.filter((item) => item.value == selected)[0].text;
      // this.getCharts[id].open =false
      const causasContador: { [key: string]: number } = {};
      this.getCharts[id].open = false;

      this.getCharts[id].dataNext.forEach((item) => {
         const causa = item[`${selected}`];
         if (!causasContador[causa]) {
            causasContador[causa] = 1;
         } else {
            causasContador[causa]++;
         }
      });

      const causasUnicas = Object.keys(causasContador);
      const conteosCausas = causasUnicas.map((causa) => causasContador[causa]);
      const suma = conteosCausas.reduce((total, numero) => total + numero, 0);
      this.createChart(this.getCharts[id].id, chart_selected, `${name} ${title}`, causasUnicas, conteosCausas, selected);
      this.getCharts[id].data = this.getCharts[id].dataNext;

      // setTimeout(() => {
      //    this.createChart("historial" + name + (this.getCharts[id].historial.length - 1), "column", `${name} ${title}`, causasUnicas, conteosCausas);
      // }, 1000);
   }
   expand() {
      this.open = !this.open;
   }

   getSuicides() {
      this.service.Data("prevention/show").subscribe({
         next: (n) => {
            this.options = n["data"]["result"];
            this.createCharts();
            this.getCharts.forEach((element, index) => {
               element.data = this.options;
            });
         },
         error: (e) => {}
      });
   }
   cards = [];
   createChart(id: string, chart: any, title: string, causas: any[] = [], conteos: any[] = [], causa: string = "") {
      // Filtrar causas y conteos para eliminar undefined y null
      causas = causas.filter((causa) => causa !== undefined && causa !== null);
      conteos = conteos.filter((conteo) => conteo !== undefined && conteo !== null);

      const finalChartConfig: any[] = [];
      finalChartConfig.push({});
      finalChartConfig.push(this.configChart(chart));
      finalChartConfig.push(this.configLegend());
      finalChartConfig.push(this.configTitle(chart, title, conteos));
      finalChartConfig.push(this.configPlotOptions(chart, id, conteos, causa, title, causas));
      finalChartConfig.push(this.configXaxis(chart, causas));
      finalChartConfig.push(this.configYaxis());
      finalChartConfig.push(this.configData(chart, causas, conteos));

      chart = Highcharts.chart(id, Object.assign({}, ...finalChartConfig));
   }

   openDialog(item) {
      this.itemSelected = [];
      this.itemSelected.push(item);
      this.indices = [];
      this.visible = true;
      // Objeto para almacenar los conteos por dependencia y valor de item.option_selected
      // Objeto para almacenar los conteos por dependencia con títulos y valores
      const countByDependencyWithTitles: { [dependency: string]: { titles: string[]; values: number[] } } = {};

      // Iterar sobre los elementos de options
      let cont = 0;
      this.options.forEach((option) => {
         const dependency = option.dependencia;
         const selectedOption = option[item.option_selected];

         // Si la dependencia no existe en countByDependencyWithTitles, inicialízala
         if (!countByDependencyWithTitles[dependency]) {
            this.indices.push({ item: cont, active: true, dependencia: dependency });
            cont++;
            console.warn(cont);
            countByDependencyWithTitles[dependency] = { titles: [], values: [] };
         }

         // Si el título ya está presente en la dependencia, incrementa su valor correspondiente
         const titleIndex = countByDependencyWithTitles[dependency].titles.indexOf(selectedOption);
         if (titleIndex !== -1) {
            countByDependencyWithTitles[dependency].values[titleIndex]++;
         } else {
            // Si el título no está presente, agrégalo con un valor inicial de 1
            countByDependencyWithTitles[dependency].titles.push(selectedOption);
            countByDependencyWithTitles[dependency].values.push(1);
         }
      });

      const dependencies = Object.keys(countByDependencyWithTitles);

      this.visible = true;
      this.dialogo.onShow.subscribe(() => {
         this.getSelected("chartselected", item.chart_selected, item.name, item.option_selected);
         for (let i = 0; i < dependencies.length; i++) {
            const dependency = dependencies[i];
            console.log(`Dependency Index: ${i}`);
            console.log(`Dependency Name: ${dependency}`);

            // Obtener los títulos y valores correspondientes a la dependencia actual
            const titles = countByDependencyWithTitles[dependency].titles;
            const values = countByDependencyWithTitles[dependency].values;
            // Iterar sobre los títulos y valores e imprimirlos
            console.error("chartsubselected" + i, item.chart_selected, dependency, titles, values);
            this.createChart("chartsubselected" + i, item.chart_selected, dependency, titles, values);
         }
      });
   }
   startDate: any;
   endDate: any;
   formatDate(date: Date): string {
      // Obtener los componentes de la fecha
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Añadir cero delante si es necesario
      const day = date.getDate().toString().padStart(2, "0"); // Añadir cero delante si es necesario
      // Devolver la fecha formateada
      return `${year}-${month}-${day}`;
   }
   onDateSelect(event) {
      // Extraer el día y convertirlo a un número entero

      let selectedDate = new Date(event);
      const formattedDate = this.formatDate(selectedDate);
      console.log(formattedDate);
      if (!this.startDate) {
         // Si no hay una fecha de inicio, asignar la fecha seleccionada como fecha de inicio
         this.startDate = formattedDate;
      } else if (!this.endDate) {
         // Si hay una fecha de inicio pero no hay una fecha de fin, asignar la fecha seleccionada como fecha de fin
         this.endDate = formattedDate;
         // Verificar si la fecha de fin es menor que la fecha de inicio
         if (this.endDate < this.startDate) {
            // Si la fecha de fin es menor, intercambiar las fechas para asegurarse de que la fecha de inicio siempre sea menor
            const tempDate = this.startDate;
            this.startDate = this.endDate;
            this.endDate = tempDate;
         }
      } else {
         // Si ya hay una fecha de inicio y una fecha de fin, reiniciar el rango de fechas
         this.startDate = formattedDate;
         this.endDate = null;
      }

      // Si ahora tenemos ambas fechas, puedes hacer algo con ellas
      if (this.startDate && this.endDate) {
         this.searchDates(this.itemSelected[0], this.startDate, this.endDate);
      }
   }

   searchDates(item, start, end) {
      this.indices.forEach((element) => {
         element.active = true;
      });

      const countByDependencyWithTitles: { [dependency: string]: { titles: string[]; values: number[] } } = {};
      const startDate = new Date(start);
      const endDate = new Date(end);
      startDate.setHours(0, 0, 0, 0);
      startDate.setDate(startDate.getDate() + 1);
      endDate.setHours(0, 0, 0, 0);
      endDate.setDate(endDate.getDate() + 1);
      let foundDependencies = [];
      let arrayNoFound = [];
      this.options.forEach((option) => {
         const date = new Date(option.date_created);
         date.setHours(0, 0, 0, 0);
         date.setDate(date.getDate() + 1);

         if (startDate <= date && endDate >= date) {
            const dependency = option.dependencia;
            if (!foundDependencies.includes(option.dependencia)) {
               foundDependencies.push(dependency); // Agrega la dependencia al conjunto de dependencias encontradas
            }

            if (!countByDependencyWithTitles[dependency]) {
               countByDependencyWithTitles[dependency] = { titles: [], values: [] };
            }

            const selectedOption = option[item.option_selected];
            const titleIndex = countByDependencyWithTitles[dependency].titles.indexOf(selectedOption);
            if (titleIndex !== -1) {
               countByDependencyWithTitles[dependency].values[titleIndex]++;
            } else {
               countByDependencyWithTitles[dependency].titles.push(selectedOption);
               countByDependencyWithTitles[dependency].values.push(1);
            }
         }
      });

      // Busca dependencias que no se encontraron en ningún registro dentro del rango de fechas
      this.indices.forEach((element) => {
         if (!foundDependencies.includes(element.dependencia)) {
            element.active = false; // Establece la propiedad 'active' en 'false' para el elemento actual
         }
      });

      console.warn("NO ENCONTRADOS", foundDependencies);

      console.warn("NO ENCONTRADOS", arrayNoFound);

      const dependencies = Object.keys(countByDependencyWithTitles);
      for (let i = 0; i < dependencies.length; i++) {
         const dependency = dependencies[i];
         const total = countByDependencyWithTitles[dependency];

         // Si no hay resultados para esta dependencia, establece active como false
         if (!total) {
            this.indices[i].active = false;
         }
      }

      for (let i = 0; i < dependencies.length; i++) {
         const dependency = dependencies[i];
         const titles = countByDependencyWithTitles[dependency].titles;
         const values = countByDependencyWithTitles[dependency].values;

         this.createChart("chartsubselected" + i, item.chart_selected, dependency, titles, values);
      }
   }

   configChart(chart: string) {
      switch (chart) {
         case "column":
         case "bar":
            return {
               chart: {
                  type: `${chart}`,
                  events: {
                     click: function (event) {}
                  },
                  animation: true,
                  options3d: {
                     enabled: true,
                     alpha: 15,
                     beta: 2,
                     depth: 100
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

            // Configuración de la leyenda...
            events: {
               // Función que se ejecutará cuando se haga clic en un elemento de la leyenda
               click: function (event) {
                  console.log("Elemento de la leyenda presionado:", event);
                  // Agrega aquí la lógica que deseas ejecutar al presionar en un elemento de la leyenda
               }
            },
            bubbleLegend: {
               enabled: true,
               minSize: 20,
               maxSize: 60,
               ranges: [
                  {
                     value: 14
                  },
                  {
                     value: 89
                  }
               ]
            }
         }
      };
   }

   configTitle(chart: string, title: any, conteos: number[]): any {
      const total = conteos.reduce((total, numero) => total + numero, 0);

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
                     valueSuffix: "%"
                  }
               },
               tooltip: {
                  pointFormat: `{series.name}: <b>{point.y} de ${total} registros</b>`
               }
            };
      }
   }

   configPlotOptions(chart: string, id: string, conteos: number[], causa: string, title: string, causasUnicas: any): any {
      const total = conteos.reduce((total, numero) => total + numero, 0);

      const findID = this.interaction.findIndex((item) => item.id === id);
      var regex = /(\d+)/g;
      const transformData = (select, point) => {
         const match = id.match(regex);
         const identified = match ? parseInt(match[0]) : NaN;

         this.getCharts[identified].open = true;

         // this.keys.forEach((it)=>{
         //   it.value
         // })
         //  this.getCharts[identified].data.filter((key) => key[causa] == point)

         this.getCharts[identified].dataNext = this.getCharts[identified].data.filter((key) => key[causa] == point);
         console.log("acas", this.getCharts[identified].dataNext);
         this.subCharts(this.getCharts[identified].option_selected, "pie", title, this.getCharts[identified].dataNext, identified);

         this.getCharts[identified].historial.forEach((item, index) => {
            setTimeout(() => {
               this.getSelected("historial" + item.name + index, item.chart_selected, item.name, item.option_selected);
               this.getCharts[identified].history = true;
            }, 1000);
         });
         this.getCharts[identified].point = point;

         //  element.historial = [{ id: "chart" + index, chart: element.chart_selected, title: element.name, option: element.option_selected }];

         //
      };
      switch (chart) {
         case "bar":
         case "column":
            return {
               plotOptions: {
                  series: {
                     point: {
                        events: {
                           click: function (event) {
                              transformData(findID, event.point.series.name);
                           }
                        }
                     }
                  },
                  column: {
                     pointPadding: 0.2,
                     // Ajusta este valor para cambiar el espaciado entre columnas
                     cursor: "pointer",
                     dataLabels: {
                        enabled: true,
                        format: "{point.y:.0f}", // Mostrar solo números enteros
                        distance: 150, // Ajusta este valor según sea necesario
                        style: {
                           color: "black",
                           fontSize: "12px",
                           fontWeight: "bold"
                        },
                        series: {
                           point: {
                              events: {
                                 click: function (event) {
                                    // transformData(findID,event.point.x)
                                 }
                              }
                           }
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
                           click: function (event) {
                              transformData(findID, event.point.name);
                              // Verifica qué datos contiene this.getCharts[1].data
                              // Filtra los datos
                              // Si no encuentras nada, revisa las condiciones del filtro y los datos originales
                           }
                        }
                     }
                  },
                  pie: {
                     cursor: "pointer",

                     allowPointSelect: true,
                     depth: 35,
                     slicedOffset: 20,
                     dataLabels: {
                        enabled: true,
                        format: `<b>{point.name}</b>: {point.y} de ${total} registros`, // Incluye {point.y} en el formato
                        distance: 30, // Ajusta la distancia para que las etiquetas estén encima las porciones
                        // Cambia la alineación para que las etiquetas estén encima de las porciones
                        alignTo: "plotEdges",
                        // Utiliza el conector para unir las etiquetas con las porciones
                        connectorPadding: 5
                     }
                  }
               }
            };
      }
   }

   configXaxis(chart, titles) {
      switch (chart) {
         case "line":
         case "area":
            return {
               xAxis: {
                  type: "category",
                  categories: ["", ...titles],
                  title: {
                     text: "total",
                     align: "middle"
                  },
                  labels: {
                     autoRotation: [-45, -90],
                     style: {
                        fontSize: "13px",
                        fontFamily: "Verdana, sans-serif"
                     }
                  }
               }
            };
         default:
            return {
               xAxis: {
                  categories: ["", ...titles], // Usamos el spread operator para agregar los títulos adicionales
                  title: {
                     text: "", // Puedes establecer un título aquí si es necesario
                     align: "middle" // Esto centrará el título del eje x
                  },
                  labels: {
                     autoRotation: [-45, -90],
                     style: {
                        fontSize: "13px",
                        fontFamily: "Verdana, sans-serif"
                     }
                  }
               }
            };
      }
   }
   configYaxis() {
      return {
         yAxis: {
            title: {
               text: "total",
               align: "middle"
            }
         }
      };
   }

   configData(chart: string, causas: any[], conteos: any[]): any {
      switch (chart) {
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
                     color: "#FFFFFF",
                     align: "right",
                     format: "{point.y:.1f}",
                     y: 0,
                     style: {
                        fontSize: "13px",
                        fontFamily: "Verdana, sans-serif"
                     }
                  }
               }))
            };
         case "pie":
         case "area":
            return {
               series: [
                  {
                     type: chart,
                     name: "Registros obtenidos ",
                     data: causas.map((value, index) => ({
                        name: value,
                        y: conteos[index],
                        sliced: index === 2,
                        selected: index === 2
                     }))
                  }
               ]
            };

         case "line":
            return {
               series: [
                  {
                     data: conteos.map((value, index) => ({
                        y: value, // El valor del punto en la serie
                        x: index + 1 // El índice del punto más 1 (para empezar desde 1)
                     }))
                  }
               ]
            };
      }
   }
}
