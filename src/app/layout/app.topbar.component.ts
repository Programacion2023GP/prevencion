import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { ServiceService } from '../service.service';
import {  Router } from '@angular/router';

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
        this.service.Logout("auth/logout").subscribe({
            next:(n)=>{
                    localStorage.clear()
                    this.route.navigateByUrl("/login");
                },
            error:(e)=>{

            }
        })
        }
}
