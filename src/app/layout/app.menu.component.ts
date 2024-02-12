import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Usuarios',
                items: [
                    { label: 'Usuarios', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Catalogos',
                items: [
                    // { label: 'Sitio donde se cometio el acto', icon: 'pi pi-fw pi-id-card', routerLink: ['/sitios'] },
                    // { label: 'Medio empleado para cometer el acto', icon: 'pi pi-fw pi-check-square', routerLink: ['/motivos'] },
                    // { label: 'Causa del acto', icon: 'pi pi-fw pi-bookmark', routerLink: ['/causas'] },
                    // { label: 'Sexo', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/generos'] },
                    // { label: 'Dependencias', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/dependencias'] },
                    // { label: 'Religion o Cultos', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/religion'] },
                    // { label: 'Estado civil', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/estadocivil'] },
                    // { label: 'Alfabetismo o Escolaridad', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/escolaridad'] },
                    // { label: 'Adicciones', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/adicciones'] },
                    // { label: 'Enfermedades|', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/enfermedades'] },
                    // { label: 'Tipo de violencia', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/violencia'] },
                    // { label: 'Tipo de familia', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/familia'] },
                    // { label: 'Centro educativo', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/escuela'] },
                    // { label: 'Como se indetifica', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/indentificacion'] },
                    // { label: 'Posesion de hijos', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/hijos'] },
                    // { label: 'Existencia de suicidas en la familia', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/suicidas'] },

                    
                        { label: "Adicciones", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/adicciones"] },
                        { label: "Alfabetismo o Escolaridad", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/escolaridad"] },
                        { label: "Centro educativo", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/escuela"] },
                        { label: "Causa del acto", icon: "pi pi-fw pi-bookmark", routerLink: ["/causas"] },
                        { label: "Como se indetifica", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/indentificacion"] },
                        { label: "Dependencias", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/dependencias"] },
                        { label: "Enfermedades|", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/enfermedades"] },
                        { label: "Estado civil", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/estadocivil"] },
                        { label: "Existencia de suicidas en la familia", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/suicidas"] },
                        { label: "Medio empleado para cometer el acto", icon: "pi pi-fw pi-check-square", routerLink: ["/motivos"] },
                        { label: "Posesion de hijos", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/hijos"] },
                        { label: "Religion o Cultos", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/religion"] },
                        { label: "Sexo", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/generos"] },
                        { label: "Sitio donde se cometio el acto", icon: "pi pi-fw pi-id-card", routerLink: ["/sitios"] },
                        { label: "Tipo de familia", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/familia"] },
                        { label: "Tipo de violencia", icon: "pi pi-fw pi-exclamation-circle", routerLink: ["/violencia"] }
                    
                    


                    // { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                    // { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    // { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    // { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    // { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    // { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    // { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    // { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                    // { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    // { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    // { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    // { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                ]
            },
            // {
            //     label: 'Prime Blocks',
            //     items: [
            //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
            //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Utilities',
            //     items: [
            //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
            //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Pages',
            //     icon: 'pi pi-fw pi-briefcase',
            //     items: [
            //         {
            //             label: 'Landing',
            //             icon: 'pi pi-fw pi-globe',
            //             routerLink: ['/landing']
            //         },
            //         {
            //             label: 'Auth',
            //             icon: 'pi pi-fw pi-user',
            //             items: [
            //                 {
            //                     label: 'Login',
            //                     icon: 'pi pi-fw pi-sign-in',
            //                     routerLink: ['/auth/login']
            //                 },
            //                 {
            //                     label: 'Error',
            //                     icon: 'pi pi-fw pi-times-circle',
            //                     routerLink: ['/auth/error']
            //                 },
            //                 {
            //                     label: 'Access Denied',
            //                     icon: 'pi pi-fw pi-lock',
            //                     routerLink: ['/auth/access']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Crud',
            //             icon: 'pi pi-fw pi-pencil',
            //             routerLink: ['/pages/crud']
            //         },
            //         {
            //             label: 'Timeline',
            //             icon: 'pi pi-fw pi-calendar',
            //             routerLink: ['/pages/timeline']
            //         },
            //         {
            //             label: 'Not Found',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/notfound']
            //         },
            //         {
            //             label: 'Empty',
            //             icon: 'pi pi-fw pi-circle-off',
            //             routerLink: ['/pages/empty']
            //         },
            //     ]
            // },
            // {
            //     label: 'Catalogos',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Get Started',
            //     items: [
            //         {
            //             label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
            //         },
            //         {
            //             label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
            //         }
            //     ]
            // }
        ];
    }
}
