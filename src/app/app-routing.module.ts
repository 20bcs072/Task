import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyLoadComponent } from './lazy-load/lazy-load.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { ReportComponent } from './report/report.component';
import { ReportdataComponent } from './reportdata/reportdata.component';


const routes: Routes = [

  
{path:'', redirectTo:'lazy',pathMatch:'full'},
{path:'lazy', component:LazyLoadComponent},
{path:'create', component:CreateComponent},
{path: 'report',component:ReportComponent},
{path:'reportdata',component:ReportdataComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
