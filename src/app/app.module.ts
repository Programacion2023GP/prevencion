import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { LoginComponent } from './demo/components/auth/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    declarations: [AppComponent, NotfoundComponent,LoginComponent],
    imports: [AppRoutingModule, AppLayoutModule, BrowserAnimationsModule,BrowserModule,
        FormsModule,
        HttpClientModule,
        PasswordModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatStepperModule,
        MatFormFieldModule,
        MatNativeDateModule,
        CalendarModule,
        MatSelectModule,
        CheckboxModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
    ],
    bootstrap: [AppComponent],
    
})
export class AppModule {}
