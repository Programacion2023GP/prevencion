import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { ServiceService } from '../service.service';
import {  Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {


    items!: MenuItem[];
    
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,private service:ServiceService<any>,private route:Router) { }
    Logout() {
        this.service.Logout("auth/logout").pipe(
            catchError(error => {
                // Maneja el er
                localStorage.clear();
                this.route.navigateByUrl("/login");
                                return throwError(error); // Pasa el error para que lo maneje el suscriptor externo
            })
        ).subscribe({
            next: (n) => {
                localStorage.clear();
                this.route.navigateByUrl("/login");
            }
        });
    }
}
