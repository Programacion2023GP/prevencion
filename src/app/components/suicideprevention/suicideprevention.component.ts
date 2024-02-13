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
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CalendarModule } from 'primeng/calendar';
import {MatStepperModule} from '@angular/material/stepper';

import { fadeInOutAnimation } from 'src/app/components/animations/animate';
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-suicideprevention',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatCardModule,MatButtonModule,
    ReactiveFormsModule,MatIconModule,CommonModule,SkeletonModule,MatSelectModule,MatDatepickerModule,CalendarModule,MatStepperModule],
    animations:[fadeInOutAnimation],
  templateUrl: './suicideprevention.component.html',
  styleUrl: './suicideprevention.component.scss'
})
export class SuicidepreventionComponent {

  MyForm = new FormGroup({
    id:new FormControl(''),
    invoice:new FormControl('',Validators.required),
    actwas_id:new FormControl('',[Validators.required]),
    dateregister:new FormControl('',Validators.required),
    cp:new FormControl('',Validators.required),
    states:new FormControl('',Validators.required),
    municipys:new FormControl('',Validators.required),
    colony:new FormControl('',Validators.required),
    dependeces_id:new FormControl('',Validators.required),
    datesuccess:new FormControl('',Validators.required),
    cpdeed:new FormControl('',Validators.required),
    statesdeed:new FormControl('',Validators.required),
    municipysdeed:new FormControl('',Validators.required),
    colonydeed:new FormControl('',Validators.required),
  })
  CALENDER_CONFIG_EN = {
    firstDayOfWeek: 1,
    dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    dayNamesMin: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
        'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Today',
    clear: 'Clear',
}
  isLoading = true
  action = false
  displayedColumns: string[] = ['name','email','role', 'Actions'];
  dataSource: MatTableDataSource<any>;
  data: any;
  dependeces = []
  wasact= [];
  colonias = []
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
calendar_en: any;
  coloniasdeed: [];
constructor(private service:ServiceService<any>) {
  this.getData()
  this.getActwas()
  this.getDependences()
  this.calendar_en = {
    closeText: "Done",
    prevText: "Prev",
    nextText: "Next",
    currentText: "Today",
    monthNames: [ "January","February","March","April","May","June",
      "July","August","September","October","November","December" ],
    monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
    dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
    dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
    dayNamesMin: [ "Su","Mo","Tu","We","Th","Fr","Sa" ],
    weekHeader: "Wk",
    dateFormat: "dd/mm/yy",
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: "" };

   // Assign the data to the data source for the table to render
 }
 getData(){
   this.service.Data("users/index").subscribe({
     next:(n)=>{
       this.dataSource =  new MatTableDataSource(n['data']['result']);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       this.data = n["data"]["result"]
       this.isLoading = false
     },error:(e)=>{
       this.isLoading = false

     }
   })
 }

 getActwas(){
  this.service.Data("actwas/values").subscribe({
    next:(n)=>{
      this.wasact =  n['data']['result'];
    },error:(e)=>{

    }
  })
}
getDependences(){
  this.service.Data("dependence/values").subscribe({
    next:(n)=>{
      this.dependeces =  n['data']['result'];
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
   
   onSubmit(){
     this.isLoading = true

   let url ="users/create";

   if (this.action) {
     url =  "users/update"
   }
     this.service.Post(url,this.MyForm.value).subscribe({
       next:(n)=>{
       this.MyForm.reset()
         this.getData()
         this.action = false
         this.Toast.fire({
           position: 'top-end',
           icon: 'success',
           title: `Se ha ${url =='users/create'?'insertado':'actualizado'} correctamente`,
         });
       },
       error:(e)=>{
        this.MyForm.reset()
        this.getData()

         this.action = false
         this.isLoading = false

         this.Toast.fire({
           position: 'top-end',
           icon: 'error',
           title: ` No se ha podido ${url =='users/create'?'insertar':'actualizar'} correctamente`,
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
       this.service.Delete(`users/destroy/${row.id}`).subscribe({
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
                 title: `No se  ha podido eliminar correctamente`,
               });
               this.getData()

         }
       })
     }
     SearchCp(event: any) {
        this.service.OtherData(`https://api.gomezpalacio.gob.mx/api/cp/${event.target.value}`).subscribe({
          next:(n)=>{
            const data = n["data"]["result"]
            const info = data[0]
            this.colonias = data.map(item => item.Colonia);
            this.MyForm.get("states").setValue(info.Estado)
            this.MyForm.get("municipys").setValue(info.Municipio)

          },
          error:(e)=>{
           
          }
        })
      }
      SearchCpDeed(event: any) {
        this.service.OtherData(`https://api.gomezpalacio.gob.mx/api/cp/${event.target.value}`).subscribe({
          next:(n)=>{
            const data = n["data"]["result"]
            const info = data[0]
            this.coloniasdeed = data.map(item => item.Colonia);
            this.MyForm.get("statesdeed").setValue(info.Estado)
            this.MyForm.get("municipysdeed").setValue(info.Municipio)

          },
          error:(e)=>{
           
          }
        })
      }
}

