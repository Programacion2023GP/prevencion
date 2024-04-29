import {AfterViewInit, Component, ViewChild} from '@angular/core';
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
import { fadeInOutAnimation } from 'src/app/components/animations/animate';
import { DialogModule } from 'primeng/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-tablesuicideprevention',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatCardModule,MatButtonModule,
    ReactiveFormsModule,MatIconModule,CommonModule,SkeletonModule,DialogModule,DatePipe],
    animations:[fadeInOutAnimation],
  templateUrl: './tablesuicideprevention.component.html',
  styleUrl: './tablesuicideprevention.component.scss'
})
export class TablesuicidepreventionComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
visible:Boolean
  dataSelected =[]
  data: any;
  displayedColumns: string[] = ['invoice','personinformate','name','dependencia','causa','datecurrence','status', 'Actions'];
  dataSource: MatTableDataSource<any>;
  isLoading: boolean=true;
loading: true;
  constructor(private service:ServiceService<any>,private route:Router){
    this.getSuicides()
  }
  // ngOnInit() {
  //   this.dataSource = new MatTableDataSource([]);
  //   this.getSuicides();
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  edit(row){
    const rowString = JSON.stringify(row);
    // Navegar a la ruta 'prevencion' con el parámetro 'row'
    this.route.navigate(['prevencion'], { queryParams: { row: rowString } });
  }
  getSuicides() {
    this.isLoading = false;
    this.service.Data("prevention/index").subscribe({
      next: (n) => {
        this.data = n["data"]["result"];
        console.warn("aqui",this.data)
        this.dataSource = new MatTableDataSource(this.data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => {
        console.error("Error al obtener datos:", e);
        this.isLoading = false;
      }
    });
  }




  // generateManual(){
  //   const doc = new jsPDF();

  //   // Título del formulario
  //   doc.setFontSize(16);
  //   doc.text("Datos de la fuente informativa", 20, 15);

  //   let y = 30;
  //   const cellWidth = 85; // Ancho de celda ajustado
  //   const cellHeight = 15; // Altura de celda ajustada

  //   const data = [
  //       ["Fecha de registro", "Fecha de dia actual"],
  //       ["Nombre de la persona suicidada", ""],
  //       ["Folio", "verificar en la plataforma cual es el ultimo"],
  //       ["El acto fue", ],
  //       ["Intento de suicido o suicidio registrado en el mes de", ""],
  //       ["Código postal de la fuente", ""],
  //       ["Estado de la fuente", ""],
  //       ["Municipio de la fuente", ""],
  //       ["Colonia de la fuente", ""],
  //       ["Clave de la fuente (Dependencia)", ""],
  //       ["Fecha de ocurrencia dia", ""],
  //       ["Código postal del suicidio", ""],
  //       ["Estado postal del suicidio", ""],
  //       ["Municipio del suicidio", ""],
  //       ["Colonia del suicidio", ""],
  //       ["Sitio donde cometio el acto", ""],
  //       ["Causa del acto", ""],
  //       ["Medio empleado para cometer el acto", ""],
  //       ["Dependencia a la que canaliza", ""],
  //       ["Quien denuncia", ""],




  //       ["Curp", ""],
  //       ["Sexo", ""],
  //       ["Edad(Años cumplidos)", ""],
  //       ["Religion o culto", ""],
  //       ["Estado civil", ""],
  //       ["Alfabetismo y escolaridad", ""],
  //       ["posesión de hijos", ""],
  //       ["Existencia de suicidas en la familia", ""],
  //       ["Adicciones", ""],
  //       ["Enfermedades", ""],
  //       ["Tipo de violencia", ""],
  //       ["Tipo de familia", ""],
  //       ["¿Es estudiante?", ""],
  //       ["Centro educativo", ""],
  //       ["Como se indentifica", ""],
  //       ["Fecha de reindición de datos del dia", ""],

  //       ["Ocupación", ""],
  //       ["Especifica el nombre de la actividad a que se dedica o dedicaba, agregando una breve descripción", ""],
  //   ];

  //   // Agregar datos del formulario
  //   doc.setFontSize(12);
  //   y += cellHeight;
  //   let cont = 0;
  //   for (let row of data) {
  //     if (cont > 0 && cont % 15 === 0) {
  //          doc.addPage()
  //          y=30
  //     }
  //     cont ++
  //       doc.setFillColor(255, 255, 255);
  //       doc.rect(20, y, cellWidth, cellHeight);
  //       doc.rect(105, y, cellWidth, cellHeight); // Ajuste de posición
  //       doc.setTextColor(0);
  //       // Dividir la cadena en varias líneas si no cabe en el rectángulo
  //       const lines = doc.splitTextToSize(row[0], cellWidth - 10);
  //       doc.text(lines, 25, y + 10); // Ajuste de posición
  //       doc.text(row[1], 110, y + 10); // Ajuste de posición
  //       y += cellHeight;
  //   }

  //   // Guardar el PDF
  //   doc.save('formulario.pdf');
  // }





    info(row){
      this.dataSelected =[]
      this.visible = true
      this.dataSelected.push(row)
    }
}
