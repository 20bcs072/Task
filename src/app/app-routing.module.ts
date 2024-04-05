import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyLoadComponent } from './lazy-load/lazy-load.component';
import { LoginComponent } from './login/login.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { CreateComponent } from './create/create.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [

  
{path:'', redirectTo:'lazy',pathMatch:'full'},
{path:'lazy', component:LazyLoadComponent},
{path:'drop',component:DropdownComponent},
{path:'create', component:CreateComponent},
{path: 'report',component:ReportComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
