import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
     role = localStorage.getItem('role');
     isCapturista : boolean = false;
    // Verificar si el usuario es capturista
    constructor(public layoutService: LayoutService) {
        this.isCapturista = this.role === 'Capturista';

    }
    isItemVisible(item: any): boolean {
        const role = localStorage.getItem('role');
        const rolesPermitidos = {
            'Capturista': ['Prevencion'],
            'Administradordependencia': ['Prevencion', 'Graficas', 'Usuarios'],
            'SuperAdmin': ['Prevencion', 'Graficas', 'Usuarios','Mapa','Catalogos'],
            'Administrador': ['Prevencion', 'Graficas', 'Usuarios','Mapa','Catalogos'],

        };
        // Verificar si el rol actual está en la lista de roles permitidos para ver el item
        const isVisible = rolesPermitidos[role]?.includes(item.label);
        return isVisible;
    }



    ngOnInit() {
        this.model = [
            {
                label: 'Usuarios',
                items: [
                    { label: 'Usuarios', icon: 'pi pi-fw pi-home', routerLink: ['/usuarios'] }
                ]
            },
            {
                label: 'Prevencion',
                items: [
                    { label: 'Registro', icon: 'pi pi-fw pi-home', routerLink: ['/prevencion'] },
                    { label: 'Listas', icon: 'pi pi-fw pi-home', routerLink: ['/prevencioninfo'] },

                ]
            },
            {
                label:"Graficas",
                items:[
                    { label: 'Registro Graficas', icon: 'pi pi-fw pi-home', routerLink: ['/creaciongraficas'] },
                    { label: 'Listado Graficas', icon: 'pi pi-fw pi-home', routerLink: ['/listadograficas'] },
                    { label: 'Graficas', icon: 'pi pi-fw pi-home', routerLink: ['/graficas'] },
                ]
            },
            {
                label: 'Mapa',
                items: [
                    { label: 'Mapa', icon: 'pi pi-fw pi-home', routerLink: ['/mapa'] }



                ]
            },
            {
                label: 'Catalogos',
                items: [

                        { label: "Adicciones", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/adicciones"] },
                        { label: "Actos fue", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/actos"] },
                        { label: "Alfabetismo o Escolaridad", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/escolaridad"] },
                        { label: "Centro educativo", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/escuela"] },
                        { label: "Causa del acto", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/causas"] },
                        { label: "Como se indetifica", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/indentificacion"] },
                        { label: "Dependencias", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/dependencias"] },
                        { label: "Enfermedades", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/enfermedades"] },
                        { label: "Estado civil", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/estadocivil"] },
                        { label: "Estatus", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/estatus"] },
                        { label: "Existencia de suicidas en la familia", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/suicidas"] },
                        { label: "Medio empleado para cometer el acto", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/motivos"] },
                        { label: "Ocupaciones", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/ocupaciones"] },
                        { label: "Posesión de hijos", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/hijos"] },
                        { label: "Religión o Cultos", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/religion"] },
                        { label: "Sexo", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/generos"] },
                        { label: "Sitio donde se cometio el acto", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/sitios"] },
                        { label: "Tipo de familia", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/familia"] },
                        { label: "Tipo de violencia", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/violencia"] }
                ]
            },


        ];
    }
}
