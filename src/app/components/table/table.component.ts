import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

export interface ButtonsTable{
  text:string,
  icon:string,
  touched:Boolean
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatCardModule],
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() fields:any = []
  @Input() buttons
  @Input() disablebuttons

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>; 
  column: string[] =[]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() idUpdate = new EventEmitter<number>();
  @Output() idDelete = new EventEmitter<number>();
  @Output() buttonClick = new EventEmitter<any>();
  @Output() pdf = new EventEmitter<number>();

  constructor() {
    console.error(this.fields)
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["fields"] && changes["fields"].currentValue) {
      const data = changes["fields"].currentValue;
      console.log(data);
      // Obtener las claves de la primera fila (suponiendo que todas las filas tienen la misma estructura)
      const keys = Object.keys(data[0]);
  
      // Definir las columnas a mostrar (excluyendo la columna 'id' si es necesario)
      const displayedColumns = keys.filter(key => key !== '');
  
      // Agregar la columna 'Actions' al final
      displayedColumns.push('Actions');
      // Asignar las columnas a la propiedad displayedColumns
      this.displayedColumns = displayedColumns;
      
      // Inicializar la fuente de datos de la tabla
      this.dataSource = new MatTableDataSource<any>(data);
      console.error(displayedColumns,this.fields )
  
      // Configurar el paginador y el clasificador si están disponibles
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    }
  }
  
  
  
  
  ngOnInit() {
    console.error()
  }
  ngAfterViewInit() {
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  update(id){
    this.idUpdate.emit(id);

  }
  delete(id){
    this.idDelete.emit(id);

  }
  Pdf(id){
    this.pdf.emit(id);

  }
  touchedButton(id,indexButton:number,idviolence){
    this.buttonClick.emit([id,indexButton,idviolence])
  }
}

