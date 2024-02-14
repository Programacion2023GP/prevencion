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

visible:Boolean
  dataSelected =[]
  data: any;
  displayedColumns: string[] = ['invoice','personinformate','name','dependencia','medio_empleado','datesuccess', 'Actions'];
  dataSource: MatTableDataSource<any>;
  constructor(private service:ServiceService<any>){
    this.getSuicides()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
 
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getSuicides(){
    this.service.Data("prevention/show").subscribe({
        next:(n)=>{
          this.data =  n['data']['result'];
        },error:(e)=>{

        }
      })
}
    info(row){
      this.dataSelected =[]
      this.visible = true
      this.dataSelected.push(row)
    }
}
