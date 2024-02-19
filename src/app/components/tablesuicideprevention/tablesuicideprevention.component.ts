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
  displayedColumns: string[] = ['invoice','personinformate','name','dependencia','causa','datecurrence', 'Actions'];
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

    info(row){
      this.dataSelected =[]
      this.visible = true
      this.dataSelected.push(row)
    }
}
