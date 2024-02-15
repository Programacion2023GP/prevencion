import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TableComponent } from '../../table/table.component';
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
  selector: 'app-meanemployee',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,TableComponent,MatCardModule,MatButtonModule,
    ReactiveFormsModule,MatIconModule,CommonModule,SkeletonModule],
    animations:[fadeInOutAnimation],

  templateUrl: './meanemployee.component.html',
  styleUrl: './meanemployee.component.scss'
})
export class MeanemployeeComponent {
  MyForm = new FormGroup({
    id:new FormControl(''),
    name:new FormControl('',Validators.required)
  })
  isLoading = true
  action = false
  displayedColumns: string[] = ['name', 'Actions'];
  dataSource: MatTableDataSource<any>;
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
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
constructor(private service:ServiceService<any>) {
  this.getData()

   // Assign the data to the data source for the table to render
 }
 getData(){
   this.isLoading = false
   this.service.Data("meanemployeed/index").subscribe({
     next:(n)=>{
       this.dataSource =  new MatTableDataSource(n['data']['result']);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       this.data = n["data"]["result"]
     },error:(e)=>{
       this.isLoading = false

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
   
   onSubmit(){
     this.isLoading = true

   let url ="meanemployeed/create";

   if (this.action) {
     url =  "meanemployeed/update"
   }
     this.service.Post(url,this.MyForm.value).subscribe({
       next:(n)=>{
       this.MyForm.reset()
         this.getData()
         this.action = false
         this.Toast.fire({
           position: 'top-end',
           icon: 'success',
           title: `Se ha ${url =='meanemployeed/create'?'insertado':'actualizado'} correctamente`,
         });
       },
       error:(e)=>{
         this.action = false
         this.isLoading = false
         this.MyForm.reset()
         this.getData()

         this.Toast.fire({
           position: 'top-end',
           icon: 'error',
           title: ` No se ha podido ${url =='meanemployeed/create'?'insertar':'actualizar'} correctamente`,
         });
       }
     })

     }
     edit(row: any) {
       
       this.action = true
       this.MyForm.get('id')?.setValue(row.id)
       Object.keys(row).forEach(key => {
         if (this.MyForm.get(key)) {
           this.MyForm.get(key)?.setValue(row[key]);
         }
       });
     }
     deleterow(row:any){
       this.isLoading = true
       this.service.Delete(`meanemployeed/destroy/${row.id}`).subscribe({
         next:(n)=>{
           this.Toast.fire({
             position: 'top-end',
             icon: 'success',
             title: `Se ha eliminado correctamente`,
           });
           this.getData()
           this.isLoading = false

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
