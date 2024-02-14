import { Component, ViewChild } from '@angular/core';

import { ChartModule } from 'primeng/chart';
import { ServiceService } from 'src/app/service.service';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-charts',
  standalone: true,
imports: [ChartModule,CommonModule,MatFormFieldModule,MatSelectModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {

  data: any;
  violence: any;
  options :any
  selectedChartType:any ="bar"  // Valor predeterminado

  constructor(private service:ServiceService<any>) {
   
    this.getSuicides()
  }
  onSelectionChange(event: any) {
    this.selectedChartType= event.value 
    }
    renderChart() {
     
    }
  getSuicides(){
    this.service.Data("prevention/show").subscribe({
        next:(n)=>{
          this.options =  n['data']['result'];
          const causasContador: { [key: string]: number } = {};

          // Objeto para contar los tipos de violencia
          const violenceContador: { [key: string]: number } = {};
          
          // Iterar sobre las opciones para contar las causas y los tipos de violencia
          this.options.forEach((item) => {
            const causa = item.causa;
            const violencia = item.violencia;
          
            // Contar las causas
            if (!causasContador[causa]) {
              causasContador[causa] = 1;
            } else {
              causasContador[causa]++;
            }
          
            // Contar los tipos de violencia
            if (!violenceContador[violencia]) {
              violenceContador[violencia] = 1;
            } else {
              violenceContador[violencia]++;
            }
          });
          
          // Obtener las causas únicas como un array
          const causasUnicas = Object.keys(causasContador);
          const conteosCausas = causasUnicas.map((causa) => causasContador[causa]);
          
          // Obtener los tipos de violencia únicos como un array
          const violenceUnicas = Object.keys(violenceContador);
          const conteosViolencia = violenceUnicas.map((violencia) => violenceContador[violencia]);
          
          

              // Obtener las causas únicas como un array
             
          this.data = {
            labels: causasUnicas,
            datasets: [
              {
                label: 'causas de muertes',
                backgroundColor: '#42A5F5',
                data: conteosCausas
              }
            ]
          };
          this.violence = {
            labels: violenceUnicas,
            datasets: [
              {
                label: 'Tipos de violencia',
                backgroundColor: '#42A5F5',
                data: conteosViolencia
              }
            ]
          };
        },error:(e)=>{

        }
      })
}
}
