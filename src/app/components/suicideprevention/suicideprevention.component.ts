import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ServiceService } from 'src/app/service.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CalendarModule } from 'primeng/calendar';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import Swal from 'sweetalert2'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { SplitterModule } from 'primeng/splitter';
import { fadeInOutAnimation } from 'src/app/components/animations/animate';
import {MatSelectModule} from '@angular/material/select';
import { ActivatedRoute, Navigation, Route, Router } from '@angular/router';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {MatRadioModule} from '@angular/material/radio';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-suicideprevention',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatCardModule,MatButtonModule,
    ReactiveFormsModule,MatRadioModule,MatIconModule,ScrollPanelModule,CommonModule,SkeletonModule,MatSelectModule,MatDatepickerModule,CalendarModule,MatStepperModule,SplitterModule,MatProgressSpinnerModule],
    animations:[fadeInOutAnimation],
    providers: [DatePipe],
  templateUrl: './suicideprevention.component.html',
  styleUrl: './suicideprevention.component.scss'
})
export class SuicidepreventionComponent {
  estudiante:Boolean
  addicion:Boolean
    formattedDate: string;
    role =localStorage.getItem("role")
    animation = true
    MyForm: FormGroup;
    today = new Date()
    Myformsecond: FormGroup;

  Myformtree =new FormGroup({
    activies_id:new FormControl('',Validators.required),
    status_id:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
  })

  MyFormPreregistro: FormGroup;

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
  status =[]
  dependeces = []
  wasact= [];
  colonias = []
  meansemployeed=[]
  genders =[]
  statesCivils =[]
  literacys =[]
  beliefs=[]
  childrens =[]
  existences =[]
  adictions =[]
  diseases =[]
  violences =[]
  familys =[]
  schools =[]
  indetifieds =[]
  activities =[]
  causes =[]
  sites=[]
  meanemployeed=[]
  findFolio:number
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
    loading: boolean;
    loadingtwo: boolean;
isLoadingSkeleton: boolean=false;
hoy: Date;
  parametroOpcional: any;
existParams :boolean=false
id :number
generatePDF() {
  const doc = new jsPDF();

  let y = 30;
  const cellWidth = 85; // Ancho de celda ajustado
  let cellHeight = 15; // Altura de celda ajustada

  const data = [
      ["title","Datos de la fuente informativa"],
      ["Fecha de registro", ""],
      ["Nombre de la persona suicidada", ""],
      ["Folio", ""],
      ["El acto fue", ""],
      ["Intento de suicidio o suicidio registrado en el mes de", ""],
      ["Código postal de la fuente", ""],
      ["Estado de la fuente", ""],
      ["Municipio de la fuente", ""],
      ["Colonia de la fuente", ""],
      ["Clave de la fuente (Dependencia)", ""],
      ["Fecha de ocurrencia dia", ""],
      ["Código postal del suicidio", ""],
      ["Estado postal del suicidio", ""],
      ["Municipio del suicidio", ""],
      ["Colonia del suicidio", ""],
      ["Sitio donde cometio el acto", ""],
      ["Causa del acto", ""],
      ["Medio empleado para cometer el acto", ""],
      ["Dependencia a la que canaliza", ""],
      ["Quien denuncia", ""],
      ["title","Caracteristicas personales suicidas"],
      ["Curp", ""],
      ["Sexo", ""],
      ["Edad(Años cumplidos)", ""],
      ["Religión o culto", ""],
      ["Estado civil", ""],
      ["Alfabetismo y escolaridad", ""],
      ["posesión de hijos", ""],
      ["Existencia de suicidas en la familia", ""],
      ["¿Tiene alguna addición?", ""],
      ["Adicciones", ""],
      ["Enfermedades", ""],
      ["Tipo de violencia", ""],
      ["Tipo de familia", ""],
      ["¿Es estudiante?", ""],
      ["Centro educativo", ""],
      ["Como se indentifica", ""],
      ["Fecha de reindición de datos del dia", ""],
      ["title","Ocupacion que tiene (tenia) el suicida"],
      ["Ocupación", ""],
      ["Especifica el nombre de la actividad a que se dedica o dedicaba, agregando una breve descripción", ""],
  ];

  let cont = 0;
  for (let row of data) {
      doc.setFontSize(row[0] === "title" ? 16 : 12); // Si es un título, establece un tamaño de fuente mayor
      if (row[0] === "title") {
          y += 10; // Agrega espacio después del título
      }
      if (row[0] === "title" && cont > 0) {
          y += 5; // Agrega espacio adicional antes de un nuevo título, pero no al principio
      }
      if (row[0] === "title") {
          doc.text(row[1], 20, y); // Mostrar el título
          y += 10; // Aumentar la posición Y después de mostrar el título
      } else {
          if (cont > 0 && cont % 15 === 0) {
              doc.addPage(); // Agregar nueva página después de cada 15 filas
              y = 30; // Reiniciar posición Y en la nueva página
          }
          const lines = doc.splitTextToSize(row[0], cellWidth - 10);
          cellHeight = lines.length > 1 ? cellHeight * lines.length : 15;

          doc.setFillColor(255, 255, 255);
          doc.rect(20, y, cellWidth, cellHeight);
          doc.rect(105, y, cellWidth, cellHeight); // Ajuste de posición
          doc.setTextColor(0);
          // Dividir la cadena en varias líneas si no cabe en el rectángulo
          doc.text(lines, 25, y + 10); // Ajuste de posición
          doc.text(row[1], 110, y + 10); // Ajuste de posición
          y += cellHeight;
          cellHeight = 15; // Reiniciar la altura de la celda después de cada fila
      }
      cont++;
  }

  // Guardar el PDF
  doc.save('registro.pdf');
}
ngOnInit(): void {

  this.route.queryParams.subscribe(params => {
    // Verificar si el parámetro 'row' está presente en los parámetros de la URL
    if (params['row']) {
      // Obtener la cadena JSON del parámetro 'row'
      const rowString = params['row'];
      // Convertir la cadena JSON de nuevo a un objeto JSON
      const row = JSON.parse(rowString);
      this.existParams = true
      // Realizar acciones con el objeto 'row'
      this.id =row["id"]
      if(row["cp"]){
        this.SearchCp(row["cp"])

      }
      if (row["estudiante"]) {
        this.estudiante = true
        this.Myformsecond.get("estudiante").setValue(true)

      }else{
        this.estudiante = false
        this.Myformsecond.get("estudiante").setValue(false)
      }
      if (row["addicion"]) {
        this.addicion = true
        this.Myformsecond.get("addicion").setValue(true)

      }else{

        this.addicion = false
        this.Myformsecond.get("addicion").setValue(false)
      }







      this.SearchCpDeed(row["cpdeed"])

      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          if (row["datesuccess"] === row[key] || row["datereindence"] === row[key]) {
            row[key] = new Date(row[key]);
            row[key].setDate(row[key].getDate() + 1);
        }


          if (this.MyForm.controls[key]) {
            this.MyForm.controls[key].setValue(row[key]);
          }
          if (this.Myformsecond.controls[key]) {
            this.Myformsecond.controls[key].setValue(row[key]);
          }
          if (this.Myformtree.controls[key]) {
            this.Myformtree.controls[key].setValue(row[key]);
          }
        }
        //dateregister
        //datesuccess
        //datereindence

      }
    } else {
      // El parámetro 'row' no está presente en la URL
      console.log('No se proporcionó el parámetro opcional "row" en la URL');
    }

  });
}

estudianteSelected(condition){
  this.estudiante = condition ==1?true:false
  this.Myformsecond.get("estudiante").setValue(condition ==1?true:false)
}
checkOriginPage() {
  // Obtiene la URL actual
  const currentUrl = this.activatedRoute.url;
console.warn(currentUrl)
}
addicionSelected(condition){
  this.addicion = condition ==1?true:false
  this.Myformsecond.get("addicion").setValue(condition ==1?true:false)
}

constructor(private service:ServiceService<any>,private datePipe: DatePipe,private route:ActivatedRoute,private change:Router, private activatedRoute: ActivatedRoute) {
  this.hoy = new Date(); // Obtiene la fecha de hoy

  let Today = new Date();
  // Formatear la fecha en el formato 'YYYY-MM-DD' (formato de fecha de HTML)
  let Hoy = Today.toISOString().split('T')[0];
  const currentDate = new Date();
    this.formattedDate = this.datePipe.transform(currentDate, 'dd/MM/yyyy');
    this. MyFormPreregistro = new FormGroup({
      dateregister:new FormControl(this.formattedDate,Validators.required),
      actwas_id:new FormControl('',Validators.required),
      dependeces_id:new FormControl(''),
      personinformate:new FormControl('',Validators.required),
      cpdeed:new FormControl('',Validators.required),
      statesdeed:new FormControl('',Validators.required),
      municipysdeed:new FormControl('',Validators.required),
      colonydeed:new FormControl('',Validators.required),
      date_created:new FormControl('',Validators.required),

    })
    //[ Validators.pattern(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/)]
    this.Myformsecond =new FormGroup({
      curp: new FormControl('', ),
      gender_id:new FormControl('',Validators.required),
      age:new FormControl('',Validators.required),
      belief_id:new FormControl('',Validators.required),
      statecivil_id:new FormControl('',Validators.required),
      literacy_id:new FormControl('',Validators.required),
      childrens_id:new FormControl('',Validators.required),
      estudiante:new FormControl(false,Validators.required),
      addicion:new FormControl(false,Validators.required),
      existence_id:new FormControl('',Validators.required),
      adictions_id:new FormControl(''),
      diseases_id:new FormControl('',Validators.required),
      violence_id:new FormControl('',Validators.required),
      family_id:new FormControl('',Validators.required),
      school_id:new FormControl(''),
      indetified_id:new FormControl('',Validators.required),
      datereindence:new FormControl('',Validators.required),

    })
    this.MyForm = new FormGroup  ({
      id:new FormControl(''),
      dateregister:new FormControl(this.formattedDate,Validators.required),
        name:new FormControl('',Validators.required),
        // invoice:new FormControl('',Validators.required),
        actwas_id:new FormControl('',[Validators.required]),
        cp:new FormControl('',Validators.required),
        states:new FormControl('',Validators.required),
        municipys:new FormControl('',Validators.required),
        colony:new FormControl('',Validators.required),
        dependeces_id:new FormControl('',Validators.required),
        datesuccess:new FormControl(this.hoy,Validators.required),
        cpdeed:new FormControl('',Validators.required),
        statesdeed:new FormControl('',Validators.required),
        municipysdeed:new FormControl('',Validators.required),
        colonydeed:new FormControl('',Validators.required),
        sites_id:new FormControl('',Validators.required),
        causes_id:new FormControl('',Validators.required),
        dependececanalize_id:new FormControl('',Validators.required),
        meanemployeed_id:new FormControl('',Validators.required),
        personinformate:new FormControl('',Validators.required),
        date_created:new FormControl('',Validators.required),

      })
      this.findIndex()
      if (this.role =="Capturista" ||this.role =="Administradordependencia"  ) {
          this.MyForm.removeControl("dependeces_id")
        }
        this.getData()
        this.getActwas()
        this.getDependences()
        this.getSites()
        this.getMeans()
  this.getGenders()
  this.getBelief()
  this.getStatesCivils()
  this.getLiteracy()
  this.getChildrens()
  this.getExistence()
  this.getAdictions()
  this.getDiseases()
  this.getViolences()
  this.getFamily()
  this.getSchool()
  this.getCauses()
  this.getStatus()
  this.getIndentified()
  this.getActivities()
  this.findIndex()
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
 nextStep(stepper: MatStepper) {
    stepper.next();
  }
  findIndex(){

    this.MyForm.get("date_created").setValue(this.today)
    this.MyForm.get("datesuccess").setValue(this.today)

    this.MyFormPreregistro.get("date_created").setValue(this.today)
    this.MyForm.get("dateregister").setValue(this.formattedDate)
    this.MyFormPreregistro.get("dateregister").setValue(this.formattedDate)
    this.estudiante = false
    this.Myformsecond.get("estudiante").setValue(false)
    this.addicion = false
    this.Myformsecond.get("addicion").setValue(false)


  }
  onPressSubmit(){
    this.isLoadingSkeleton =true
    this.service.Post("prevention/create", this.MyFormPreregistro.value).subscribe({
      next: (n)=>{

          this.MyForm.reset()
          this.Myformsecond.reset()
          this.Myformtree.reset();
          this.MyFormPreregistro.reset()
          this.findIndex()
          this.Toast.fire({
           position: 'top-end',
           icon: 'success',
           title: `Se ha insertado correctamente`,
         });
         if (this.existParams) {
           this.change.navigate(["prevencion"])
         }
         this.isLoadingSkeleton =false

      },
      error: (e)=>{
       this.MyForm.reset()
       this.Myformsecond.reset()
       this.Myformtree.reset();
       this.MyFormPreregistro.reset()

       this.Toast.fire({
         position: 'top-end',
         icon: 'error',
         title: `No se ha podido insertar correctamente`,
       });
       this.isLoadingSkeleton =false
       if (this.existParams) {
         this.change.navigate(["prevencion"])
       }
      }
     })
  }
  previousStep(stepper: MatStepper) {
    stepper.previous();
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
getStatus(){
  this.service.Data("status/values").subscribe({
    next:(n)=>{
      this.status =  n['data']['result'];

    },error:(e)=>{

    }
  })
}
getActivities(){
    this.service.Data("activies/values").subscribe({
      next:(n)=>{
        this.activities =  n['data']['result'];
      },error:(e)=>{

      }
    })
  }
getGenders(){
    this.service.Data("gender/values").subscribe({
      next:(n)=>{
        this.genders =  n['data']['result'];
      },error:(e)=>{

      }
    })
  }
  getBelief(){
    this.service.Data("belief/values").subscribe({
      next:(n)=>{
        this.beliefs =  n['data']['result'];
      },error:(e)=>{

      }
    })
  }
  getStatesCivils(){
    this.service.Data("statecivil/values").subscribe({
      next:(n)=>{
        this.statesCivils =  n['data']['result'];
      },error:(e)=>{

      }
    })
  }
  getLiteracy(){
    this.service.Data("literacy/values").subscribe({
      next:(n)=>{
        this.literacys =  n['data']['result'];
      },error:(e)=>{

      }
    })
  }
  getChildrens(){
    this.service.Data("childrens/values").subscribe({
      next:(n)=>{
        this.childrens =  n['data']['result'];
      },error:(e)=>{

      }
    })
  }
  getExistence(){
    this.service.Data("existence/values").subscribe({
      next:(n)=>{
        this.existences =  n['data']['result'];
      },error:(e)=>{

      }
    })
  }
  getAdictions(){
    this.service.Data("adictions/values").subscribe({
      next:(n)=>{
        this.adictions =  n['data']['result'];
      },error:(e)=>{

      }
    })
  }
  getDiseases(){
    this.service.Data("diseases/values").subscribe({
      next:(n)=>{
        this.diseases =  n['data']['result'];
      },error:(e)=>{

      }
    })
  }
  getViolences(){
    this.service.Data("violence/values").subscribe({
      next:(n)=>{
        this.violences =  n['data']['result'];
      },error:(e)=>{

      }
    })
  }
  getFamily(){
    this.service.Data("family/values").subscribe({
      next:(n)=>{
        this.familys =  n['data']['result'];
      },error:(e)=>{

      }
    })
  }
  getSchool(){
    this.service.Data("school/values").subscribe({
      next:(n)=>{
        this.schools =  n['data']['result'];
      },error:(e)=>{

      }
    })
  }
  getIndentified(){
    this.service.Data("indentified/values").subscribe({
      next:(n)=>{
        this.indetifieds =  n['data']['result'];
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
getSites(){
    this.service.Data("sites/values").subscribe({
        next:(n)=>{
          this.sites =  n['data']['result'];
        },error:(e)=>{

        }
      })
}
getMeans(){
    this.service.Data("meanemployeed/values").subscribe({
        next:(n)=>{
          this.meansemployeed =  n['data']['result'];
        },error:(e)=>{

        }
      })
}
getCauses(){
    this.service.Data("cause/values").subscribe({
        next:(n)=>{
          this.causes =  n['data']['result'];
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
        this.loading =true
        const value = event?.target?.value ?? event;
        this.service.OtherData(`https://cp.gomezpalacio.gob.mx/api/cp/${value}`).subscribe({
          next:(n)=>{
            const data = n["data"]["result"]
            const info = data[0]
            this.colonias = data.map(item => item.Colonia);
            this.MyForm.get("states").setValue(info.Estado)
            this.MyForm.get("municipys").setValue(info.Municipio)
            this.loading =false
          },
          error:(e)=>{
            this.loading =false
            this.colonias = [];
            this.MyForm.get("states").setValue("")
            this.MyForm.get("municipys").setValue("")
          }
        })
      }
      SearchCpDeed(event: any) {
        this.loadingtwo = true
        const value = event?.target?.value ?? event;

        this.service.OtherData(`https://cp.gomezpalacio.gob.mx/api/cp/${value}`).subscribe({
          next:(n)=>{
            const data = n["data"]["result"]
            const info = data[0]
            this.coloniasdeed = data.map(item => item.Colonia);
            this.MyForm.get("statesdeed").setValue(info.Estado)
            this.MyForm.get("municipysdeed").setValue(info.Municipio)
            this.MyFormPreregistro.get("statesdeed").setValue(info.Estado)
            this.MyFormPreregistro.get("municipysdeed").setValue(info.Municipio)
            this.loadingtwo = false
          },
          error:(e)=>{
            this.loadingtwo = false
            this.coloniasdeed =[];
            this.MyForm.get("statesdeed").setValue("")
            this.MyForm.get("municipysdeed").setValue("")
            this.MyFormPreregistro.get("statesdeed").setValue("")
            this.MyFormPreregistro.get("municipysdeed").setValue("")
          }
        })
      }
      Onsubmitree() {
        this.isLoadingSkeleton =true
       let url = "prevention/create"
        if (this.existParams) {
            url =`prevention/update/${this.id}`
        }
        const combinedData = {
            ...this.MyForm.value,
            ...this.Myformsecond.value,
            ...this.Myformtree.value };
       this.service.Post(url, combinedData).subscribe({
           next: (n)=>{

               this.MyForm.reset()
               this.Myformsecond.reset()
               this.Myformtree.reset();
               this.MyFormPreregistro.reset()

               this.findIndex()
               this.Toast.fire({
                position: 'top-end',
                icon: 'success',
                title: `Se ha ${url =="prevention/create"?"insertado":"actualizado"} correctamente`,
              });
              if (this.existParams) {
                this.change.navigate(["prevencion"])
              }
              this.isLoadingSkeleton =false

           },
           error: (e)=>{
            this.MyForm.reset()
            this.Myformsecond.reset()
            this.Myformtree.reset();
            this.MyFormPreregistro.reset()
            this.findIndex()

            this.Toast.fire({
              position: 'top-end',
              icon: 'error',
              title: `No se ha podido ${url =="prevention/create"?"insertar":"actualizar"} correctamente`,
            });
            this.isLoadingSkeleton =false
            if (this.existParams) {
              this.change.navigate(["prevencion"])
            }
           }
          })

      }
      onSubmitsecond() {

      }
}


