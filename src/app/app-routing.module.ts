import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormContactComponent } from './form-contact/form-contact.component';
import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { TestVarkComponent } from './test-vark/test-vark.component';
import { TestPersonalidadComponent } from './test-personalidad/test-personalidad.component';
import { UserComponent } from './user/user.component';
import { GetemailComponent } from './getemail/getemail.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },{
        path: 'registro',
        component: UserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'form-contact',
        component: FormContactComponent,
        canActivate:[AuthGuard]
    },{
        path: 'getbyemail',
        component: GetemailComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'test-vark',
        component: TestVarkComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'test-personalidad',
        component: TestPersonalidadComponent,
        canActivate:[AuthGuard]
    },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
