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
@Component({
  selector: 'app-tablecharts',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatCardModule,MatButtonModule,
    ReactiveFormsModule,MatIconModule,CommonModule,SkeletonModule],
    animations:[fadeInOutAnimation],
  templateUrl: './tablecharts.component.html',
  styleUrl: './tablecharts.component.scss'
})
export class TablechartsComponent {
  displayedColumns: string[] = ['name','chart_selected','description','position',  'Actions'];
  dataSource: MatTableDataSource<any>;
  data: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
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
  constructor(private service:ServiceService<any>) {
    this.getData()

    // Assign the data to the data source for the table to render
 }
 getData(){
  this.service.Data("chart/all").subscribe({
    next:(n)=>{
      this.dataSource =  new MatTableDataSource(n['data']['result']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.data = n["data"]["result"]
    },error:(e)=>{

    }
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
isFirstRow(row: any): boolean {
  return this.dataSource.data.indexOf(row) === 0;
}

isLastRow(row: any): boolean {
  return this.dataSource.data.indexOf(row) === this.dataSource.data.length - 1;
}
change(row){
  this.service.Delete(`chart/destroy/${row.id}`).subscribe({
    next:(n)=>{
      this.Toast.fire({
        position: 'top-end',
        icon: 'success',
        title: `Se ha cambiado el estado`,
      });
      this.getData()

     },
     error:(e)=>{
       this.Toast.fire({
         position: 'top-end',
         icon: 'error',
         title: e['error']['data']['message'] || 'No se ha podido eliminar correctamente',
     });
          this.getData()

    }
  })
}
}
