import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.components.css']
})
export class LoginComponent {


    valCheck: string[] = ['remember'];
    public Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
    password!: string;
     MyForm = new FormGroup({
        email:new FormControl('',[Validators.required,Validators.email]),
        password:new FormControl('',Validators.required)
      })

    constructor(public layoutService: LayoutService,private service:ServiceService<any>,private router: Router) {

     }
     onSubmit() {

        this.service.Post<any>("auth/login",this.MyForm.value).subscribe({
          next:(n:any)=>{
            console.warn(n["data"])
            localStorage.setItem("token",n["data"]["result"]["token"])
            localStorage.setItem("role",n["data"]["result"]["user"]["role"])
            localStorage.setItem("dependence",n["data"]["result"]["user"]["dependence"])
            const role =n["data"]["result"]["user"]["role"]
            // localStorage.setItem("id",n["data"]["result"]["user"]["id"])
            // localStorage.setItem("group",n["data"]["result"]["user"][0]["group"])
            // localStorage.setItem("departamentos",n["data"]["result"]["user"][0]["departamentos"])


                  console.log("role",role);
                  
                  if (role == "Administrador" ||role == "SuperAdmin") {
             
                    this.router.navigateByUrl(`/usuarios`)
                  }else{
                    this.router.navigateByUrl('/prevencion');
                  }






          },
          error:(e:any)=>{
            this.Toast.fire({
              position: 'top-end',
              icon: 'error',
              title: `Credenciales incorrectas.`,
            });
          },
          complete :()=>{

          }
        })
        }
    }
