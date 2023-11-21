import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { FormContactComponent } from './form-contact/form-contact.component';
import { TestVarkComponent } from './test-vark/test-vark.component';
import { TestPersonalidadComponent } from './test-personalidad/test-personalidad.component';
import { UserComponent } from './user/user.component';
import { RespuestasvarkService } from './_services/respuestasvark.service';
import { GetemailComponent } from './getemail/getemail.component';
import { DashboardvarkComponent } from './dashboardVark/dashboardvark/dashboardvark.component';
import { DashboardpersonalidadComponent } from './dashboardpersonalidad/dashboardpersonalidad.component';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        LoginComponent,
        FormContactComponent,GetemailComponent,DashboardpersonalidadComponent,
        TestVarkComponent,UserComponent,DashboardvarkComponent,
        TestPersonalidadComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        RespuestasvarkService,
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }