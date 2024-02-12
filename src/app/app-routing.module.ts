import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { SitesComponent } from './components/catalogues/sites/sites.component';
import { CauseComponent } from './components/catalogues/cause/cause.component';
import { GenderComponent } from './components/catalogues/gender/gender.component';
import { MeanemployeeComponent } from './components/catalogues/meanemployee/meanemployee.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { DependencesComponent } from './components/catalogues/dependences/dependences.component';
import { BeliefComponent } from './components/catalogues/belief/belief.component';
import { StatecivilComponent } from './components/catalogues/statecivil/statecivil.component';
import { LiteracyComponent } from './components/catalogues/literacy/literacy.component';
import { AdictionsComponent } from './components/catalogues/adictions/adictions.component';
import { DiseasesComponent } from './components/catalogues/diseases/diseases.component';
import { ViolenceComponent } from './components/catalogues/violence/violence.component';
import { FamilyComponent } from './components/catalogues/family/family.component';
import { SchoolComponent } from './components/catalogues/school/school.component';
import { IndentifiedComponent } from './components/catalogues/indentified/indentified.component';
import { ChildrensComponent } from './components/catalogues/childrens/childrens.component';
import { ExistenceComponent } from './components/catalogues/existence/existence.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'sitios', component:SitesComponent},
                    { path: 'causas', component:CauseComponent},
                    { path: 'motivos', component:MeanemployeeComponent},
                    { path: 'generos', component:GenderComponent},
                    { path: 'dependencias', component:DependencesComponent},
                    { path: 'religion', component:BeliefComponent},
                    { path: 'estadocivil', component:StatecivilComponent},
                    { path: 'escolaridad', component:LiteracyComponent},
                    { path: 'adicciones', component:AdictionsComponent},
                    { path: 'enfermedades', component:DiseasesComponent},
                    { path: 'violencia', component:ViolenceComponent},
                    { path: 'familia', component:FamilyComponent},
                    { path: 'escuela', component:SchoolComponent},
                    { path: 'indentificacion', component:IndentifiedComponent},
                    { path: 'hijos', component:ChildrensComponent},
                    { path: 'suicidas', component:ExistenceComponent},

                    { path: 'usuarios', component:UsersComponent},
                    { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
